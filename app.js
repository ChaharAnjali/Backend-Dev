const express = require("express");
const app = express();
const PORT = 5000;



app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${duration}ms`);
  });

  next();
});



let users = [
  { id: 1, name: "Anjali" },
  { id: 2, name: "AC" },
  { id: 3, name: "TAN" }
];

app.get("/users", (req, res) => {
  const { name } = req.query;

  let filteredUsers = users;

  if (name) {
    filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.json(filteredUsers);
});



app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/contact", (req, res) => {
  console.log("Contact Form Data:", req.body);
  res.send("Form submitted successfully!");
});


app.get("/gallery", (req, res) => {
  const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
  res.render("gallery", { images });
});



let posts = [
  {
    id: 1,
    title: "My First Post",
    content: "This is my first blog post!"
  }
];

app.get("/blog", (req, res) => {
  res.render("blog", { posts });
});

app.get("/blog/new", (req, res) => {
  res.render("newpost");
});

app.post("/blog", (req, res) => {
  const { title, content } = req.body;

  const newPost = {
    id: posts.length + 1,
    title,
    content
  };

  posts.push(newPost);

  res.redirect("/blog");
});

app.get("/blog/:id", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return res.status(404).render("error404");
  }

  res.render("post", { post });
});



app.use((req, res) => {
  res.status(404).render("error404");
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
