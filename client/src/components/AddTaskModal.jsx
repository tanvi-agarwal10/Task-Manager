import { useState } from "react";
import API from "../services/api";

function AddTaskModal({ onClose, refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!title) return alert("Title required");

    try {
      await API.post("/tasks", {
        title,
        description,
        status: "pending",
      });

      if (refresh) await refresh();
      // clear fields (optional) then close
      setTitle("");
      setDescription("");
      onClose();
    } catch (err) {
      console.error("Failed to add task", err);
      alert("Failed to add task. Check the console for details.");
    }
  };

  return (
    <div style={overlay}>
        <div style={modal}>
          <h2 style={{ margin: 0 }}>Add Task</h2>

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

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button onClick={handleSubmit} style={primaryButton}>Add</button>
          <button onClick={onClose} style={secondaryButton}>Cancel</button>
        </div>
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
  background:"white",padding:20,borderRadius:8,width:300,
  color: "#000"
};

const input={
  width:"100%",padding:8,margin:"10px 0",color:"#000",borderRadius:4,border:"1px solid #ddd"
};

const primaryButton={
  background: "#646cff",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer"
};

const secondaryButton={
  background: "#f0f0f0",
  color: "#000",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer"
};
