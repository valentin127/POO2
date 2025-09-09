// PADRE
/*function Tarjeta(id, saldoInicial = 0, monedaBase = "ARS") {
  this.id = id;
  this.saldo = saldoInicial;
  this.monedaBase = monedaBase;
}

//La idea es definir como querramos pero usarla todos como privados.

Tarjeta.CAMBIO_PESO_LIBRA = 1250; //miembros estaticos no vamos a usar
Tarjeta.VALOR_EN_ARS ={ARS: 1,GBP: 1250};

Tarjeta.prototype.consultarSaldo = function() {
  return this.saldo; // aca debo retornar un numero y no un string. 
};

Tarjeta.prototype.convertir = function(monto, desde, hacia) {
  if (desde === hacia) return monto;
  if (desde === "ARS" && hacia === "GBP") return monto / Tarjeta.CAMBIO_PESO_LIBRA;
  if (desde === "GBP" && hacia === "ARS") return monto * Tarjeta.CAMBIO_PESO_LIBRA; //Evitar el uso de if y poder resolverlo de otra manera.
  throw new Error("Moneda no soportada: " + desde + " -> " + hacia);
};

Tarjeta.prototype.pagarViaje = function() {
  throw new Error("Método abstracto, implementar en subclase"); //Sacar los ifs y evitar el uso de los Strings.
};  */

function Tarjeta(id, saldoInicial = 0, monedaBase = "ARS") {
  this.id = id;
  this.saldo = saldoInicial;
  this.monedaBase = monedaBase;
}

//Diccionario de equivalencias
Tarjeta.VALOR_EN_ARS = {
  ARS: 1,
  GBP: 1250
}; //No me sirve de manera que hay que idear un objeto.

Tarjeta.prototype.consultarSaldo = function() {
  return this.saldo; // solo el número
};

Tarjeta.prototype.convertir = function(monto, desde, hacia) {
  if (!Tarjeta.VALOR_EN_ARS[desde] || !Tarjeta.VALOR_EN_ARS[hacia]) {
    throw new Error("Moneda no soportada: " + desde + " -> " + hacia);
  }
  return monto * (Tarjeta.VALOR_EN_ARS[desde] / Tarjeta.VALOR_EN_ARS[hacia]);
};

Tarjeta.prototype.pagarViaje = function() {
  throw new Error("Método abstracto, implementar en subclase");
};


// SUBE
function TarjetaSube(id, saldoInicial = 0) {
  Tarjeta.call(this, id, saldoInicial, "ARS"); // hereda de Tarjeta
}
TarjetaSube.prototype = Object.create(Tarjeta.prototype);
TarjetaSube.prototype.constructor = TarjetaSube;

TarjetaSube.SALDO_MINIMO = -600;

TarjetaSube.prototype.cargarSaldo = function(monto, moneda = "ARS") {
  if (monto <= 0) throw new Error("El monto a cargar debe ser mayor a 0.");
  let montoEnPesos = this.convertir(monto, moneda, "ARS");
  this.saldo += montoEnPesos;
  console.log("SUBE " + this.id + ": cargados " + monto + " " + moneda + ". Saldo actual: $" + this.saldo);
};

TarjetaSube.prototype.pagarViaje = function(costo, moneda = "ARS") {
  let costoEnPesos = this.convertir(costo, moneda, "ARS");
  if (this.saldo - costoEnPesos < TarjetaSube.SALDO_MINIMO) {
    throw new Error("Saldo insuficiente en SUBE.");
  }
  this.saldo -= costoEnPesos;
  console.log("SUBE " + this.id + ": pagado viaje de " + costo + " " + moneda + ". Saldo actual: $" + this.saldo);
};


// OYSTER
function TarjetaOyster(id, saldoInicial = 0) {
  Tarjeta.call(this, id, saldoInicial, "GBP");
}
TarjetaOyster.prototype = Object.create(Tarjeta.prototype);
TarjetaOyster.prototype.constructor = TarjetaOyster;

