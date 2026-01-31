const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));

app.get("/", (req,res)=>{
  res.send("API running");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


const taskRoutes = require("./routes/taskRoutes");

app.use("/api/tasks", taskRoutes);
