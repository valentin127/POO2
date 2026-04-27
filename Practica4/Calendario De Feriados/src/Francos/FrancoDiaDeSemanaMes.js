// FrancoDiaDeSemanaMes.js
var Franco = require("./Franco");

function FrancoDiaDeSemanaMes(diaSemana, mes) {
    this.diaSemana = diaSemana;
    this.mes       = mes;
}
FrancoDiaDeSemanaMes.prototype = Object.create(Franco.prototype);
FrancoDiaDeSemanaMes.prototype.constructor = FrancoDiaDeSemanaMes;

FrancoDiaDeSemanaMes.prototype.esFranco = function(fecha) {
    return fecha.getDay()   === this.diaSemana &&
           fecha.getMonth() === this.mes;
};

module.exports = FrancoDiaDeSemanaMes;