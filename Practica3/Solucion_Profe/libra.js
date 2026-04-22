const Moneda = require('./moneda.js');

const Libra = function(monto) {
    Moneda.call(this, monto);

    this.aPesos = function() {
        return this.monto * 1830;
    }
}

Libra.prototype = Object.create(Moneda.prototype); // ← primero esto
Libra.prototype.constructor = Libra;

Libra.prototype.aLibras = function() {             // ← después esto
    return this.monto; // ← ya es libras, no necesita convertir
}

module.exports = Libra;