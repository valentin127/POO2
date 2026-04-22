const Moneda = function (monto, divisa) {
    this.monto = monto;
    this.divisa = divisa;

    this.validarViaje = function(montoAPagar){
        if(this.divisa==="Libras"){
            return this.monto >= montoAPagar.aLibras();
        }else{
            return this.monto + 600 >= (montoAPagar.aPesos());
        }
         
    }

    this.equals = function (otro) {
        return this.monto === otro.monto && this.divisa === otro.divisa;
    };

    

    this.toString = function() {
        return `Moneda(${this.monto}, ${this.divisa})`;
    };
}

Moneda.prototype.aLibras = function() {
        return this.aPesos() / 1830; // ← convierte via pesos
    }

module.exports = Moneda;