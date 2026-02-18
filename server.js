const express = require("express");
const app = express();

app.use(express.json());

const bookRoutes = require("./routes/books");
const authorRoutes = require("./routes/authors");

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
