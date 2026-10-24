// Esse middleware verifica se o usuário é administrador

function Admin(req, res, next) {

    // Verificando se o usuário possui permissão de administrador
    if (Number(req.session?.user?.ADM) === 1) {

        // Se for administrador, prossegue
        next();

    } else {

        // Se não for administrador, bloqueia o acesso
        res.status(403).send(
            "Acesso negado! Apenas administradores podem realizar esta ação."
        );
    }
}

export default Admin;