// Mes_Completo.js
var Franco = require("./Franco");

function MesCompleto(mes, anio) {
    this.mes  = mes;
    this.anio = anio;
}
MesCompleto.prototype = Object.create(Franco.prototype);
MesCompleto.prototype.constructor = MesCompleto;

MesCompleto.prototype.esFranco = function(fecha) {
    return fecha.getMonth()    === this.mes &&
           fecha.getFullYear() === this.anio;
};

module.exports = MesCompleto;