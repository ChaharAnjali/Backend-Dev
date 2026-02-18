const express = require("express");
const router = express.Router();

let authors = [
  { id: 1, name: "Anjali" },
  { id: 2, name: "Rahul" }
];

// GET all authors
router.get("/", (req, res) => {
  res.json(authors);
});

// GET author by ID
router.get("/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  res.json(author);
});

// Create author
router.post("/", (req, res) => {
  const newAuthor = {
    id: authors.length + 1,
    name: req.body.name
  };

  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// Update author
router.put("/:id", (req, res) => {
  const author = authors.find(a => a.id == req.params.id);

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  author.name = req.body.name;
  res.json(author);
});

// Delete author
router.delete("/:id", (req, res) => {
  authors = authors.filter(a => a.id != req.params.id);
  res.json({ message: "Author deleted successfully" });
});

module.exports = router;
