const Professor = require("../databases/professor");
const { Op } = require("sequelize");

const { Router } = require("express");
const Turma = require("../databases/turma");

const router = Router();

// Rotas

// Listar todos os professores

router.get("/professor", async (req, res) => {
    const listaProfessor = await Professor.findAll( {
        where: {
        [Op.and]: [
            { idade: { [Op.gt]: 21 } }
        ]
}});
    res.status(200).json(listaProfessor);
});

// Listar professor por ID

router.get("/professor/:id", async (req, res) => {
    const professorId = await Professor.findOne({
        where: { id: req.params.id },
    });

    if (professorId) {
        res.json(professorId);
    } else {
        res.status(404).json({ message: "Professor não encontrado" });
    }
});

// Adicionar professor

router.post("/professor", async (req, res) => {
    const { nome, materia, idade, turmaId } = req.body;

    try {
        const novoProfessor = await Turma.findByPk(turmaId)
        if(novoProfessor) {
            const professor = await Professor.create({ nome, materia, idade, turmaId });
            res.status(200).json(professor);
        } else {
            res.status(404).json({ message: "Professor não encontrado" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});

// Atualizar dados do professor

router.put("/professor/:id", async (req, res) => {
    const { nome, materia, idade } = req.body;

    const professor = await Professor.findByPk(req.params.id);

    try {
        if (professor) {
            await Professor.update(
                { nome, materia, idade },
                { where: { id: req.params.id } }
            );
            res.status(200).json(professor);
        } else {
            res.status(404).json({ message: "Professor não encontrado" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});

// Deletar professor do banco de dados

router.delete("/professor/:id", async (req, res) => {
    const deletarProfessor = await Professor.findByPk(req.params.id);
    res.status(200).json({ message: "Professor removido" });

    try {
        if (deletarProfessor) {
            await deletarProfessor.destroy();
        } else {
            res.status(404).json({ message: "Professor não encontrado" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});

module.exports = router;
