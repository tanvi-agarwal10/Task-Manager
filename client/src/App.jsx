import { useEffect, useState } from "react";
import API from "./services/api";
import AddTaskModal from "./components/AddTaskModal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding:20 }}>
      <h1>Task Manager</h1>

      <button onClick={()=>setShowModal(true)}>
        + Add New Task
      </button>

      {showModal && (
        <AddTaskModal
          onClose={()=>setShowModal(false)}
          refresh={fetchTasks}
        />
      )}

      {tasks.map(task=>(
        <div key={task._id}
          style={{
            border:"1px solid #ccc",
            padding:10,
            margin:"10px 0"
          }}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
