const Moneda = require('./moneda.js');

const Dolar = function (monto) {
    Moneda.call(this, monto);

    this.monto=monto;

    this.aPesos = function (){
        return this.monto * 1400;
    }
}


Dolar.prototype = Object.create(Moneda.prototype);
Dolar.prototype.constructor = Dolar;

module.exports = Dolar;