// PADRE
class Tarjeta {
  static CAMBIO_PESO_LIBRA = 1250;

  constructor(id, saldoInicial = 0, monedaBase = "ARS") {
    this.id = id;
    this.saldo = saldoInicial;
    this.monedaBase = monedaBase; 
  }

  consultarSaldo() {
    return this.saldo + " " + this.monedaBase;
  }

convertir(monto, desde, hacia) {
  return desde === hacia ? monto
       : (desde === "ARS" && hacia === "GBP") ? monto / Tarjeta.CAMBIO_PESO_LIBRA
       : (desde === "GBP" && hacia === "ARS") ? monto * Tarjeta.CAMBIO_PESO_LIBRA
       : (() => { throw new Error("Moneda no soportada: " + desde + " -> " + hacia); })();
  }


  cargarSaldo(monto, moneda) {
    throw new Error("Método abstracto, implementar en subclase");
  }

  pagarViaje(costo, moneda) {
    throw new Error("Método abstracto, implementar en subclase");
  }
}

// SUBE
class TarjetaSube extends Tarjeta {
  static SALDO_MINIMO = -600;
  constructor(id, saldoInicial = 0) {
    super(id, saldoInicial, "ARS"); 
  }
  cargarSaldo(monto, moneda = "ARS") {
    if (monto <= 0) throw new Error("El monto a cargar debe ser mayor a 0.");
    let montoEnPesos = this.convertir(monto, moneda, "ARS");
    this.saldo += montoEnPesos;
    console.log("SUBE " + this.id + ": cargados " + monto + " " + moneda + ". Saldo actual: $" + this.saldo);
  }

  pagarViaje(costo, moneda = "ARS") {
    let costoEnPesos = this.convertir(costo, moneda, "ARS");
    if (this.saldo - costoEnPesos < TarjetaSube.SALDO_MINIMO) {
      throw new Error("Saldo insuficiente en SUBE.");
    }
    this.saldo -= costoEnPesos;
    console.log("SUBE " + this.id + ": pagado viaje de " + costo + " " + moneda + ". Saldo actual: $" + this.saldo);
  }
}

// OYSTER
class TarjetaOyster extends Tarjeta {
  constructor(id, saldoInicial = 0) {
    super(id, saldoInicial, "GBP"); 
  }
  cargarSaldo(monto, moneda = "GBP") {
    if (monto <= 0) throw new Error("El monto a cargar debe ser mayor a 0.");
    let montoEnLibras = this.convertir(monto, moneda, "GBP");
    this.saldo += montoEnLibras;
    console.log("OYSTER " + this.id + ": cargados " + monto + " " + moneda + ". Saldo actual: £" + this.saldo);
  }
  pagarViaje(costo, moneda = "GBP") {
    let costoEnLibras = this.convertir(costo, moneda, "GBP");
    if (this.saldo < costoEnLibras) {
      throw new Error("Saldo insuficiente en Oyster.");
    }
    this.saldo -= costoEnLibras;
    console.log("OYSTER " + this.id + ": pagado viaje de " + costo + " " + moneda + ". Saldo actual: £" + this.saldo);
  }
}

//OBJETO RECARGA.
class Recarga {
  constructor(tarjeta, monto, moneda,id) {
    this.tarjeta = tarjeta;
    this.monto = monto;
    this.moneda = moneda;
    this.id = id;
    this.estado = "pendiente";
    this.acreditado = false;
  }

  aplicar() {
    let montoConvertido = this.tarjeta.convertir(this.monto,this.moneda,this.tarjeta.monedaBase);
    this.tarjeta.saldo += montoConvertido;
    console.log("Recarga aplicada a " + this.tarjeta.id +": +" + this.monto + " " + this.moneda +" (" + montoConvertido + " " + this.tarjeta.monedaBase + "). " +"Saldo actual: " + this.tarjeta.saldo + " " + this.tarjeta.monedaBase);
  }


}


//Central
class SistemaCentralizado {
  constructor() {
    this.tarjetas = {};
  }

  registrarTarjeta(tarjeta) {
    this.tarjetas[tarjeta.id] = tarjeta;
  }

  recargarTarjeta(id, monto, moneda = "ARS") {
    let tarjeta = this.tarjetas[id];
    if (!tarjeta) throw new Error("Tarjeta no encontrada");
    let recarga = new Recarga(tarjeta, monto, moneda);
    recarga.aplicar();
  }

  pagarViaje(id, costo, moneda = "ARS") {
    let tarjeta = this.tarjetas[id];
    if (!tarjeta) throw new Error("Tarjeta no encontrada");
    tarjeta.pagarViaje(costo, moneda);
  }

  consultarSaldo(id) {
    let tarjeta = this.tarjetas[id];
    if (!tarjeta) throw new Error("Tarjeta no encontrada");
    return tarjeta.consultarSaldo();
  }
}



// MAIN
try {
  const sistema = new SistemaCentralizado();
  let sube = new TarjetaSube("SUBE123", 1000);
  let oyster = new TarjetaOyster("OYSTER123", 10);
  sistema.registrarTarjeta(sube);
  sistema.registrarTarjeta(oyster);
  console.log("\n--- Recargas ---");
  sistema.recargarTarjeta("SUBE123", 5, "GBP");     
  sistema.recargarTarjeta("OYSTER123", 2500, "ARS");
  console.log("\n--- Saldos ---");
  console.log("Saldo SUBE:", sistema.consultarSaldo("SUBE123"));   
  console.log("Saldo Oyster:", sistema.consultarSaldo("OYSTER123"));
  console.log("\n--- Pagos ---");
  sistema.pagarViaje("SUBE123", 2, "GBP");   
  sistema.pagarViaje("OYSTER123", 3000, "ARS"); 
  console.log("\n--- Saldos Finales ---");
  console.log("Saldo SUBE:", sistema.consultarSaldo("SUBE123"));
  console.log("Saldo Oyster:", sistema.consultarSaldo("OYSTER123"));
}
catch (e) {
  console.error("Error:", e.message);
}
