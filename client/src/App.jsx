
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

import { useEffect, useState } from "react";
import API from "./services/api";
import AddTaskModal from "./components/AddTaskModal";

function App() {
  const [tasks,setTasks]=useState([]);
  const [showModal,setShowModal]=useState(false);

  const fetchTasks=async()=>{
    const res=await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(()=>{ fetchTasks(); },[]);

  return (
    <div style={{padding:20}}>
      <h1>Task Manager</h1>

      <button onClick={()=>setShowModal(true)}>
        + Add Task
      </button>

      {showModal && (
        <AddTaskModal
          onClose={()=>setShowModal(false)}
          refresh={fetchTasks}
        />
      )}

      {tasks.map(task=>(
        <div key={task._id}
          style={{border:"1px solid #ccc",padding:10,margin:10}}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}

export default App
