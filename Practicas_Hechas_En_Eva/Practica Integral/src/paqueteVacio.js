const PaqueteVacio = function () {
  this.obtenerMinutosDisponibles = function () {
    return 0;
  };
  this.obtenerMegasDisponibles = function () {
    return 0;
  };

  this.consumir = function (consumo) {
    consumo.restarDe(this);
  };

  this.reducirCreditoInternet = function (montoAConsumir) {
    throw new Error("No hay saldo suficiente para realizar el consumo.");
  };

  this.reducirCreditoLlamadas = function (montoAConsumir) {
    throw new Error("No hay saldo suficiente para realizar el consumo.");
  };

  this.adquirir = function (nuevoPaquete) {
    return nuevoPaquete;
  };
};

module.exports = PaqueteVacio;
