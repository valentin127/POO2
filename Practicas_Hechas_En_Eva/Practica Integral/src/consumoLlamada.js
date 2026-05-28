const ConsumoLlamada = function (montoAConsumir) {
  this.montoAConsumir = montoAConsumir;

  this.restarDe = function (paquete) {
    paquete.reducirCreditoLlamadas(this.montoAConsumir);
  };
};

module.exports = ConsumoLlamada;
