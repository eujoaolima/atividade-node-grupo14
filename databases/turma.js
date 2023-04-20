const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Professor = require("./professor");
const Aluno = require("./aluno");

const Turma = connection.define("turma", {
    serie: {
        type: DataTypes.STRING(),
        allowNull: false,
        validate: {
            isIn: [["6", "7", "8", "9", "1", "2", "3"]],
        },
    }
});

// 1:1

Turma.hasOne(Professor, {onDelete: "CASCADE"});
Professor.belongsTo(Turma);

// 1:N

Turma.hasMany(Aluno, {onDelete: "CASCADE"});
Aluno.belongsTo(Turma);


module.exports = Turma;