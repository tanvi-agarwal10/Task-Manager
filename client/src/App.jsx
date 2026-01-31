import { useEffect, useState } from "react";
import API from "./services/api";
import AddTaskModal from "./components/AddTaskModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // DELETE
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // STATUS DROPDOWN 
  const updateStatus = async (task, newStatus) => {
    await API.put(`/tasks/${task._id}`, {
      status: newStatus,
    });
    fetchTasks();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1e1e1e",
        paddingTop: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "white" }}>Task Manager</h1>

      <button
        onClick={() => {
          setEditingTask(null);
          setShowModal(true);
        }}
        style={addBtn}
      >
        + Add Task
      </button>

      {showModal && (
        <AddTaskModal
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          refresh={fetchTasks}
          editTask={editingTask}
        />
      )}

      {tasks.map((task) => (
        <div key={task._id} style={card}>
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <div style={{ margin: "10px 0" }}>
            <label>Status: </label>

            <select
              value={task.status}
              onChange={(e) =>
                updateStatus(task, e.target.value)
              }
              style={dropdown}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div style={{ marginTop: 10 }}>
            <button
              onClick={() => {
                setEditingTask(task);
                setShowModal(true);
              }}
              style={editBtn}
            >
              Edit
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              style={deleteBtn}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;


// STYLES
const addBtn = {
  padding: "10px 16px",
  marginBottom: 25,
  background: "#4cafef",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const card = {
  width: 320,
  background: "white",
  color: "black",
  borderRadius: 12,
  padding: 18,
  marginBottom: 18,
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
};

const dropdown = {
  padding: "6px 10px",
  borderRadius: 6,
  marginLeft: 10,
};

const editBtn = {
  background: "blue",
  color: "white",
  padding: "6px 12px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
};

const deleteBtn = {
  marginLeft: 10,
  background: "red",
  color: "white",
  padding: "6px 12px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
};
