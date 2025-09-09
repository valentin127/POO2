class TarjetaSube {
    static SALDO_MINIMO = -600;
    
    constructor(id, saldoInicial = 0) {
    this.id = id;
    this.saldo = saldoInicial;
    }

    consultarSaldo() {
        return this.saldo;
    }

    cargarSaldo(monto) {
    if (!monto > 0) {
        throw new Error("El monto a cargar debe ser mayor a 0.");  
    } 
    this.saldo += monto;
    console.log('Se cargaron $' + monto + '. Saldo actual: $' + this.saldo);
  }

  pagarViaje(costo) {
    if (this.saldo - costo < TarjetaSube.SALDO_MINIMO) {
        throw new Error("No tiene saldo suficiente para pagar el viaje.");  
    }
    this.saldo -= costo;
    console.log('Se pagó un viaje de $'+ costo+ '. Saldo actual: $'+ this.saldo);
  }
}


//Prueba al estilo de main
/*try {
let tarjeta1 = new TarjetaSube("123ABC", 100);

console.log("Saldo inicial:", tarjeta1.consultarSaldo());

tarjeta1.cargarSaldo(500);  // Saldo = 600
tarjeta1.pagarViaje(200);   // Saldo = 400
tarjeta1.pagarViaje(900);   // Se permite hasta llegar a -600
tarjeta1.pagarViaje(200);   // Rechazado, pasaría de -600
}
catch (e) {
  console.error("Error:", e.message); 
}*/

/*
try {
  let tarjeta = new TarjetaSube("123ABC", 100);
  tarjeta.cargarSaldo(-50);  // ❌ error
} catch (e) {
  console.error("Error:", e.message); 
}
*/


//Parte 2
class SistemaCentralizado {
  constructor() {
    this.recargasPendientes = []; 
  }
  cargarTarjeta(id, monto) {
    if (monto <= 0) throw new Error("El monto debe ser mayor a 0.");
    this.recargasPendientes.push({ id, monto });
  }
  acreditarSaldo(tarjeta) {
    let pendientes = this.recargasPendientes.filter(r => r.id === tarjeta.id);
    pendientes.forEach(r => tarjeta.cargarSaldo(r.monto));
    this.recargasPendientes = this.recargasPendientes.filter(r => r.id !== tarjeta.id);
  }
  cantidadRecargasPendientes() {
    return this.recargasPendientes.length;
  }
}
try {
    let tarjeta1 = new TarjetaSube("123ABC", 100);
    let sistema = new SistemaCentralizado();

    console.log("Saldo inicial:", tarjeta1.consultarSaldo()); // 100

    sistema.cargarTarjeta("123ABC", 500);
    sistema.cargarTarjeta("123ABC", 200);
    console.log("Recargas pendientes:", sistema.cantidadRecargasPendientes()); // 2

    sistema.acreditarSaldo(tarjeta1);
    console.log("Saldo después de acreditar:", tarjeta1.consultarSaldo()); // 800
    console.log("Recargas pendientes:", sistema.cantidadRecargasPendientes()); // 0
}
catch (e) {
    console.error("Error:", e.message); 
}