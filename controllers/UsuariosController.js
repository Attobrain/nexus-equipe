import express from "express";
const router = express.Router();

import Usuario from "../models/Usuario.js";

import bcrypt from "bcrypt";
import route from "./BlogController.js";

// rota de login
router.get("/login", (req, res) => {
    res.render("login");
});

export default route;