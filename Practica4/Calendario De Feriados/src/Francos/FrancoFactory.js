const { crearFrancoDiaAnual } = require('./FrancoDiaAnual');
const { crearFrancoDiaDeMesAnio } = require('./FrancoDiaDeMesAnio');
const { crearFrancoDiaDeSemanaMes } = require('./FrancoDiaDeSemanaMes');
const { FrancoDiaParticular } = require('./FrancoDiaParticular');

function FrancoFactory(tipo, data) {
  switch (tipo) {
    case "DIA_PARTICULAR":
      return new FrancoDiaParticular(data.fechaExacta);
    
    case "DIA_ANUAL":
      return crearFrancoDiaAnual(data.fechaExacta);
    
    case "DIA_SEMANAL":
      return crearFrancoDeSemana(data.fechaExacta);

    case "DIA_SEMANAL_ANIO":
      return crearFrancoDeSemanaAnio(data.fechaExacta);

    case "DIA_SEMANAL_MES":
      return crearFrancoDiaDeSemanaMes(data.fechaExacta);

    case "DIA_MENSUAL_ANIO":
      return crearFrancoDiaDeMesAnio(data.fechaExacta);
    
    case "MES_ANIO":
      return crearFrancoMesCompleto(data.fechaExacta)

    default:
      throw new Error('Tipo de franco inválido: '+tipo+'.');
  }
}

module.exports = { FrancoFactory };
