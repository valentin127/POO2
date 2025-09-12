// ================== OBJETO MONEDA ==================
function Moneda(aARS, desdeARS) {
  // aARS:   función que pasa de esta moneda a pesos
  // desdeARS: función que pasa de pesos a esta moneda
  this.aARS = aARS;
  this.desdeARS = desdeARS;
}
Moneda.prototype.convertirA = function (monto, otraMoneda) {
  // Convierte a pesos y luego a la otra moneda
  return otraMoneda.desdeARS(this.aARS(monto));
};

// Instancias concretas
const Peso  = new Moneda(
  function (m) { return m; },        // ARS -> ARS
  function (m) { return m; }         // ARS -> ARS
);
const Libra = new Moneda(
  function (m) { return m * 1250; }, // GBP -> ARS
  function (m) { return m / 1250; }  // ARS -> GBP
);


// ================== CONVERSOR ==================
function Conversor() {}
Conversor.prototype.convertir = function (monto, desdeMoneda, haciaMoneda) {
  // Sin if ni for: delega en los objetos Moneda
  return desdeMoneda.convertirA(monto, haciaMoneda);
};


// ================== TARJETA BASE ==================
function Tarjeta(id, saldoInicial, monedaBase, conversor) {
  this.id = id;
  this.saldo = saldoInicial;
  this.monedaBase = monedaBase;   // objeto Moneda
  this._conv = conversor;
}

Tarjeta.prototype.consultarSaldo = function () {
  return this.saldo; // solo número
};

Tarjeta.prototype.convertir = function (monto, desdeMoneda, haciaMoneda) {
  return this._conv.convertir(monto, desdeMoneda, haciaMoneda);
};

Tarjeta.prototype.pagarViaje = function () {
  throw new Error("Método abstracto, implementar en subclase");
};


// ================== TARJETA SUBE ==================
function TarjetaSube(id, saldoInicial, conversor) {
  Tarjeta.call(this, id, saldoInicial, Peso, conversor);
}
TarjetaSube.prototype = Object.create(Tarjeta.prototype);
TarjetaSube.prototype.constructor = TarjetaSube;

TarjetaSube.SALDO_MINIMO = -600;

TarjetaSube.prototype.cargarSaldo = function (monto, monedaObj) {
  if (monto <= 0) throw new Error("Monto a cargar debe ser mayor a 0.");
  this.saldo += this.convertir(monto, monedaObj, Peso);
  console.log("SUBE " + this.id + ": cargados " + monto + ". Saldo: $" + this.saldo);
};

TarjetaSube.prototype.pagarViaje = function (costo, monedaObj) {
  const costoEnPesos = this.convertir(costo, monedaObj, Peso);
  if (this.saldo - costoEnPesos < TarjetaSube.SALDO_MINIMO) {
    throw new Error("Saldo insuficiente en SUBE.");
  }
  this.saldo -= costoEnPesos;
  console.log("SUBE " + this.id + ": pagado " + costo + ". Saldo: $" + this.saldo);
};


// ================== TARJETA OYSTER ==================
function TarjetaOyster(id, saldoInicial, conversor) {
  Tarjeta.call(this, id, saldoInicial, Libra, conversor);
}
TarjetaOyster.prototype = Object.create(Tarjeta.prototype);
TarjetaOyster.prototype.constructor = TarjetaOyster;

TarjetaOyster.prototype.cargarSaldo = function (monto, monedaObj) {
  if (monto <= 0) throw new Error("Monto a cargar debe ser mayor a 0.");
  this.saldo += this.convertir(monto, monedaObj, Libra);
  console.log("OYSTER " + this.id + ": cargados " + monto + ". Saldo: £" + this.saldo);
};

TarjetaOyster.prototype.pagarViaje = function (costo, monedaObj) {
  const costoEnLibras = this.convertir(costo, monedaObj, Libra);
  if (this.saldo < costoEnLibras) {
    throw new Error("Saldo insuficiente en OYSTER.");
  }
  this.saldo -= costoEnLibras;
  console.log("OYSTER " + this.id + ": pagado " + costo + ". Saldo: £" + this.saldo);
};


// ================== RECARGA ==================
function Recarga(tarjeta, monto, monedaObj) {
  this.tarjeta = tarjeta;
  this.monto = monto;
  this.moneda = monedaObj;
}
Recarga.prototype.aplicar = function () {
  const convertido = this.tarjeta.convertir(this.monto, this.moneda, this.tarjeta.monedaBase);
  this.tarjeta.saldo += convertido;
  console.log(
    "Recarga aplicada a " + this.tarjeta.id +
    ": +" + this.monto +
    ". Saldo actual: " + this.tarjeta.saldo 
  );
}; //Esto me hace ruido porque no deberian poder romper el encapsulamiento.


// ================== SISTEMA CENTRAL ==================
function SistemaCentralizado() {
  this.tarjetas = {};
}

SistemaCentralizado.prototype.registrarTarjeta = function (tarjeta) {
  this.tarjetas[tarjeta.id] = tarjeta;
};

SistemaCentralizado.prototype.recargarTarjeta = function (id, monto, monedaObj) {
  const t = this.tarjetas[id];
  if (!t) throw new Error("Tarjeta no encontrada");
  new Recarga(t, monto, monedaObj).aplicar();
};

SistemaCentralizado.prototype.pagarViaje = function (id, costo, monedaObj) {
  const t = this.tarjetas[id];
  if (!t) throw new Error("Tarjeta no encontrada");
  t.pagarViaje(costo, monedaObj);
};

SistemaCentralizado.prototype.consultarSaldo = function (id) {
  const t = this.tarjetas[id];
  if (!t) throw new Error("Tarjeta no encontrada");
  return t.consultarSaldo();
};


// ================== DEMO ==================
try {
  const conversor = new Conversor();
  const sistema = new SistemaCentralizado();

  const sube   = new TarjetaSube("SUBE123", 1000, conversor);
  const oyster = new TarjetaOyster("OYSTER123", 10, conversor);

  sistema.registrarTarjeta(sube);
  sistema.registrarTarjeta(oyster);

  console.log("\n--- Recargas ---");
  sistema.recargarTarjeta("SUBE123", 5, Libra);     // 5 GBP en SUBE
  sistema.recargarTarjeta("OYSTER123", 2500, Peso); // 2500 ARS en OYSTER

  console.log("\n--- Saldos ---");
  console.log("Saldo SUBE:", sistema.consultarSaldo("SUBE123"));
  console.log("Saldo OYSTER:", sistema.consultarSaldo("OYSTER123"));

  console.log("\n--- Pagos ---");
  sistema.pagarViaje("SUBE123", 2, Libra);    // SUBE paga 2 GBP
  sistema.pagarViaje("OYSTER123", 3000, Peso); // OYSTER paga 3000 ARS

  console.log("\n--- Saldos Finales ---");
  console.log("Saldo SUBE:", sistema.consultarSaldo("SUBE123"));
  console.log("Saldo OYSTER:", sistema.consultarSaldo("OYSTER123"));
} catch (e) {
  console.error("Error:", e.message);
}
