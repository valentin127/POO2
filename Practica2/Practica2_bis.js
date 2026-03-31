class TarjetaSube {
    static SALDO_MINIMO = -600;
    constructor(id, saldoInicial = 0) {
    this.id = id;
    this.saldo = saldoInicial;
    }

    consultarSaldo(){return this.saldo;}

    cargarSaldo(monto) {
    if (monto <= 0) {throw new Error("El monto a cargar debe ser mayor a 0.");} 
    this.saldo += monto; 
    }


    pagarViaje(costo) {
    if (this.saldo - costo < TarjetaSube.SALDO_MINIMO) {throw new Error("No tiene saldo suficiente para pagar el viaje.");}
    this.saldo -= costo;
    }
}


//Pruebas:

const tarjeta1 = new TarjetaSube("ABC-001", 1000);
const tarjeta2 = new TarjetaSube("XYZ-002"); 

console.log("=== Tarjeta 1 ===");
console.log("Saldo inicial:", tarjeta1.consultarSaldo());
tarjeta1.pagarViaje(500);   
tarjeta1.pagarViaje(500);   
tarjeta1.pagarViaje(400);   

console.log("\n=== Tarjeta 2 ===");
console.log("Saldo inicial:", tarjeta2.consultarSaldo()); 
tarjeta2.cargarSaldo(800);  
console.log('Se cargaron $800. Saldo actual: $800');
tarjeta2.pagarViaje(300);   

console.log("\n=== Pruebas de error ===");


try {
    tarjeta1.cargarSaldo(-100);
} catch (e) {
    console.log("Error esperado:", e.message);
}


try {
    tarjeta1.pagarViaje(500); 
} catch (e) {
    console.log("Error esperado:", e.message);
}