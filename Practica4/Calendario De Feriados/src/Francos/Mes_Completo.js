const { Franco } = require('./Franco');
function crearFrancoMesCompleto(anio, mes) {
  const franco = Object.create(Franco);

  franco.anio = anio;   
  franco.mes = mes;     
  
  franco.esFranco = function(fechaConsulta) {
    return (
      fechaConsulta.getFullYear() === this.anio &&
      fechaConsulta.getMonth() === this.mes
    );
  };

  return franco;
}

module.exports = {
  crearFrancoMesCompleto,
};
