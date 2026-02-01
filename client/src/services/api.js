import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-qwmq.onrender.com/api",
});

export default API;
