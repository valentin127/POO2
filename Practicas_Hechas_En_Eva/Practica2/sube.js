class TarjetaSube {
    static SALDO_MINIMO = -600; 
    constructor(numeroDeIdentificador){
        this.saldo = 0;
        this.numeroDeIdentificador = numeroDeIdentificador
    }

    obtenerSaldo(){
        return this.saldo;
    }

    acreditarSaldo(montoACargar){
        this.saldo += montoACargar.aPesos();
    }

    pagarViaje(precioDeViaje){
        this.validarViaje(precioDeViaje.aPesos());
        
        this.saldo -= precioDeViaje.aPesos();   
    }

    validarViaje(precioDeViaje) {
        if (this.saldo - precioDeViaje < TarjetaSube.SALDO_MINIMO) {
            throw new Error("Saldo insuficiente.");
        }
    }

    tenesId(id){
        return id === this.numeroDeIdentificador
    }
}

module.exports = TarjetaSube