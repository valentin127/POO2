// FrancoDiaParticular.js
var Franco = require("./Franco");

function FrancoDiaParticular(dia, mes, anio) {
    this.dia  = dia;
    this.mes  = mes;
    this.anio = anio;
}
FrancoDiaParticular.prototype = Object.create(Franco.prototype);
FrancoDiaParticular.prototype.constructor = FrancoDiaParticular;

FrancoDiaParticular.prototype.esFranco = function(fecha) {
    return fecha.getDate()     === this.dia  &&
           (fecha.getMonth()+1)    === this.mes  &&
           fecha.getFullYear() === this.anio;
};

module.exports = FrancoDiaParticular;