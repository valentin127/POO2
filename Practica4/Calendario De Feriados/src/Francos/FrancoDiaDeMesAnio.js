// FrancoDiaDeMesAnio.js
var Franco = require("./Franco");

function FrancoDiaDeMesAnio(dia, anio) {
    this.dia  = dia;
    this.anio = anio;
}
FrancoDiaDeMesAnio.prototype = Object.create(Franco.prototype);
FrancoDiaDeMesAnio.prototype.constructor = FrancoDiaDeMesAnio;

FrancoDiaDeMesAnio.prototype.esFranco = function(fecha) {
    return fecha.getDate()     === this.dia &&
           fecha.getFullYear() === this.anio;
};

module.exports = FrancoDiaDeMesAnio;