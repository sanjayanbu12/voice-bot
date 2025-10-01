from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from .services import get_gemini_response
from .database import conversation_collection

# Initialize the FastAPI app
app = FastAPI()

# CORS origins - allow both localhost and 127.0.0.1
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "https://voice-bot-gamma-seven.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic model for the request body
class ChatRequest(BaseModel):
    query: str

@app.get("/")
def read_root():
    return {"message": "Gemini Voice Bot API is running!"}

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    if not request.query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    # Get response from Gemini
    bot_response_text = await get_gemini_response(request.query)

    # Log conversation to MongoDB
    conversation_log = {
        "user_query": request.query,
        "bot_response": bot_response_text,
        "timestamp": datetime.utcnow()
    }
    await conversation_collection.insert_one(conversation_log)

    return {"response": bot_response_text}