TarjetaOyster.prototype.cargarSaldo = function(monto, moneda = "GBP") {
  if (monto <= 0) throw new Error("El monto a cargar debe ser mayor a 0.");
  let montoEnLibras = this.convertir(monto, moneda, "GBP");
  this.saldo += montoEnLibras;
  console.log("OYSTER " + this.id + ": cargados " + monto + " " + moneda + ". Saldo actual: £" + this.saldo);
};

TarjetaOyster.prototype.pagarViaje = function(costo, moneda = "GBP") {
  let costoEnLibras = this.convertir(costo, moneda, "GBP");
  if (this.saldo < costoEnLibras) {
    throw new Error("Saldo insuficiente en Oyster.");
  }
  this.saldo -= costoEnLibras;
  console.log("OYSTER " + this.id + ": pagado viaje de " + costo + " " + moneda + ". Saldo actual: £" + this.saldo);
};


//OBJETO RECARGA.
function Recarga(tarjeta, monto, moneda) {
  this.tarjeta = tarjeta;
  this.monto = monto;
  this.moneda = moneda;
  this.estado = "pendiente";
  this.acreditado = false;
}

Recarga.prototype.aplicar = function() {
  let montoConvertido = this.tarjeta.convertir(this.monto, this.moneda, this.tarjeta.monedaBase);
  this.tarjeta.saldo += montoConvertido;
  console.log("Recarga aplicada a " + this.tarjeta.id + ": +" + this.monto + " " + this.moneda +
              " (" + montoConvertido + " " + this.tarjeta.monedaBase + "). " +
              "Saldo actual: " + this.tarjeta.saldo + " " + this.tarjeta.monedaBase);
};



//Central
function SistemaCentralizado() {
  this.tarjetas = {};
}

SistemaCentralizado.prototype.registrarTarjeta = function(tarjeta) { //esto se puede hacer bien. 
  this.tarjetas[tarjeta.id] = tarjeta;
};

SistemaCentralizado.prototype.recargarTarjeta = function(id, monto, moneda = "ARS") {
  let tarjeta = this.tarjetas[id];
  if (!tarjeta) throw new Error("Tarjeta no encontrada");
  let recarga = new Recarga(tarjeta, monto, moneda);
  recarga.aplicar();
};

SistemaCentralizado.prototype.pagarViaje = function(id, costo, moneda = "ARS") {
  let tarjeta = this.tarjetas[id];
  if (!tarjeta) throw new Error("Tarjeta no encontrada");
  tarjeta.pagarViaje(costo, moneda);
};

SistemaCentralizado.prototype.consultarSaldo = function(id) {
  let tarjeta = this.tarjetas[id];
  if (!tarjeta) throw new Error("Tarjeta no encontrada");
  return tarjeta.consultarSaldo();
};




// MAIN
try {
  const sistema = new SistemaCentralizado(); //El sistema centralizado en base a function no podemos generar mas copias del sistema que deberia ser unico.

  // Crear tarjetas
  let sube = new TarjetaSube("SUBE123", 1000);
  let oyster = new TarjetaOyster("OYSTER123", 10);

  // Registrar tarjetas en el sistema
  sistema.registrarTarjeta(sube);
  sistema.registrarTarjeta(oyster);

  console.log("\n--- Recargas ---");
  sistema.recargarTarjeta("SUBE123", 5, "Ars");     // carga en SUBE usando libras
  sistema.recargarTarjeta("OYSTER123", 2500, "ARS"); // carga en Oyster usando pesos

  console.log("\n--- Saldos ---");
  console.log("Saldo SUBE:", sistema.consultarSaldo("SUBE123"));
  console.log("Saldo Oyster:", sistema.consultarSaldo("OYSTER123"));

  console.log("\n--- Pagos ---");
  sistema.pagarViaje("SUBE123", 2, "GBP");    // SUBE paga un viaje en libras
  sistema.pagarViaje("OYSTER123", 3000, "ARS"); // Oyster paga un viaje en pesos

  console.log("\n--- Saldos Finales ---");
  console.log("Saldo SUBE:", sistema.consultarSaldo("SUBE123"));
  console.log("Saldo Oyster:", sistema.consultarSaldo("OYSTER123"));
}
catch (e) {
  console.error("Error:", e.message);
}

