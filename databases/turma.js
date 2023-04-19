const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Professor = require("./professor");
const Aluno = require("./aluno");

const Turma = connection.define("turma", {
    serie: {
        type: DataTypes.STRING(),
        allowNull: false
    }
});

// 1:1

Turma.hasOne(Professor);
Professor.belongsTo(Turma);

// 1:N

Turma.hasMany(Aluno);
Aluno.belongsTo(Turma);


module.exports = Turma;