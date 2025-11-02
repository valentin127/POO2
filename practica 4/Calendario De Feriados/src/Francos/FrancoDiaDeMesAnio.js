const { Franco } = require('./Franco');

function crearFrancoDiaDeSemanaMes(dia, anio) {
  const franco = Object.create(Franco);

  franco.dia = dia;
  franco.anio = anio;

  franco.esFranco = function(fechaConsulta) {
    return fechaConsulta.getFullYear() === this.anio &&
    fechaConsulta.getDate() === this.dia;
  };

  return franco;
}

module.exports = {
  crearFrancoDiaDeMesAnio,
};