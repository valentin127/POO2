// FrancoDiaDeSemanaAnio.js
var Franco = require("./Franco");

function FrancoDiaDeSemanaAnio(diaSemana, anio) {
    this.diaSemana = diaSemana;
    this.anio      = anio;
}
FrancoDiaDeSemanaAnio.prototype = Object.create(Franco.prototype);
FrancoDiaDeSemanaAnio.prototype.constructor = FrancoDiaDeSemanaAnio;

FrancoDiaDeSemanaAnio.prototype.esFranco = function(fecha) {
    return fecha.getDay()      === this.diaSemana &&
           fecha.getFullYear() === this.anio;
};

module.exports = FrancoDiaDeSemanaAnio;