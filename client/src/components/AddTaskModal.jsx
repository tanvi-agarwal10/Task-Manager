import { useState } from "react";
import API from "../services/api";

function AddTaskModal({ onClose, refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!title) return alert("Title required");

    await API.post("/tasks", {
      title,
      description,
      status: "pending",
    });

    refresh();
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2>Add New Task</h2>

        <input
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={input}
        />

        <textarea
          placeholder="Enter description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={input}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Add Task</button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;

// Simple styles
const overlay = {
  position:"fixed",
  top:0,left:0,right:0,bottom:0,
  background:"rgba(0,0,0,0.4)",
  display:"flex",
  justifyContent:"center",
  alignItems:"center"
};

const modal = {
  background:"white",
  padding:20,
  borderRadius:8,
  width:300
};

const input = {
  width:"100%",
  padding:8,
  margin:"10px 0"
};

