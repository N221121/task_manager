## 📝 Task Manager App (Full Stack)

A full-stack Task Management Application built using the MERN stack that helps users create, update, delete, and track tasks efficiently with activity logging.

## 🚀 Features
➕ Create new tasks
✏️ Edit existing tasks
❌ Delete tasks
📋 View all tasks
🕒 Track task activity history
🔐 Backend API using Express
🌐 Frontend built with React (Vite)

## 🛠️ Tech Stack
## Frontend
React (Vite)
JavaScript (ES6+)
Tailwind CSS
Axios
## Backend
Node.js
Express.js
## Database
MongoDB (or MongoDB Atlas if connected)
## project structure
task_manager/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── taskController.js
│   │
│   ├── models/
│   │   ├── Task.js
│   │  
│   │
│   ├── routes/
│   │   └── taskRoute.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── vite.config.js
│   ├── index.html
│   └── package.json
│
└── .gitignore

## Clone the repository
git clone https://github.com/your-username/task-manager.git
cd task-manager

## Backend setup
cd backend
npm install
npm start

## Backend runs at:

http://localhost:3000

## Frontend setup
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173

## 🔌 API Endpoints
Method	Endpoint	        Description
GET	|  /api/tasks	        Get all tasks
POST |  /api/tasks	      Create new task
PUT	|  /api/tasks/:id	    Update task
DELETE	| /api/tasks/:id	Delete task

## 📌 Future Improvements
🔐 User authentication (JWT)
☁️ Deploy backend on Render
🌐 Deploy frontend on Vercel
📱 Mobile responsive UI improvements
🔔 Task reminders & notifications

## 👨‍💻 Author

Tejaswini Kotha
Full Stack Developer

## ⭐ Project Purpose

To build a simple productivity tool that helps users manage daily tasks efficiently with full CRUD operations and clean UI.
