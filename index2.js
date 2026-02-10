const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const PORT = 8000;

// Home route
app.get("/", (req, res) => {
  return res.send("<h1>Welcome to home page</h1>");
});

// Get all students from file
app.get("/Student", (req, res) => {
  fs.readFile("./students.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("could not read students file");
    }
    return res.status(200).json(JSON.parse(data || "[]"));
  });
});

// Register new student
app.post("/Student/register", (req, res) => {
  const { name, branch } = req.body;

  if (!name || !branch) {
    return res.status(400).send("Invalid student data");
  }

  fs.readFile("./students.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("could not read students file");
    }

    const students = JSON.parse(data || "[]");

    const newStudent = {
      id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
      name,
      branch,
    };

    students.push(newStudent);

    fs.writeFile("./students.json", JSON.stringify(students, null, 2), (err) => {
      if (err) {
        return res.status(500).send("error writing to students file");
      }

      return res.status(201).json({
        message: "Student registered successfully",
        student: newStudent
      });
    });
  });
});

// ✅ CORRECT PUT ROUTE (FIXED)
app.put("/Student/:id", (req, res) => {
  const { id } = req.params;
  const { name, branch } = req.body;

  if (!name || !branch) {
    return res.status(400).send("Invalid student data");
  }

  fs.readFile("./students.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("could not read students file");
    }

    let students = JSON.parse(data || "[]");

    const index = students.findIndex(s => s.id == id);

    if (index === -1) {
      return res.status(404).send("Student not found");
    }

    students[index] = {
      id: Number(id),
      name,
      branch
    };

    fs.writeFile("./students.json", JSON.stringify(students, null, 2), (err) => {
      if (err) {
        return res.status(500).send("error writing to students file");
      }

      res.json({
        message: "Student updated successfully",
        student: students[index]
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
