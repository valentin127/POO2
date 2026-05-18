const PaqueteNoActivo = require('./PaqueteNoActivo');
const PaqueteActivo = require('./PaqueteActivo');

const Paquete = function(datosMB, minutos, costo, duracionDias) {
  this.datosMB = datosMB;
  this.minutos = minutos;
  this.costo = costo;
  this.duracionDias = duracionDias;
  this.datosDisponibles = datosMB;
  this.minutosDisponibles = minutos;
  this.estado = new PaqueteNoActivo();
};

Paquete.prototype.activar = function() {
  this.estado = this.estado.activar(this);
};

Paquete.prototype.descontarDatos = function(cantidadMB) {
  if (cantidadMB <= 0) {
    throw new Error("La cantidad de MB debe ser mayor a 0");
  }
  if (cantidadMB > this.datosDisponibles) {
    throw new Error("No hay suficientes datos disponibles");
  }
  this.datosDisponibles -= cantidadMB;
  this.estado = this.estado.verificarYActualizar(this);
};

Paquete.prototype.descontarMinutos = function(cantidadMinutos) {
  if (cantidadMinutos <= 0) {
    throw new Error("La cantidad de minutos debe ser mayor a 0");
  }
  if (cantidadMinutos > this.minutosDisponibles) {
    throw new Error("No hay suficientes minutos disponibles");
  }
  this.minutosDisponibles -= cantidadMinutos;
  this.estado = this.estado.verificarYActualizar(this);
};

Paquete.prototype.estaAgotado = function() {
  return this.estado.estaAgotado(this);
};

Paquete.prototype.estaActivo = function() {
  return this.estado.estaActivo();
};

module.exports = Paquete;