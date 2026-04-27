// Franco.js
function Franco(dia, mes, anio) {
    this.dia  = dia;
    this.mes  = mes;
    this.anio = anio;
}

Franco.prototype.esFranco = function(fecha) {
    return fecha.getDate()     === this.dia  &&
           fecha.getMonth()    === this.mes  &&
           fecha.getFullYear() === this.anio;
};

module.exports = Franco;