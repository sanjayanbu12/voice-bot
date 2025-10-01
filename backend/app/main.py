from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from .services import get_gemini_response
from .database import conversation_collection

# Initialize the FastAPI app
app = FastAPI()

# Configure CORS (Cross-Origin Resource Sharing)
# This allows the React frontend to communicate with this backend.
origins = [
    "http://localhost:5173", # Default Vite dev server port
    "http://localhost:3000", # Default Create React App port
    # Add your deployed frontend URL here when you deploy
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
    """
    Receives user query, gets a response from Gemini, and logs it to MongoDB.
    """
    if not request.query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    # Get response from our Gemini service
    bot_response_text = get_gemini_response(request.query)

    # Create a conversation log document
    conversation_log = {
        "user_query": request.query,
        "bot_response": bot_response_text,
        "timestamp": datetime.utcnow()
    }

    # Asynchronously insert the log into MongoDB
    await conversation_collection.insert_one(conversation_log)

    return {"response": bot_response_text}