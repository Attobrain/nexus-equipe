import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Usuario = connection.define("usuarios", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
     ADM: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
});

Usuario.sync({force:false});

export default Usuario;