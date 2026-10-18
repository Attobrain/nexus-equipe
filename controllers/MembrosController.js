
import express from "express";
import Membro from "../models/Membros.js";
import { posts } from "./BlogController.js";

const route = express.Router();

// Rota principal da landing page
route.get("/", function (req, res) {
    Membro.findAll()
        .then(membros => {
            res.render("index", {
                title: "Nexus | Equipe",
                membros: membros,
                posts: posts
            });
        })
        .catch(error => {
            console.log(
                `Ocorreu um erro ao listar os membros. ERRO: ${error}`
            );

            res.status(500).send("Erro ao carregar a página.");
        });
});

// Rota de listagem dos membros
route.get("/membros", function (req, res) {
    Membro.findAll()
        .then(membros => {
            res.render("membros", {
                membros: membros
            });
        })
        .catch(error => {
            console.log(
                `Ocorreu um erro ao listar os membros. ERRO: ${error}`
            );
        });
});

// ROTA DE CADASTRO DE MEMBRO
route.get("/membros/cadastrar", (req, res) => {

    // Abrindo a página de cadastro
    res.render("MembrosCadastrar");

});

// ROTA QUE CADASTRA O MEMBRO
route.post("/membros/cadastrar", (req, res) => {

    // Coletando os dados do formulário
    const nome = req.body.nome;
    const iniciais = req.body.iniciais;
    const cargo = req.body.cargo;
    const descricao = req.body.descricao;
    const imagem = req.body.imagem;
    const github = req.body.github;
    const linkedin = req.body.linkedin;
    const portfolio = req.body.portfolio;

    // Chamando o model para gravar os dados no banco
    Membro.create({
        nome: nome,
        iniciais: iniciais,
        cargo: cargo,
        descricao: descricao,
        imagem: imagem,
        github: github,
        linkedin: linkedin,
        portfolio: portfolio

    }).then(() => {

        // Redirecionando após o cadastro
        res.redirect("/");

    }).catch(error => {

        console.log(
            `Ocorreu um erro ao cadastrar o membro. ERRO: ${error}`
        );

    });

});

//ROTA DE EDIÇÃO DE membro
route.get("/membros/editar/:id", (req, res)=>{
    //Coletando o parâmetro do URL
    const id = req.params.id;
    //Buscando o clube no banco pelo ID
    Membro.findByPk(id).then(membro=>{
        res.render("MembrosEditar",{
            //enviando um objeto com os dados do membro para a página
            membro: membro,
        })
    }).catch(error=>(`Ocorreu um erro ao buscar o clube. ERRO${error}`));
});

// ROTA QUE ALTERA OS DADOS DO MEMBRO
route.post("/membros/alterar", (req, res) => {

    // Coletando os dados do formulário
    const id = req.body.id;
    const nome = req.body.nome;
    const iniciais = req.body.iniciais;
    const cargo = req.body.cargo;
    const descricao = req.body.descricao;
    const imagem = req.body.imagem;
    const github = req.body.github;
    const linkedin = req.body.linkedin;
    const portfolio = req.body.portfolio;

    // Chamando o model para alterar os dados no banco
    Membro.update(
        {
            nome: nome,
            iniciais: iniciais,
            cargo: cargo,
            descricao: descricao,
            imagem: imagem,
            github: github,
            linkedin: linkedin,
            portfolio: portfolio
        },
        {
            where: {
                id: id
            }
        }
    )
    .then(() => {
        res.redirect("/");
    })
    .catch(error => {
        console.log(
            `Ocorreu um erro ao alterar o membro. ERRO: ${error}`
        );
    });

});

// rota de excluir membro
route.get("/membros/excluir/:id", (req, res) => {
    const id = req.params.id;

    Membro.destroy({
        where: {
            id: id,
        },
    }).then(()=> {
        res.redirect("/");
    }).catch(error=>{
        console.log(`Ocorreu um erro ao excluir o membro. ERRO: ${error}`);
    });
});


export default route;
