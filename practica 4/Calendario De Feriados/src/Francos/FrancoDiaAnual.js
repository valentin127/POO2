const { Franco } = require('./Franco');

function crearFrancoDiaAnual(fechaBase) {
  const franco = Object.create(Franco);

  franco.fechaBase = fechaBase;

  franco.esFranco = function(fechaConsulta) {
    return this.fechaExacta.getMonth() === fechaConsulta.getMonth() &&
           this.fechaExacta.getDate() === fechaConsulta.getDate();
  };

  return franco;
}

module.exports = {
  crearFrancoDiaAnual,
};