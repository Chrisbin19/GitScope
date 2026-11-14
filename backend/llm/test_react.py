
import asyncio

from github_mcp.mcp_client import github_mcp_session
from github_mcp.mcp_tools import convert_mcp_tools_to_openai
from llm.agent import run_agent

async def main():

    async with github_mcp_session() as session:

        # Discover available MCP tools
        tools_result = await session.list_tools()

        # Convert tools into Groq-compatible format
        openai_tools = convert_mcp_tools_to_openai(
            tools_result.tools
        )

        # User query
        user_query = (
            "Analyze the GitHub profile of torvalds. "
            "Find his repositories and identify his "
            "main technical areas of expertise."
        )

        # Run the ReAct agent
        answer = await run_agent(
            session=session,
            user_query=user_query,
            openai_tools=openai_tools
        )

        print("\n========== GITSCOPE REPORT ==========")
        print(answer)

if __name__ == "__main__":
    asyncio.run(main())