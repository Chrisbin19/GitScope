
import os
from dotenv import load_dotenv
from openai import AsyncOpenAI

load_dotenv()

groq_client = AsyncOpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

MODEL = "openai/gpt-oss-120b"


async def ask_llm(prompt: str):

    response = await groq_client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response
