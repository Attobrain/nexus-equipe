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

//ROTA DE AUTENTICAÇÃO
router.post("/autenticar", (req, res)=>{
    //Coletando os dados do usuário
    const email = req.body.email
    const password = req.body.password
    //Buscando o usuário no banco
    Usuario.findOne({where: {email: email}}).then((usuario) =>{
        //SE O USUÁRIO EXISTIR
        if(usuario != undefined){
            //VALIDANDO A SENHA(HASH)
            const senhaCorreta = bcrypt.compareSync(password, usuario.password);
            //Se A SENHA FOR VÁLIDA
            if(senhaCorreta){
                //AUTORIZA O LOGIN E CRIA A SESÃO PARA O USUÁRIO
                req.session.user = {
                  id: usuario.id,
                  email: usuario.email,
                  ADM: Number(usuario.ADM),
                };
              
                //res.send(`Usuário logado: <br> 
                  //ID: ${req.session.user["id"]} <br>
                 // E-mail: ${req.session.user["email"]}`);

                res.redirect("/");
                //SE A SENHA FOR INVÁLIDA      
            }else{
                res.render("loginInvalido");
            }
        //SE O USUÁRIO NÃO EXISTIR    
        }else{
            res.send(`Usuário não existe!<br>
                Verifique os dados e tente novamente!<br>
                <a href="/login">Voltar</a>`);
        }
    });
});

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
        ADM: 0
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