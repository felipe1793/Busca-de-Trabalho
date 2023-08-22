const express = require("express");
const app = express();
const db = require("./db/connection")

const port = 3000;

app.listen(port, () => {
    console.log("O express está rodando na porta: " + port)
});

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