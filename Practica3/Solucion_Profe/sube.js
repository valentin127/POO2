const TarjetaSube = function() {
    this.saldo = 0;
    this.numeroDeIdentificador = TarjetaSube.contadorId;
    TarjetaSube.contadorId++;
}

TarjetaSube.SALDO_MINIMO = -600;
TarjetaSube.contadorId = 1;

TarjetaSube.prototype.obtenerSaldo = function() {
    return this.saldo;
}

TarjetaSube.prototype.acreditarSaldo = function(montoACargar) {
    this.saldo += montoACargar.aPesos();
}

TarjetaSube.prototype.pagarViaje = function(precioDeViaje) {
    this.validarViaje(precioDeViaje.aPesos());
    this.saldo -= precioDeViaje.aPesos();
}

TarjetaSube.prototype.validarViaje = function(precioDeViaje) {
    if (this.saldo - precioDeViaje < TarjetaSube.SALDO_MINIMO) {
        throw new Error("Saldo insuficiente.");
    }
}

TarjetaSube.prototype.tenesId = function(id) {
    return id === this.numeroDeIdentificador;
}

module.exports = TarjetaSube;