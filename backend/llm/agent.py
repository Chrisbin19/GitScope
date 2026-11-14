
import json

from llm.llm_client import groq_client, MODEL
from github_mcp.mcp_executor import execute_mcp_tool


# STEP 1: Ask Groq to select an appropriate tool
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


# STEP 2: Execute the tool selected by Groq
async def execute_selected_tool(session, message):

    results = []

    for tool_call in message.tool_calls:

        # Extract tool name
        tool_name = tool_call.function.name

        # Convert JSON arguments into Python dictionary
        arguments = json.loads(
            tool_call.function.arguments
        )

        print(f"Executing tool: {tool_name}")
        print(f"Arguments: {arguments}")

        # Execute MCP tool
        result = await execute_mcp_tool(
            session=session,
            tool_name=tool_name,
            arguments=arguments
        )

        results.append(result)

    return results


# STEP 3: Execute tools and prepare conversation messages
async def execute_and_return_results(session, assistant_message):

    tool_results = []

    # Preserve the assistant's original tool-call message
    assistant_tool_message = {
        "role": "assistant",
        "content": assistant_message.content,
        "tool_calls": [
            tool_call.model_dump(exclude_none=True)
            for tool_call in assistant_message.tool_calls
        ]
    }

    tool_results.append(assistant_tool_message)

    # Execute every requested tool
    for tool_call in assistant_message.tool_calls:

        tool_name = tool_call.function.name

        arguments = json.loads(
            tool_call.function.arguments
        )

        result = await execute_mcp_tool(
            session=session,
            tool_name=tool_name,
            arguments=arguments
        )

        # Append the tool result to conversation messages
        tool_results.append({
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": result
        })

    return tool_results



# STEP 4: Send updated messages back to Groq
async def get_llm_response(messages, openai_tools):

    response = await groq_client.chat.completions.create(
        model=MODEL,
        messages=messages,
        tools=openai_tools,
        tool_choice="auto"
    )

    return response.choices[0].message


# STEP 5: Complete ReAct agent loop
async def run_agent(session, user_query, openai_tools):

    messages = [
        {
            "role": "user",
            "content": user_query
        }
    ]

    max_iterations = 8

    for iteration in range(max_iterations):

        print(f"\nAgent iteration: {iteration + 1}")

        # Ask Groq what to do next
        assistant_message = await get_llm_response(
            messages,
            openai_tools
        )

        # If no tool is requested, the agent has its final answer
        if not assistant_message.tool_calls:

            print("\nAgent completed its task.")

            return assistant_message.content

        # Execute requested tools and collect their observations
        tool_results = await execute_and_return_results(
            session,
            assistant_message
        )

        # Add assistant tool calls and tool results to conversation
        messages.extend(tool_results)

    return "Maximum agent iterations reached."
