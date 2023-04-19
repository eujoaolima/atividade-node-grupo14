const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Aluno = connection.define("aluno", {
    nome: {
        type: DataTypes.STRING(),
        allowNull: false
    },

    sexo: {
        type: DataTypes.STRING(1),
        allowNull: false
    },

    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Aluno;