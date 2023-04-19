const Aluno = require("../databases/aluno");
const Professor = require("../databases/professor");
const Turma = require("../databases/turma");

const { Router } = require("express");

const router = Router();

// Rotas

// Lista de turmas

router.get("/turma", async (req, res) => {
    const listaTurma = await Turma.findAll();
    res.status(200).json(listaTurma);
});

// Lista para achar uma turma em específico

router.get("/turma/:id", async (req, res) => {
    const turmaId = await Turma.findOne({where: {id: req.params.id}});

    if (turmaId) {
        res.json(turmaId);
    } else {
        res.status(404).json({ message: "Turma não encontrada" });
    }
});

// Adicionar turma

router.post("/turma", async (req, res) => {
    const { serie } = req.body;

    try {
        const novaTurma = await Turma.create({serie}, {include: [Aluno]}, {include: [Professor]});
        res.status(200).json(novaTurma);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu" });
    }
});

// Atualizar turma
router.put("/turma/:id", async (req, res) => {
    const { serie } = req.body;

    const turma = await Turma.findByPk(req.params.id);

    try {
        if (turma) {
            await Turma.update({serie}, {where: {id: req.params.id}});
            res.status(200).json(turma);
        } else {
            res.status(404).json({ message: "Turma não encontrada"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu"});
    }
});

// Deletar turma

router.delete("/turma/:id", async (req, res) => {
    const deletarTurma = await Turma.findByPk(req.params.id);
    res.status(200).json({ message: "Turma removida"});

    try {
        if (deletarTurma) {
            await deletarTurma.destroy();
        } else {
            res.status(404).json({ message: "Turma não encontrada"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu"});
    }
});

module.exports = router;