import os
import asyncio
from contextlib import asynccontextmanager
from collections.abc import AsyncIterator
from mcp_tools import convert_mcp_tools_to_openai
import httpx

from dotenv import load_dotenv
from mcp import ClientSession
from mcp.client.streamable_http import streamable_http_client

load_dotenv()

GITHUB_MCP_URL = "https://api.githubcopilot.com/mcp/readonly"


@asynccontextmanager
async def github_mcp_session() -> AsyncIterator[ClientSession]:
    token = os.getenv("GITHUB_TOKEN")

    if not token:
        raise ValueError("GITHUB_TOKEN not found in .env")

    headers = {
        "Authorization": f"Bearer {token}"
    }

    async with httpx.AsyncClient(
        headers=headers,
        timeout=httpx.Timeout(30, read=300)
    ) as http_client:

        async with streamable_http_client(
            GITHUB_MCP_URL,
            http_client=http_client
        ) as (read_stream, write_stream):

            async with ClientSession(
                read_stream, write_stream
            ) as session:

                await session.initialize()

                yield session



async def get_user_repositories(
    session: ClientSession,
    username: str
):
    result = await session.call_tool(
        name="search_repositories",
        arguments={
            "query": f"user:{username}",
            "perPage": 100,
            "page": 1,
            "sort": "updated",
            "order": "desc",
            "minimal_output": False
        }
    )

    if result.is_error:
        raise RuntimeError(f"GitHub MCP error: {result.content}")

    return result


async def get_repository_readme(
    session: ClientSession,
    owner: str,
    repo: str
):
    result = await session.call_tool(
        name="get_file_contents",
        arguments={
            "owner": owner,
            "repo": repo,
            "path": "README.md"
        }
    )

    if result.is_error:
        raise RuntimeError(
            f"GitHub MCP error: {result.content}"
        )

    return result


async def inspect_file_tool(session: ClientSession):
    tools_result = await session.list_tools()

    file_tool = next(
        (tool for tool in tools_result.tools
         if tool.name == "get_file_contents"),
        None
    )

    if file_tool is None:
        raise RuntimeError("get_file_contents not available")

    print("\nget_file_contents schema:")
    print(file_tool.input_schema)



async def main():
    async with github_mcp_session() as session:

        tools_result = await session.list_tools()

        openai_tools = convert_mcp_tools_to_openai(
            tools_result.tools
        )

        for tool in openai_tools:
            print(tool)


if __name__ == "__main__":
    asyncio.run(main())