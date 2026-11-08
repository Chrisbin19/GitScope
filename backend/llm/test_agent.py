
import asyncio

from github_mcp.mcp_client import github_mcp_session
from github_mcp.mcp_tools import convert_mcp_tools_to_openai
from llm.agent import select_tool, execute_and_return_results


async def main():

    async with github_mcp_session() as session:

        tools_result = await session.list_tools()

        openai_tools = convert_mcp_tools_to_openai(
            tools_result.tools
        )

        message = await select_tool(
            "Find repositories belonging to torvalds",
            openai_tools
        )

        if message.tool_calls:

            messages = await execute_and_return_results(
                session,
                message
            )

            print("\nMessages returned:")

            for item in messages:
                print("\n", item)

        else:
            print(message.content)


if __name__ == "__main__":
    asyncio.run(main())
