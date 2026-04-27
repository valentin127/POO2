// FrancoDeDeSemana.js
var Franco = require("./Franco");

function FrancoDeDeSemana(diaSemana) {
    this.diaSemana = diaSemana;
}
FrancoDeDeSemana.prototype = Object.create(Franco.prototype);
FrancoDeDeSemana.prototype.constructor = FrancoDeDeSemana;

FrancoDeDeSemana.prototype.esFranco = function(fecha) {
    return fecha.getDay() === this.diaSemana;
};

module.exports = FrancoDeDeSemana;