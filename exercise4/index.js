const express = require("express");
const app = express();

app.use(express.json()); // for parsing JSON body

// In-memory tasks array
let tasks = [];
let idCounter = 1;

// Create task
app.post("/tasks", (req, res) => {
  const task = {
    id: idCounter++,
    title: req.body.title || "Untitled Task",
    completed: false
  };
  tasks.push(task);
  res.status(201).json(task);
});

// Read all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  if (!task) return res.status(404).json({ message: "Task not found" });

  task.title = req.body.title || task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === taskId);
  if (index === -1) return res.status(404).json({ message: "Task not found" });

  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`TODO API running on http://localhost:${PORT}`);
});