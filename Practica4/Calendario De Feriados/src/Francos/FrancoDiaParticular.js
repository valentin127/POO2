const { Franco } = require('./Franco');

function crearFrancoDiaParticular(fechaExacta) {
  const franco = Object.create(Franco);

  franco.fechaExacta = fechaExacta;

  franco.esFranco = function(fechaConsulta) {
    return this.fechaExacta.getFullYear() === fechaConsulta.getFullYear() &&
           this.fechaExacta.getMonth() === fechaConsulta.getMonth() &&
           this.fechaExacta.getDate() === fechaConsulta.getDate();
  };

  return franco;
}

module.exports = {
  crearFrancoDiaParticular,
};
