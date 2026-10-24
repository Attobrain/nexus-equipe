// Esse middleware verifica se o usuário está autenticado

function Auth(req, res, next) {

    // Verificando se a sessão do usuário existe
    if (req.session?.user != undefined) {

        // Se estiver autenticado, prossegue
        next();

    } else {

        // Se não estiver autenticado, chama a página de login
        res.status(401).render("login", {
            loggedOut: true,
        });
    }
}

export default Auth;