const PaqueteVacio = require("./paqueteVacio");

const Paquete = function (minutosDisponibles, megasDisponibles, costo) {
  this.minutosDisponibles = minutosDisponibles;
  this.megasDisponibles = megasDisponibles;
  this.costo = costo;

  this.consumir = function (consumo) {
    consumo.restarDe(this);
  };

  this.reducirCreditoInternet = function (montoAConsumir) {
    this.validarSaldoInternet(montoAConsumir);

    this.megasDisponibles -= montoAConsumir;
  };

  this.reducirCreditoLlamadas = function (montoAConsumir) {
    this.validarSaldollamadas(montoAConsumir);

    this.minutosDisponibles -= montoAConsumir;
  };

  this.validarSaldoInternet = function (montoAConsumir) {
    if (montoAConsumir > this.megasDisponibles) {
      throw new Error("No hay saldo suficiente para realizar el consumo.");
    }
  };

  this.validarSaldollamadas = function (montoAConsumir) {
    if (montoAConsumir > this.minutosDisponibles) {
      throw new Error("No hay saldo suficiente para realizar el consumo.");
    }
  };

  this.adquirir = function (nuevoPaquete) {
    throw new Error("El cliente tiene un paquete activo");
  };

  this.obtenerMinutosDisponibles = function () {
    return this.minutosDisponibles;
  };

  this.obtenerMegasDisponibles = function () {
    return this.megasDisponibles;
  };

  this.obtenerCosto = function () {
    return this.costo;
  };

  this.agotado = function () {
    return this.minutosDisponibles === 0 && this.megasDisponibles === 0;
  };
};

module.exports = Paquete;
