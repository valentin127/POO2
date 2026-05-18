// Constructor base Consumo
const Consumo = function(fechaInicio, fechaFin) {
  this.fechaInicio = fechaInicio;
  this.fechaFin = fechaFin;
};

Consumo.prototype.aplicarA = function(paquete) {
  throw new Error("Método abstracto: debe ser implementado por las subclases");
};

// ConsumoInternet hereda de Consumo
const ConsumoInternet = function(cantidadMB, fechaInicio, fechaFin) {
  Consumo.call(this, fechaInicio, fechaFin);
  this.cantidadMB = cantidadMB;
};

ConsumoInternet.prototype = Object.create(Consumo.prototype);
ConsumoInternet.prototype.constructor = ConsumoInternet;

ConsumoInternet.prototype.aplicarA = function(paquete) {
  paquete.descontarDatos(this.cantidadMB);
};

// ConsumoLlamada hereda de Consumo
const ConsumoLlamada = function(cantidadMinutos, fechaInicio, fechaFin) {
  Consumo.call(this, fechaInicio, fechaFin);
  this.cantidadMinutos = cantidadMinutos;
};

ConsumoLlamada.prototype = Object.create(Consumo.prototype);
ConsumoLlamada.prototype.constructor = ConsumoLlamada;

ConsumoLlamada.prototype.aplicarA = function(paquete) {
  paquete.descontarMinutos(this.cantidadMinutos);
};

module.exports = { Consumo, ConsumoInternet, ConsumoLlamada };