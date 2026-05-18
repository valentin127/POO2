const PaqueteActivo = require('./PaqueteActivo');

const PaqueteNoActivo = function() {};

PaqueteNoActivo.prototype.estaActivo = function() {
  return false;
};

PaqueteNoActivo.prototype.activar = function(paquete) {
  return new PaqueteActivo();
};

PaqueteNoActivo.prototype.desactivar = function(paquete) {
  return this;
};

PaqueteNoActivo.prototype.estaAgotado = function(paquete) {
  return true;
};

PaqueteNoActivo.prototype.verificarYActualizar = function(paquete) {
  return this;
};

module.exports = PaqueteNoActivo;