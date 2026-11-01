from contextlib import asynccontextmanager

from fastapi import FastAPI

from mcp_client import github_mcp_session


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