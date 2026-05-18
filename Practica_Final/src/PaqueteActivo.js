const PaqueteActivo = function() {};

PaqueteActivo.prototype.estaActivo = function() {
  return true;
};

PaqueteActivo.prototype.activar = function(paquete) {
  return this;
};

PaqueteActivo.prototype.desactivar = function(paquete) {
  const PaqueteNoActivo = require('./PaqueteNoActivo');
  return new PaqueteNoActivo();
};

PaqueteActivo.prototype.estaAgotado = function(paquete) {
  return paquete.datosDisponibles === 0 && paquete.minutosDisponibles === 0;
};

PaqueteActivo.prototype.verificarYActualizar = function(paquete) {
  return paquete.estaAgotado() ? this.desactivar(paquete) : this;
};

module.exports = PaqueteActivo;