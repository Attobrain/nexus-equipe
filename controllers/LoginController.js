import express from "express";


const route = express.Router();

route.get("/login", (req, res) => {
    res.render('login');
})

export default route;