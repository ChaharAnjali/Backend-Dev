// Use Database
use libraryDB

// 1. Adding New Books
db.books.insertMany([
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    available: true
  },
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    available: true
  }
]);

// 2. Finding Books by Author
db.books.find({ author: "Paulo Coelho" });

// 3. Updating Book Availability
db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { available: false } }
);

// 4. Tracking Borrowed Books by User
db.books.updateOne(
  { title: "Harry Potter" },
  { $set: { borrowedBy: "AC", available: false } }
);

// Find borrowed books by user
db.books.find({ borrowedBy: "AC" });