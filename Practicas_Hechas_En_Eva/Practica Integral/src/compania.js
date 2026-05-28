const Paquete = require("./paquete");

const Compania = function () {
  this.clientes = [];
  this.paquetesDisponibles = [
    new Paquete(1000, 2500, 400),
    new Paquete(100, 1000, 150),
  ];

  this.agregarCliente = function (cliente) {
    this.clientes.push(cliente);
  };

  this.esCliente = function (cliente) {
    return this.clientes.includes(cliente);
  };

  this.vender = function (paqueteNumero, comprador) {
    if (!this.esCliente(comprador)) {
      throw new Error("Solo se pueden vender paquetes a clientes.");
    }

    const paquete = this.paquetesDisponibles[paqueteNumero - 1];

    comprador.adquirir(Object.assign({}, paquete));
  };
};

module.exports = Compania;
