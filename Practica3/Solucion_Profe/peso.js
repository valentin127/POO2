const Moneda = require('./moneda.js');

const Peso = function (monto) {
    Moneda.call(this, monto);

    this.monto=monto;

    this.aPesos = function (){
        return this.monto;
    }
}


Peso.prototype = Object.create(Moneda.prototype);
Peso.prototype.constructor = Peso;

module.exports = Peso;