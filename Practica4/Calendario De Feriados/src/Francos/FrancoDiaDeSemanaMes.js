const { Franco } = require('./Franco');

function crearFrancoDiaDeSemanaMes(diaDeSemana, mes) {
  const franco = Object.create(Franco);

  franco.diaDeSemana = diaDeSemana;
  franco.mes = mes;

  franco.esFranco = function(fechaConsulta) {
    return fechaConsulta.getMonth() === this.diaDeSemana &&
    fechaConsulta.getDay() === this.diaDeSemana;
  };

  return franco;
}

module.exports = {
  crearFrancoDiaDeSemanaMes,
};