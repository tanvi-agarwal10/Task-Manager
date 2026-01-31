import { useState, useEffect } from "react";
import API from "../services/api";

function AddTaskModal({ onClose, refresh, editTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

 
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || "");
      setDescription(editTask.description || "");
    }
  }, [editTask]);

  const handleSubmit = async () => {
    if (!title) return alert("Title required");

    try {
      if (editTask) {
        // UPDATE
        await API.put(`/tasks/${editTask._id}`, {
          title,
          description,
        });
      } else {
        // CREATE
        await API.post("/tasks", {
          title,
          description,
          status: "pending",
        });
      }

      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving task");
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2 style={{ color: "black" }}>
          {editTask ? "Edit Task" : "Add Task"}
        </h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={input}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={input}
        />

        <div style={{ marginTop: 10 }}>
          <button onClick={handleSubmit} style={primaryBtn}>
            {editTask ? "Update" : "Add"}
          </button>

          <button onClick={onClose} style={cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;

// styles
const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "white",
  padding: 20,
  borderRadius: 10,
  width: 320,
};

const input = {
  width: "100%",
  padding: 8,
  margin: "10px 0",
};

const primaryBtn = {
  background: "#4cafef",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
};

const cancelBtn = {
  marginLeft: 10,
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
};
