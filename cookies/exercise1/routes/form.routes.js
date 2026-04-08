import express from "express";
const router = express.Router();

// Step 1
router.get("/", (req, res) => {
    res.render("step1");
});

router.post("/step1", (req, res) => {
    req.session.user = req.body;
    res.redirect("/step2");
});

// Step 2
router.get("/step2", (req, res) => {
    res.render("step2");
});

router.post("/step2", (req, res) => {
    req.session.user = {
        ...req.session.user,
        ...req.body
    };
    res.redirect("/summary");
});

// Summary
router.get("/summary", (req, res) => {
    res.render("summary", { data: req.session.user });
});

// Final submit
router.post("/submit", (req, res) => {
    const userData = req.session.user;

    console.log("Final Data:", userData);

    req.session.destroy();

    res.send("Registration Completed Successfully!");
});

export default router;