const { FrancoDiaParticular } = require('./FrancoDiaParticular');

function FrancoFactory(tipo, data) {
  switch (tipo) {
    case "DIA_PARTICULAR":
      return new FrancoDiaParticular(data.fechaExacta);

    default:
      throw new Error('Tipo de franco inválido: '+tipo+'.');
  }
}

module.exports = { FrancoFactory };
