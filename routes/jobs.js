const express = require("express");
const router = express.Router();
const job = require("../models/Job");

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

router.get("/add", (req, res)=> {
    res.render("add")
})

module.exports = router;
