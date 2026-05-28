class Tarjeta {
    constructor(numeroDeIdentificador){
        this.saldo = 0;
        this.saldoMinimo = 0;
        this.numeroDeIdentificador = numeroDeIdentificador
    }


    obtenerSaldo(){
        return this.saldo;
    }

    acreditarSaldo(montoACargar){
        this.saldo += this.convertir(montoACargar);
    }

    pagarViaje(precioDeViaje){
        this.validarViaje(this.convertir(precioDeViaje));
        
        this.saldo -= this.convertir(precioDeViaje);   
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


module.exports = Tarjeta;