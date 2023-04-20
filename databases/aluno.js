const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Aluno = connection.define("aluno", {
    nome: {
        type: DataTypes.STRING(),
        allowNull: false
    },

    sexo: {
        type: DataTypes.STRING(1),
        allowNull: false,
        validate: {
            isIn: [["F", "M"]]
        }
    },

    idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 10,
            max: 17
        }
    }
});

module.exports = Aluno;