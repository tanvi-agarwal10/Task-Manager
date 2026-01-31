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
        <h2>Add Task</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={e=>setTitle(e.target.value)}
          style={input}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e=>setDescription(e.target.value)}
          style={input}
        />

        <button onClick={handleSubmit}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AddTaskModal;

const overlay={
  position:"fixed",top:0,left:0,right:0,bottom:0,
  background:"rgba(0,0,0,0.4)",
  display:"flex",justifyContent:"center",alignItems:"center"
};

const modal={
  background:"white",padding:20,borderRadius:8,width:300
};

const input={
  width:"100%",padding:8,margin:"10px 0"
};
