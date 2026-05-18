const CuentaPrepaga = function( saldoInicial = 0) {
  this.saldo = saldoInicial;
};

CuentaPrepaga.prototype.cargarSaldo = function(monto) {
  if (monto <= 0) {
    throw new Error("El monto a cargar debe ser mayor a 0");
  }
  this.saldo += monto;
};

CuentaPrepaga.prototype.debitar = function(monto) {
  if (monto <= 0) {
    throw new Error("El monto a debitar debe ser mayor a 0");
  }
  if (this.saldo < monto) {
    throw new Error("Saldo insuficiente");
  }
  this.saldo -= monto;
};

CuentaPrepaga.prototype.tieneSaldoSuficiente = function(monto) {
  return this.saldo >= monto;
};

CuentaPrepaga.prototype.obtenerSaldo = function() {
  return this.saldo;
};

module.exports = CuentaPrepaga;