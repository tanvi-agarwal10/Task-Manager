import { useEffect, useState } from "react";
import API from "./services/api";
import AddTaskModal from "./components/AddTaskModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch tasks
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

  // Delete task
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // Toggle status
  const toggleStatus = async (task) => {
    await API.put(`/tasks/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending",
    });
    fetchTasks();
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Task Manager</h1>

      <button
        onClick={() => setShowModal(true)}
        style={{
          padding: "10px 15px",
          marginBottom: 20,
          cursor: "pointer",
        }}
      >
        + Add Task
      </button>

      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          refresh={fetchTasks}
        />
      )}

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 15,
            marginBottom: 15,
            background: "#fafafa",
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>

          <p>
            Status:
            <span
              style={{
                color:
                  task.status === "completed" ? "green" : "orange",
                fontWeight: "bold",
              }}
            >
              {" " + task.status}
            </span>
          </p>

          <button onClick={() => toggleStatus(task)}>
            Toggle Status
          </button>

          <button
            onClick={() => deleteTask(task._id)}
            style={{ marginLeft: 10, color: "red" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
