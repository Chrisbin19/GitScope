import json
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException

from mcp_client import (
    github_mcp_session,
    get_repository_readme,
    get_user_repositories,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with github_mcp_session() as session:
        app.state.mcp = session
        yield


app = FastAPI(lifespan=lifespan)

@app.get("/")
def fun():
    return {"message": "Hello, World!"}

@app.get("/fun")
def fun(text: str):
    return {"message": f"Hello, {text}!"}

@app.get("/mcp/tools")
async def mcp_tools():
    result = await app.state.mcp.list_tools()
    return [{"name": t.name, "description": t.description} for t in result.tools]


def _content_texts(result):
    return [
        item.text
        for item in result.content
        if getattr(item, "text", None)
    ]


def _first_json(result):
    for text in _content_texts(result):
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            return {"content": text}
    return None


@app.get("/users/{username}/repositories")
async def user_repositories(username: str):
    try:
        result = await get_user_repositories(
            app.state.mcp, username
        )
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc))

    return _first_json(result)


@app.get("/repos/{owner}/{repo}/readme")
async def repo_readme(owner: str, repo: str):
    try:
        result = await get_repository_readme(
            app.state.mcp, owner, repo
        )
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc))

    return {
        "owner": owner,
        "repo": repo,
        "readme": "\n".join(_content_texts(result)),
    }