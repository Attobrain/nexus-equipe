
import express from "express";

import { posts } from "./BlogController.js";

const route = express.Router();


// Rota principal da landing page
route.get("/", (req, res) => {

    const membros = [
    {
        id: 1,
        nome: "Laura Mathias",
        iniciais: "LM",
        cargo: "Desenvolvedor Full Stack",
        descricao: "Apaixonado por tecnologia, gosto de resolver problemas e transformar ideias em código.",
        imagem: "/images/membros/laura-mathias.jpg",
        github: "",
        linkedin: "",
        portfolio: ""
    },
    {
        id: 2,
        nome: "Luiz Henrique Cubas",
        iniciais: "LC",
        cargo: "Desenvolvedor Frontend",
        descricao: "Gosto de criar interfaces intuitivas e experiências que fazem a diferença.",
        imagem: "/images/membros/luiz-cubas.jpg",
        github: "",
        linkedin: "",
        portfolio: ""
    },
    {
        id: 3,
        nome: "Mario Takahashi",
        iniciais: "MT",
        cargo: "Desenvolvedor Backend",
        descricao: "Focado em APIs, bancos de dados e em construir sistemas robustos e escaláveis.",
        imagem: "/images/membros/mario-takahashi.jpg",
        github: "",
        linkedin: "",
        portfolio: ""
    },
    {
        id: 4,
        nome: "Millie Morelli",
        iniciais: "MM",
        cargo: "UX/UI Designer",
        descricao: "Acredito que um bom design torna a tecnologia mais acessível e humana.",
        imagem: "/images/membros/millie-morelli.jpg",
        github: "",
        linkedin: "",
        portfolio: ""
    },
     {
        id: 5,
        nome: "Victor Theodoro",
        iniciais: "VT",
        cargo: "UX/UI Designer",
        descricao: "Acredito que um bom design torna a tecnologia mais acessível e humana.",
        imagem: "/images/membros/victor-theodoro.jpg",
        github: "",
        linkedin: "",
        portfolio: ""
    }
];
    res.render("index", {
    title: "Nexus | Equipe",
    membros,
    posts
});
});

export default route;
