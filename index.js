import express from "express";

import connection from "./config/sequelize-config.js";

const app = express();

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

connection.authenticate().then(() =>{

    console.log("Conexão com o Banco de Dados realizada com sucesso!");
}).catch((error) => {
    console.log(`Ocorreu um erro ao se conectar ao banco de dados. Erro: ${error}`);
});

const DB_NAME = "nexus_team";
connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`).then(() => {
    console.log(`O banco de dados ${DB_NAME} está criado!`);
}).catch((error)=> {
    console.log(`Ocorreu um erro ao criar o banco de dados! Erro: ${error}`);
});


import BlogController from "./controllers/BlogController.js";
import MembrosController from "./controllers/MembrosController.js";
import LoginController from "./controllers/LoginController.js";


app.use("/", BlogController);
app.use("/", MembrosController);
app.use("/", LoginController);

app.get("/", (req, res) => {
    res.render('index');
});

const port = 8080;
app.listen(port, (error) => {
    if(error) {
        console.log(`Ocorreu um erro ao iniciar o servidor. Erro: ${error}`);
    } else {
        console.log(`Servidor iniciado com sucesso em: http://localhost:${port}`);
    }
})

