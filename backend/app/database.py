import motor.motor_asyncio
from .config import settings

# Create a client to connect to MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient(settings.mongo_uri)

# Get a reference to the database
database = client.voice_bot_db

# Get a reference to the collection where conversations will be stored
conversation_collection = database.get_collection("conversations")