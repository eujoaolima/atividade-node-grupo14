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

    idade: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        validate: {
            isInt: true,
            min: 21,
            max: 65
        }
    },
});

module.exports = Professor;

