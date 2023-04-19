// Configurar o servidor HTTP
require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const { connection, authenticate } = require("./databases/database");

authenticate(connection);

// Relacionamentos:

// Turma-Aluno (1:N)
// Professor-Turma (1:1)

// Rotas

const rotaTurma = require("./routes/turma");
const rotaProfessor = require("./routes/professor");
const rotaAluno = require("./routes/aluno");

app.use(rotaTurma);
app.use(rotaProfessor);
app.use(rotaAluno);


// Adicionar aluno à turma (Create)

// Adicionar professor à turma (Create)

// Atualizar aluno (Update)

// Atualizar professor (Update)

// Remover aluno (Delete)

// Remover professor (Delete)

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Escuta de eventos (listen)
app.listen(3000, () => {
    connection.sync({ force: true })
    console.log("Servidor rodando em http://localhost:3000");
});