
import json
from mcp import ClientSession


async def execute_mcp_tool(
    session: ClientSession,
    tool_name: str,
    arguments: dict
):
    """
    Executes an MCP tool dynamically using its name
    and arguments.
    """

    result = await session.call_tool(
        name=tool_name,
        arguments=arguments
    )

    if result.is_error:
        raise RuntimeError(
            f"MCP tool execution failed: {result.content}"
        )

    # Convert MCP content into a string
    output = []

    for item in result.content:
        if hasattr(item, "text"):
            output.append(item.text)
        else:
            output.append(str(item))

    return "\n".join(output)
