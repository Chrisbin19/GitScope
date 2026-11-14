
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import logging

from github_mcp.mcp_client import github_mcp_session
from github_mcp.mcp_tools import convert_mcp_tools_to_openai
from llm.agent import run_agent


logging.basicConfig(level=logging.INFO)

app = FastAPI(
    title="GitScope API",
    description="AI-powered GitHub developer analysis",
    version="1.0.0"
)


# Request body schema
class AnalyzeRequest(BaseModel):
    username: str = Field(
        min_length=1,
        max_length=39,
        pattern=r"^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$"
    )


@app.get("/")
async def root():
    return {"message": "Welcome to GitScope API"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


# GitHub profile analysis endpoint
@app.post("/analyze")
async def analyze_github_profile(request: AnalyzeRequest):

    username = request.username

    user_query = (
        f"Analyze the GitHub profile of {username}. "
        "Find their repositories and identify their "
        "main technical areas of expertise. "
        "Provide evidence based on the available repository information."
    )

    try:
        # Open GitHub MCP connection
        async with github_mcp_session() as session:

            # Discover available MCP tools
            tools_result = await session.list_tools()

            # Convert MCP tools to Groq-compatible tools
            openai_tools = convert_mcp_tools_to_openai(
                tools_result.tools
            )

            # Execute the ReAct agent
            report = await run_agent(
                session=session,
                user_query=user_query,
                openai_tools=openai_tools
            )

        return {
            "success": True,
            "username": username,
            "report": report
        }

    except Exception:
        logging.exception(
            "GitHub analysis failed for username: %s",
            username
        )

        raise HTTPException(
            status_code=500,
            detail="Failed to analyze GitHub profile."
        )
