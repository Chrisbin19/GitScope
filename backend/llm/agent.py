from llm.llm_client import groq_client, MODEL


async def select_tool(user_query: str, openai_tools: list):

    response = await groq_client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": user_query
            }
        ],
        tools=openai_tools,
        tool_choice="auto"
    )

    message = response.choices[0].message

    return message