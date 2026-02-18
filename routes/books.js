const express = require("express");
const router = express.Router();
const validateYear = require("../middleware/validateYear");

let books = [
  { id: 1, title: "Book A", author: "Anjali", year: 2022 },
  { id: 2, title: "Book B", author: "Rahul", year: 2021 },
  { id: 3, title: "Node Guide", author: "Anjali", year: 2023 }
];


// ✅ GET all books (Filter + Pagination + Search)
router.get("/", (req, res) => {
  let { author, year, page = 1, limit = 10, search } = req.query;

  let filteredBooks = books;

  // Exercise 1: Filter by author
  if (author) {
    filteredBooks = filteredBooks.filter(b => b.author === author);
  }

  // Filter by year
  if (year) {
    filteredBooks = filteredBooks.filter(b => b.year == year);
  }

  // Exercise 5: Search by title
  if (search) {
    filteredBooks = filteredBooks.filter(b =>
      b.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Exercise 3: Pagination
  page = parseInt(page);
  limit = parseInt(limit);

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedBooks = filteredBooks.slice(start, end);

  res.json(paginatedBooks);
});


// ✅ Add new book (with validation middleware)
router.post("/", validateYear, (req, res) => {
  const newBook = {
    id: books.length + 1,
    ...req.body
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

module.exports = router;
