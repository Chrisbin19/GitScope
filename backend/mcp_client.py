import os
import asyncio
from contextlib import asynccontextmanager
from collections.abc import AsyncIterator

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


async def get_user_repositories(session: ClientSession, username: str):

    tools_result = await session.list_tools()

    search_tool = next(
        (tool for tool in tools_result.tools
         if tool.name == "search_repositories"),
        None
    )

    if search_tool is None:
        raise RuntimeError("search_repositories tool not available")

    print("\nSearch repositories schema:")
    print(search_tool.input_schema)

    # We'll add the actual tool invocation
    # after verifying the required arguments.

async def main():
    async with github_mcp_session() as session:

        username = input("Enter GitHub username: ").strip()

        if not username:
            print("Username cannot be empty")
            return

        await get_user_repositories(session, username)

if __name__ == "__main__":
    asyncio.run(main())
