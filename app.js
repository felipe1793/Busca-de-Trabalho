const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const db = require("./db/connection");
const path = require("path")
const bodyParser = require("body-parser");
const job = require("./models/Job");
const sequelize = require("sequelize");
const Op = sequelize.Op

const port = 3000;

app.listen(port, () => {
    console.log("O express está rodando na porta: " + port)
    console.log("http://localhost:" + port + "/")
});

// Body_Parser
app.use(bodyParser.urlencoded({extended:false}));

// handle bars
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs.engine({defaultLayout: 'main'}));
app.set("view engine", "handlebars")

// static folder
app.use(express.static(path.join(__dirname, "public")))

// DB connection
db.authenticate().then(() => {
    console.log("conectou ao servidor")
}).catch((err) => {
    console.log("Ocorreu um erro ao conectar" + err)
});

// Routes

app.get("/", (req, res) => {

    let search = req.query.job
    let query = "%"+search+"%" //PH -> PHP, word -> wordpress, py -> python

    if(!search) {
        job.findAll({order: [
            ["createdAt", "DESC"]
        ]}).then(jobs => {
            res.render("index", {jobs});
        })
        .catch(err => console.log(err))
    } else {
        job.findAll({
            where: { title:{[Op.like]: query}},
            order: [
            ["createdAt", "DESC"]
        ]}).then(jobs => {
            res.render("index", {
                jobs, search
            });
        })
        .catch(err => console.log(err))
    }

});

app.use("/jobs", require("./routes/jobs"))
