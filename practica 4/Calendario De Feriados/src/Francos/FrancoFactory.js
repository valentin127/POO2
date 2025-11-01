const { crearFrancoDiaParticular } = require('./FrancoDiaParticular');

function FrancoFactory(tipo, data) {
  switch (tipo) {
    case "DIA_PARTICULAR":
      return crearFrancoDiaParticular(data.fechaExacta);

    default:
      throw new Error('Tipo de franco inválido: ' + tipo + '.');
  }
}

module.exports = { FrancoFactory };
