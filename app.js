const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const db = require("./db/connection");
const path = require("path")
const bodyParser = require("body-parser");

const port = 3000;

app.listen(port, () => {
    console.log("O express está rodando na porta: " + port)
    console.log("http://localhost:" + port + "/")
});

// Body_Parser
app.use(bodyParser.urlencoded({extended:false}));

// handle bars
app.set("views", path(__dirname, "views"));
app.engine("handlebars", exphbs({defaultLayout: 'main'}));
app.set("view engine", "handlebars")

// DB connection
db.authenticate().then(() => {
    console.log("conectou ao servidor")
}).catch((err) => {
    console.log("Ocorreu um erro ao conectar" + err)
});

// Routes

app.get("/", (req, res) => {
    res.send("Estou funcionando");
});

app.use("/jobs", require("./routes/jobs"))
