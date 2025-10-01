Sanjay's AI Voice BotAn intelligent, voice-powered chatbot that represents Sanjay Anbazhagan, a Full-stack & Generative AI Engineer. The bot can answer questions about Sanjay's professional life and also handle general knowledge queries, switching its persona dynamically.✨ Features🎤 Voice Interaction: Full speech-to-text and text-to-speech capabilities for a hands-free conversation.🧠 Dual Persona AI: Intelligently detects whether a question is about Sanjay or a general topic, and adapts its personality accordingly.🤖 Powered by Google Gemini: Leverages the latest generative AI models for natural and coherent responses.Modern UI: A sleek, futuristic interface with an animated aurora background, built with React and Framer Motion.Full-Stack Architecture: Built on a robust monorepo structure with a React frontend and a FastAPI backend.Conversation Logging: All interactions are stored in a MongoDB database.🛠️ Tech StackFrontend: React.js, Vite, Tailwind CSS, Framer MotionBackend: Python, FastAPIDatabase: MongoDBAI: Google Gemini APIDeployment: Vercel (Frontend), Render (Backend)🚀 Getting StartedFollow these instructions to set up and run the project on your local machine.PrerequisitesNode.js (v18 or later)Python (v3.9 or later)MongoDB installed and running locally, or a connection string from MongoDB Atlas.⚙️ Environment VariablesYou will need to create two environment files.Backend (/backend/.env):GEMINI_API_KEY="YOUR_GOOGLE_AI_STUDIO_API_KEY"
MONGO_URI="YOUR_MONGODB_CONNECTION_STRING"
Frontend (/frontend/.env.local):VITE_API_BASE_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)
🐍 Backend SetupNavigate to the backend directory:cd backend
Create and activate a virtual environment:# For macOS/Linux
python3 -m venv venv
source venv/bin/activate

# For Windows
python -m venv venv
venv\Scripts\activate
Install the required packages:pip install -r requirements.txt
Run the FastAPI server:python3 -m uvicorn app.main:app --reload
The backend will be running at http://127.0.0.1:8000.⚛️ Frontend SetupNavigate to the frontend directory in a new terminal:cd frontend
Install the required packages:npm install
Run the React development server:npm run dev
The frontend will be running at http://localhost:5173.☁️ DeploymentThis monorepo is designed to be deployed as two separate services:Frontend (React): Deploy the /frontend directory to Vercel. Remember to set the VITE_API_BASE_URL environment variable to your deployed backend URL.Backend (FastAPI): Deploy the /backend directory to Render. Set the start command to uvicorn app.main:app --host 0.0.0.0 --port $PORT and add your GEMINI_API_KEY and MONGO_URI as environment variables.📂 Project Structuregemini-voice-bot/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   └── services.py
│   ├── .env
│   └── requirements.txt
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.local
    └── package.json
Built by Sanjay Anbazhagan.
