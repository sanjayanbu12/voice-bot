Sanjay's AI Voice Bot
An intelligent, voice-powered chatbot that represents Sanjay Anbazhagan, a Full-stack & Generative AI Engineer. The bot can answer questions about Sanjay's professional life and also handle general knowledge queries, switching its persona dynamically.

✨ Features
🎤 Voice Interaction: Full speech-to-text and text-to-speech for a hands-free conversation.

🧠 Dual Persona AI: Intelligently adapts its personality based on the context of the question.

🤖 Powered by Google Gemini: Leverages the latest generative AI for natural, coherent responses.

🎨 Modern UI: A sleek, futuristic interface built with React and Framer Motion.

🧩 Full-Stack Architecture: Built on a robust monorepo structure with a React frontend and a FastAPI backend.

💾 Conversation Logging: All interactions are stored in a MongoDB database.

🛠️ Tech Stack
Frontend: React.js, Vite, Tailwind CSS, Framer Motion

Backend: Python, FastAPI

Database: MongoDB

AI: Google Gemini API

Deployment: Vercel (Frontend), Render (Backend)

🚀 Getting Started
Follow these instructions to set up and run the project locally.

Prerequisites
Node.js (v18 or later)

Python (v3.9 or later)

MongoDB running locally or a connection string from MongoDB Atlas.

Environment Variables
Backend (/backend/.env):

Code snippet

GEMINI_API_KEY="YOUR_GOOGLE_AI_STUDIO_API_KEY"
MONGO_URI="YOUR_MONGODB_CONNECTION_STRING"
Frontend (/frontend/.env.local):

Code snippet

VITE_API_BASE_URL=http://127.0.0.1:8000
Backend Setup (🐍)
Navigate to the backend directory:

Bash

cd backend
Create and activate a virtual environment:

Bash

# For macOS/Linux
python3 -m venv venv
source venv/bin/activate

# For Windows
python -m venv venv
venv\Scripts\activate
Install packages:

Bash

pip install -r requirements.txt
Run the FastAPI server:

Bash

python3 -m uvicorn app.main:app --reload
The backend will be running at http://127.0.0.1:8000.

Frontend Setup (⚛️)
Navigate to the frontend directory (in a new terminal):

Bash

cd frontend
Install packages:

Bash

npm install
Run the React development server:

Bash

npm run dev
The frontend will be running at http://localhost:5173.

☁️ Deployment
Frontend (React): Deploy the /frontend directory to Vercel. Set the VITE_API_BASE_URL environment variable to your deployed backend URL.

Backend (FastAPI): Deploy the /backend directory to Render. Set the start command to uvicorn app.main:app --host 0.0.0.0 --port $PORT and add your GEMINI_API_KEY and MONGO_URI as environment variables.

