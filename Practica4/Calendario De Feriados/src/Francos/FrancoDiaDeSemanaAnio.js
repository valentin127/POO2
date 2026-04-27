const { Franco } = require('./Franco');

function crearFrancoDiaDeSemanaAnio(diaDeSemana, anio) {
  const franco = Object.create(Franco);

  franco.diaDeSemana = diaDeSemana;
  franco.anio = anio;

  franco.esFranco = function(fechaConsulta) {
    return fechaConsulta.getDay() === this.diaDeSemana &&
    fechaConsulta.getFullYear() === this.anio;
  };

  return franco;
}

module.exports = {
  crearFrancoDiaDeSemanaAnio,
};