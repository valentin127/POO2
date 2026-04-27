// FrancoDiaAnual.js
var Franco = require("./Franco");

function FrancoDiaAnual(dia, mes) {
    this.dia = dia;
    this.mes = mes;
}
FrancoDiaAnual.prototype = Object.create(Franco.prototype);
FrancoDiaAnual.prototype.constructor = FrancoDiaAnual;

FrancoDiaAnual.prototype.esFranco = function(fecha) {
    return fecha.getDate()  === this.dia &&
           fecha.getMonth()+1 === this.mes;
};

module.exports = FrancoDiaAnual;