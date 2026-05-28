const Moneda = require('./moneda.js');

const Libra = function (monto) {
    Moneda.call(this, monto);

    this.aPesos = function () {
        return this.monto * 1830;
    }
}


Libra.prototype = Object.create(Moneda.prototype);
Libra.prototype.constructor = Libra;

module.exports = Libra;