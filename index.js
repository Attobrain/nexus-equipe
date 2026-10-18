import express from "express";

import MembrosController from "./controllers/MembrosController.js";

const app = express();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use("/", MembrosController);

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