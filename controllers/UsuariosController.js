import express from "express";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Rota de login
router.get("/login", (req, res) => {
    res.render("login");
});

// Rota de logout
router.get("/logout", (req, res)=>{
  //limpa a sessão
  req.session.user = undefined;
  //Redireciona para a home
  res.redirect("/");
})

// Rota de cadastro
router.get("/cadastro", (req, res) => {
  res.render("cadastro",{
    loggedOut: true,
  });
});

router.post("/cadastro/novo", (req, res) => {
  //coletar os dados do formulário
  const email = req.body.email;
  const password = req.body.password;

  //Verificando se o usuário já existe
  Usuario.findOne({ where: { email: email } }).then((usuario) => {
    //Usuário não encontrado
    if (usuario == undefined) {
      //Cadastra o usuário
      //GERANDO O HASH DE SENHA
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      //Enviando para o banco de dados
      Usuario.create({
        email: email,
        password: hash,
      })
        .then(() => res.redirect("/login"))
        .catch((error) => {
          console.log(`Erro ao criar a conta. ERRO: ${error}`);
        });
        //Usuário já cadastrado
    }else{
        res.send(`Usuário já cadastrado!<br>
            Verifique os dados e tente novamente.<br>
            <a href="/login">Voltar</a>`)
    }
  });
})

export default router;