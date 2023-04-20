const Aluno = require("../databases/aluno");
const Turma = require("../databases/turma");
const { Op } = require("sequelize");

const { Router } = require("express");

const router = Router();

// Rotas

// Lista de alunos

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Retorna a lista de alunos
 *     description: Retorna a lista de alunos cadastrados no sistema
 *     responses:
 *       200:
 *         description: Lista de alunos
 */

router.get("/alunos", async (req, res) => {
    const listaAlunos = await Aluno.findAll(
        {
            where: {
            [Op.and]: [
                { idade: { [Op.lt]: 40 } },
                { sexo: {[Op.eq]: "F"} },
            ]
    }}
    );
    res.status(200).json(listaAlunos);
});

// Lista para achar um aluno em específico

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna uma lista de alunos específica, por ID
 *     description: Retorna a lista de alunos cadastrados no sistema por ID
 *     responses:
 *       200:
 *         description: Lista de alunos
 */

router.get("/alunos/:id", async (req, res) => {
    const alunoId = await Aluno.findOne({ where: { id: req.params.id } });

    if (alunoId) {
        res.json(alunoId);
    } else {
        res.status(404).json({ message: "Aluno não encontrado" });
    }
});

// Adicionar aluno

router.post("/alunos", async (req, res) => {
    const { nome, sexo, idade, turmaId } = req.body;

    // try {
    //     const novoAluno = await Aluno.create({ nome, sexo, idade }, { include: [Turma] });
    //     res.status(200).json(novoAluno);
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json({ message: "Um erro aconteceu" });
    // }

    try {
        const novoAluno = await Turma.findByPk(turmaId);
            if(novoAluno) {
                const aluno = await Aluno.create({ nome, sexo, idade, turmaId });
                res.status(201).json(aluno);
            }
            else {
                res.status(404).json({ message: "Aluno não encontrado." });
            }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
}
);

// Atualizar aluno
router.put("/alunos/:id", async (req, res) => {
    const { nome, sexo, idade } = req.body;

    const aluno = await Aluno.findByPk(req.params.id);

    try {
        if (aluno) {
            await Aluno.update(
                { nome, sexo, idade },
                { where: { id: req.params.id } }
            );
            res.status(200).json(aluno);
        } else {
            res.status(404).json({ message: "Aluno não encontrado" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});

// Deletar aluno

router.delete("/alunos/:id", async (req, res) => {
    const deletarAluno = await Aluno.findByPk(req.params.id);
    res.status(200).json({ message: "Aluno removido" });

    try {
        if (deletarAluno) {
            await deletarAluno.destroy();
        } else {
            res.status(404).json({ message: "Aluno não encontrado" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});

module.exports = router;
