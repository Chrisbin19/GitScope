import asyncio

from github_mcp.mcp_client import github_mcp_session
from github_mcp.mcp_tools import convert_mcp_tools_to_openai
from llm.agent import select_tool


async def main():

    async with github_mcp_session() as session:

        # Discover MCP tools
        tools_result = await session.list_tools()

        # Convert them into Groq-compatible tools
        openai_tools = convert_mcp_tools_to_openai(
            tools_result.tools
        )

        # Ask Groq to select a tool
        message = await select_tool(
            "Find repositories belonging to torvalds",
            openai_tools
        )

        print("Role:", message.role)
        print("Content:", message.content)
        print("Tool calls:", message.tool_calls)

        if message.tool_calls:
            for tool_call in message.tool_calls:
                print("\nTool name:", tool_call.function.name)
                print("Arguments:", tool_call.function.arguments)


if __name__ == "__main__":
    asyncio.run(main())