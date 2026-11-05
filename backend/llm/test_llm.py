import asyncio
from llm.llm_client import ask_llm


async def main():

    response = await ask_llm(
        "Explain what GitHub MCP is in two sentences."
    )

    message = response.choices[0].message

    print("Role:", message.role)
    print("Content:", message.content)
    print("Tool calls:", message.tool_calls)


if __name__ == "__main__":
    asyncio.run(main())