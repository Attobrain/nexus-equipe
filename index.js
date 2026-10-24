import express from "express";

import connection from "./config/sequelize-config.js";

import session from "express-session"

const app = express();



app.use(session({
    secret: "users_secret",
    cookie:{maxAge: 3600000},//Sessão expira em 1 hr
    saveUninitialized: false,
    resave: false
}));

app.use((req, res, next) => {
    res.locals.usuario = req.session?.user || null;
    next();
});

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
import UsuariosController from "./controllers/UsuariosController.js";


app.use("/", BlogController);
app.use("/", MembrosController);
app.use("/", UsuariosController);

app.get("/", (req, res) => {5
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

