import connection from "../config/sequelize-config.js";
import Sequelize from "sequelize";

const Membro = connection.define("membros", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },

    iniciais: {
        type: Sequelize.STRING,
        allowNull: false
    },

    cargo: {
        type: Sequelize.STRING,
        allowNull: false
    },

    descricao: {
        type: Sequelize.TEXT,
        allowNull: true
    },

    imagem: {
        type: Sequelize.STRING,
        allowNull: true
    },

    github: {
        type: Sequelize.STRING,
        allowNull: true
    },

    linkedin: {
        type: Sequelize.STRING,
        allowNull: true
    },

    portfolio: {
        type: Sequelize.STRING,
        allowNull: true
    }
});
Membro.sync({force: false});

export default Membro;