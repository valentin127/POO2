const PaqueteVacio = require("./paqueteVacio");

const RenovacionManual = function () {
  this.renovar = function (cliente) {};
};
const RenovacionAutomatica = function (paqueteARenovar) {
  this.paqueteARenovar = paqueteARenovar;

  this.renovar = function (cliente) {
    cliente.adquirir(this.paqueteARenovar);
  };
};

const Cliente = function () {
  this.saldo = 0;
  this.paquete = new PaqueteVacio();
  this.consumos = [];
  this.renovacionAutomatica = new RenovacionManual();

  this.adquirir = function (paquete) {
    this.puedePagar(paquete.obtenerCosto());
    this.paquete = this.paquete.adquirir(paquete);
    this.paqueteAdquirido = Object.assign({}, paquete);
    this.saldo -= this.paquete.obtenerCosto();
  };

  this.cargarSaldo = function (montoACargar) {
    this.saldo += montoACargar;
  };

  this.megasDisponibles = function () {
    return this.paquete.obtenerMegasDisponibles();
  };

  this.minutosDisponibles = function () {
    return this.paquete.obtenerMinutosDisponibles();
  };

  this.saldoDisponible = function () {
    return this.saldo;
  };

  this.activarRenovacion = function () {
    this.renovacionAutomatica = new RenovacionAutomatica(this.paqueteAdquirido);
  };

  this.consumir = function (consumo) {
    this.paquete.consumir(consumo);
    this.consumos.push(consumo);
    if (this.paquete.agotado()) {
      this.paquete = new PaqueteVacio();
      this.renovacionAutomatica.renovar(this);
    }
  };

  this.puedePagar = function (monto) {
    if (monto > this.saldo) {
      throw new Error("No hay saldo suficiente para pagar el paquete.");
    }
  };

  this.historialDeConsumos = function(){
    return this.consumos
  }
};

module.exports = Cliente;
