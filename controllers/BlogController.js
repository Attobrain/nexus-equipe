
import express from "express";


const route = express.Router();

export const posts = [
    {
        id: 1,
        titulo: "Primeira atualização da Nexus",
        autor: "Mario Takahashi",
        data: "18/10/2026",
        categoria: "Atualização",
        resumo: "Confira as novidades e o andamento do projeto Nexus.",
        conteudo: "Aqui ficará o conteúdo completo da publicação."
    },
    {
        id: 2,
        titulo: "Novidades no desenvolvimento",
        autor: "Laura Mathias",
        data: "18/10/2026",
        categoria: "Desenvolvimento",
        resumo: "Compartilhando os avanços recentes da equipe.",
        conteudo: "Aqui ficará o conteúdo completo desta publicação."
    }
];

// Rota do blog
route.get("/blog", (req, res) => {
    res.redirect("/#blog");
});

export default route;
