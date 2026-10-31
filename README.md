# Nexus — Como executar o projeto

## Pré-requisitos

- [Node.js](https://nodejs.org/) e npm instalados.
- MySQL Server em execução.

## 1. Instalar as dependências

No terminal, entre na pasta do projeto e execute:

```bash
npm install
```

## 2. Configurar o banco de dados

O banco utilizado pelo projeto se chama **`nexus_team`**. Confira o arquivo `config/sequelize-config.js` e verifique se o usuário, a senha e o endereço do MySQL correspondem à sua instalação.

### Primeira execução: criar o banco

No arquivo `config/sequelize-config.js`, deixe temporariamente comentada a propriedade `database`. Por exemplo:

```javascript
const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    // database: 'nexus_team',
    timezone: '-03:00'
});
```

Salve o arquivo e execute o projeto pela primeira vez, conforme a seção **Executar o projeto** abaixo, para que a criação automática do banco seja realizada. Depois que o banco `nexus_team` existir, pare o servidor e volte ao arquivo `config/sequelize-config.js`. Descomente a propriedade `database` e confirme que o nome está exatamente assim:

```javascript
database: 'nexus_team',
```

Salve e execute o projeto novamente. A partir daí, a aplicação poderá se conectar diretamente ao banco `nexus_team`.

> Atenção: o nome correto é `nexus_team` (sem **s** no final de `team`). Se o banco ou a tabela `membros` não forem criados automaticamente, abra o MySQL Workbench ou outro cliente MySQL e execute os comandos manuais abaixo.

### Criar o banco e a tabela manualmente

```sql
CREATE DATABASE IF NOT EXISTS nexus_team;
USE nexus_team;

CREATE TABLE IF NOT EXISTS membros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    iniciais VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    descricao TEXT NULL,
    imagem VARCHAR(255) NULL,
    github VARCHAR(255) NULL,
    linkedin VARCHAR(255) NULL,
    portfolio VARCHAR(255) NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);
```

### Inserir manualmente os cinco integrantes

Se a tabela estiver vazia e os integrantes não forem inseridos automaticamente, execute este comando no mesmo banco `nexus_team`:

```sql
USE nexus_team;

INSERT INTO membros (
    nome, iniciais, cargo, descricao, imagem,
    github, linkedin, portfolio, createdAt, updatedAt
) VALUES
(
    'Laura Mathias',
    'LM',
    'Desenvolvedora Full Stack',
    'Apaixonada por tecnologia, gosta de resolver problemas e transformar ideias em código.',
    '/images/membros/laura-mathias.jpg',
    '', '', '', NOW(), NOW()
),
(
    'Luiz Henrique Cubas',
    'LC',
    'Desenvolvedor Frontend',
    'Gosta de criar interfaces intuitivas e experiências que fazem a diferença.',
    '/images/membros/luiz-cubas.jpg',
    '', '', '', NOW(), NOW()
),
(
    'Mario Takahashi',
    'MT',
    'Desenvolvedor Backend',
    'Focado em APIs, bancos de dados e em construir sistemas robustos e escaláveis.',
    '/images/membros/mario-takahashi.jpg',
    '', '', '', NOW(), NOW()
),
(
    'Millie Morelli',
    'MM',
    'UX/UI Designer',
    'Acredita que um bom design torna a tecnologia mais acessível e humana.',
    '/images/membros/millie-morelli.jpg',
    '', '', '', NOW(), NOW()
),
(
    'Victor Theodoro',
    'VT',
    'UX/UI Designer',
    'Acredita que um bom design torna a tecnologia mais acessível e humana.',
    '/images/membros/victor-theodoro.jpg',
    '', '', '', NOW(), NOW()
);
```

> Execute o `INSERT` apenas se os integrantes ainda não estiverem cadastrados, para evitar duplicá-los. Os caminhos das imagens devem corresponder aos arquivos existentes na pasta pública do projeto.

## 3. Executar o projeto

Na raiz do projeto, execute:

```bash
node index.js
```

Quando o servidor iniciar, abra no navegador:

[http://localhost:8080](http://localhost:8080)

## 4. Conferir os dados

Para verificar se os cinco integrantes estão cadastrados, execute no MySQL:

```sql
USE nexus_team;
SELECT * FROM membros;
```

### Conferir os usuários administradores

Para listar as contas de usuário que possuem permissão administrativa (`ADM = 1`), execute:

```sql
USE nexus_team;

-- Conferindo os usuários administradores
SELECT id, email, ADM
FROM usuarios
WHERE ADM = 1;
```

Se nenhuma conta aparecer, confira se os usuários foram cadastrados na tabela `usuarios` e se a coluna `ADM` está definida como `1` para as contas que devem ser administradoras. Os registros da tabela `membros` são diferentes das contas de login da tabela `usuarios`.

## Problemas comuns

- **Erro de conexão:** confira se o MySQL está em execução e se as credenciais em `config/sequelize-config.js` estão corretas.
- **Banco não encontrado:** crie o banco `nexus_team` com o comando SQL acima e confirme que a configuração do Sequelize usa exatamente esse nome.
- **Tabela ou integrantes ausentes:** crie a tabela e execute o `INSERT` manualmente, conforme as instruções acima.
- **Nenhum administrador listado:** verifique a tabela `usuarios` e confirme que a coluna `ADM` existe e que as contas administrativas têm valor `1`.

---

Projeto da equipe **Nexus**.
