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

O banco utilizado pelo projeto se chama **`nexus_team`**. Confira o arquivo `config/sequelize-config.js` e verifique se o nome do banco, o usuário, a senha e o endereço do MySQL correspondem à sua instalação.

O projeto está preparado para sincronizar as tabelas usando o Sequelize. Se o banco ou a tabela `membros` não forem criados automaticamente, abra o MySQL Workbench ou outro cliente MySQL e execute os comandos abaixo.

### Criar o banco e a tabela manualmente

```sql
CREATE DATABASE IF NOT EXISTS nexus_team;
USE nexus_teams;

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

Se a tabela estiver vazia e os integrantes não forem inseridos automaticamente, execute este comando no mesmo banco `nexus_teams`:

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

Quando o servidor iniciar, abra no navegador o endereço local e a porta informados no terminal (por exemplo, `http://localhost:3000`, caso a aplicação use a porta 3000).

## 4. Conferir os dados

Para verificar se os cinco integrantes estão cadastrados, execute no MySQL:

```sql
USE nexus_team;
SELECT * FROM membros;
```

## Problemas comuns

- **Erro de conexão:** confira se o MySQL está em execução e se as credenciais em `config/sequelize-config.js` estão corretas.
- **Banco não encontrado:** crie o banco `nexus_team` com o comando SQL acima e confirme que a configuração do Sequelize usa exatamente esse nome.
- **Tabela ou integrantes ausentes:** crie a tabela e execute o `INSERT` manualmente, conforme as instruções acima.

---

Projeto da equipe **Nexus**.
