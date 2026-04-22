const TarjetaSube = require("./sube.js");

const OysterCard = function() {
    TarjetaSube.call(this);
}

OysterCard.prototype = Object.create(TarjetaSube.prototype);
OysterCard.prototype.constructor = OysterCard;

OysterCard.prototype.acreditarSaldo = function(montoACargar) {
    this.saldo += montoACargar.aLibras(); // ← guarda en libras
}

OysterCard.prototype.pagarViaje = function(precioDeViaje) {
    this.validarViaje(precioDeViaje.aLibras());
    this.saldo -= precioDeViaje.aLibras(); // ← resta en libras
}

OysterCard.prototype.validarViaje = function(precioDeViaje) {
    if (this.saldo - precioDeViaje < 0) { // ← sin saldo mínimo
        throw new Error("Saldo insuficiente.");
    }
}

module.exports = OysterCard;

/*
La implementacion de prototipos del profe no es asi, se debe hacer de otra manera.
De alguna manera si se quiere sacar los ifs debemos lograr que el codigo sea identico.
Es que en realidad deberia ser mas herencia de forma que haya una tarjeta.
*/