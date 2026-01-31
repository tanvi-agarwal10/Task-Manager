# 📋 Task Manager App

A simple full-stack Task Management Web Application where users can create, view, update, and delete tasks.  
Built as part of a Full Stack Development Internship assessment.

---

# 🚀 Features

✅ Create new tasks  
✅ View all tasks  
✅ Edit task title & description  
✅ Update task status (Pending / Completed) using dropdown  
✅ Delete tasks  
✅ Persistent storage using MongoDB  
✅ Clean and responsive UI  

---

# 🛠️ Tech Stack

## Frontend
- React (Vite)
- Axios
- CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

---

# 📂 Project Structure

```
task-manager/
│
├── client/          # React frontend
│   ├── src/
│   └── package.json
│
├── server/          # Node/Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
└── README.md
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone <your-github-repo-link>
cd task-manager
```

---

# 🔧 Backend Setup

```bash
cd server
npm install
```

### Create `.env` file in `/server`

```
PORT=3001
MONGO_URI=your_mongodb_connection_string
```

> Use MongoDB Atlas or local MongoDB.

---

### Run Backend

```bash
npm run dev
```

Backend runs on:

```
http://localhost:3001
```

---

# 💻 Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|--------|---------|------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

---

# 🎯 Functional Overview

### Create Task
Users can add a new task with:
- Title
- Description
- Status (default: Pending)

---

### View Tasks
All tasks are displayed in cards showing:
- Title  
- Description  
- Status  

---

### Update Task
Users can:
- Edit title & description  
- Change status via dropdown  

---

### Delete Task
Tasks can be removed permanently.

---

# 👩‍💻 Author

Tanvi Agarwal
