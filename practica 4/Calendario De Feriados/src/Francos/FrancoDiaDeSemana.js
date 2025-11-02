const { Franco } = require('./Franco');

function crearFrancoDiaDeSemana(diaDeSemana) {
  const franco = Object.create(Franco);

  franco.diaDeSemana = diaDeSemana;

  franco.esFranco = function(fechaConsulta) {
    return fechaConsulta.getDay() === this.diaDeSemana;
  };

  return franco;
}

module.exports = {
  crearFrancoDiaDeSemana,
};