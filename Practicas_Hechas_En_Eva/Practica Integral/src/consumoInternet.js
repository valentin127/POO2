const ConsumoInternet = function (montoAConsumir) {
  this.montoAConsumir = montoAConsumir;

  this.restarDe = function (paquete) {
    paquete.reducirCreditoInternet(this.montoAConsumir);
  };
};

module.exports = ConsumoInternet;
