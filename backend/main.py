from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def fun():
    return {"message": "Hello, World!"}

@app.get("/fun")
def fun(text: str):
    return {"message": f"Hello, {text}!"}