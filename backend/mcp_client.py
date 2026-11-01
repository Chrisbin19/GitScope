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


async def main():
    async with github_mcp_session() as session:
        print("Connected to GitHub MCP!")

        result = await session.list_tools()

        print("\nAvailable tools:")

        for tool in result.tools:
            print(f"\n{tool.name}")
            print(tool.description)


if __name__ == "__main__":
    asyncio.run(main())
