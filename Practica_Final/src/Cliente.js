const Paquete = require('./Paquete');

const Cliente = function(nombre, numeroLinea, cuentaPrepaga) {
  this.nombre = nombre;
  this.numeroLinea = numeroLinea;
  this.cuentaPrepaga = cuentaPrepaga;
  this.paqueteActual = new Paquete(0, 0, 0, 0); // Paquete vacío en vez de null
  this.historialConsumos = [];
  this.renovacionAutomatica = false;
};

Cliente.prototype.comprarPaquete = function(paquete) {
  // Verificar que no tenga un paquete activo
  if (this.paqueteActual.estaActivo()) {
    throw new Error("Ya tiene un paquete activo");
  }

  // Verificar saldo suficiente
  if (!this.cuentaPrepaga.tieneSaldoSuficiente(paquete.costo)) {
    throw new Error("Saldo insuficiente para comprar el paquete");
  }

  // Debitar de la cuenta
  this.cuentaPrepaga.debitar(paquete.costo);

  // Activar el paquete
  paquete.activar();
  this.paqueteActual = paquete;
};

Cliente.prototype.realizarConsumo = function(consumo) {
  // Verificar que tenga un paquete activo
  if (!this.paqueteActual.estaActivo()) {
    throw new Error("No tiene un paquete activo");
  }

  // Aplicar el consumo al paquete
  consumo.aplicarA(this.paqueteActual);

  // Registrar en el historial
  this.historialConsumos.push(consumo);
};

Cliente.prototype.habilitarRenovacionAutomatica = function() {
  this.renovacionAutomatica = true;
};

Cliente.prototype.deshabilitarRenovacionAutomatica = function() {
  this.renovacionAutomatica = false;
};

Cliente.prototype.obtenerDatosDisponibles = function() {
  return this.paqueteActual.datosDisponibles;
};

Cliente.prototype.obtenerMinutosDisponibles = function() {
  return this.paqueteActual.minutosDisponibles;
};

Cliente.prototype.obtenerHistorialConsumos = function() {
  return this.historialConsumos.slice();
};

module.exports = Cliente;