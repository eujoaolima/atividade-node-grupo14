const { DataTypes } = require("sequelize");
const { connection } = require("./database");
// const Turma = require("./turma");

const Professor = connection.define("professor", {
    nome: {
        type: DataTypes.STRING(),
        allowNull: false
    },

    materia: {
        type: DataTypes.STRING(),
        allowNull: false
    },
});

module.exports = Professor;

