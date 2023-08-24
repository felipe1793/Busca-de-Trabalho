const express = require("express");
const router = express.Router();
const job = require("../models/Job");

router.get("/tetse", (req, res) => {
    res.send("foi ?")
})
// add job via post

router.post("/add", (req, res) => {
    let {title, description, salary, company, email, new_job} = req.body;

    // Insert
    job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    }).then(() => {res.redirect("/")});

});

module.exports = router;
