class TarjetaSube {
    static SALDO_MINIMO = -600;
    static contadorId = 0;

    constructor(saldoInicial) {
        this.id = ++TarjetaSube.contadorId;
        this.saldo = saldoInicial;
    }

    consultarSaldo() { return this.saldo; }

    consultarID() { return this.id; }

    cargarSaldo(recarga) {
        if (recarga <= 0) { throw new Error("El monto a cargar debe ser mayor a 0."); }
        this.saldo += recarga;
    }

    pagarViaje(costo) {
        if (this.saldo - costo < TarjetaSube.SALDO_MINIMO) { throw new Error("No tiene saldo suficiente para pagar el viaje."); }
        this.saldo -= costo;
    }

    tenesID(id) {
        return this.id === id;
    }
}

class Recarga {
    constructor(IDtarjeta, monto) {
        this.tarjetaID = IDtarjeta;
        this.monto = monto;
        this.acreditada = false;
    }

    verificarID(tarjeta) {
        return tarjeta.tenesID(this.tarjetaID);
    }

    cargar(tarjeta) {
        tarjeta.cargarSaldo(this.monto);
        this.acreditada = true;
    }
}

class SistemaCentralizado {
    constructor() {
        this.recargas = [];
    }

    cargarTarjeta(id, monto) {
        if (monto <= 0) { throw new Error("El monto debe ser mayor a 0."); }
        this.recargas.push(new Recarga(id, monto));
    }

    acreditarSaldo(tarjeta) {
        const recarga = this.recargas.find(r => !r.acreditada && r.verificarID(tarjeta));
        if (!recarga) { throw new Error(`No hay cargas pendientes para la tarjeta ${tarjeta.consultarID()}`); }
        recarga.cargar(tarjeta);
    }

    cantidadRecargasPendientes() {
        return this.recargas.filter(r => !r.acreditada).length;
    }

    montoAcreditado(tarjeta) {
        return this.recargas
            .filter(r => r.acreditada && r.verificarID(tarjeta))
            .reduce((total, r) => total + r.monto, 0);
    }

    montoNoAcreditado(tarjeta) {
        return this.recargas
            .filter(r => !r.acreditada && r.verificarID(tarjeta))
            .reduce((total, r) => total + r.monto, 0);
    }
}

// --- PRUEBAS ---

const sistema = new SistemaCentralizado();
const tarjeta1 = new TarjetaSube(1000); // id = 1
const tarjeta2 = new TarjetaSube(0);    // id = 2

console.log("=== Saldos iniciales ===");
console.log(`Tarjeta ${tarjeta1.consultarID()}:`, tarjeta1.consultarSaldo()); // 1000
console.log(`Tarjeta ${tarjeta2.consultarID()}:`, tarjeta2.consultarSaldo()); // 0

console.log("\n=== Registrar cargas pendientes ===");
sistema.cargarTarjeta(tarjeta1.consultarID(), 500);
sistema.cargarTarjeta(tarjeta2.consultarID(), 300);
sistema.cargarTarjeta(tarjeta1.consultarID(), 200);
console.log("Pendientes:", sistema.cantidadRecargasPendientes()); // 3

console.log("\n=== Acreditar saldo ===");
sistema.acreditarSaldo(tarjeta1);
console.log(`Saldo tarjeta ${tarjeta1.consultarID()}:`, tarjeta1.consultarSaldo()); // 1500
console.log("Pendientes:", sistema.cantidadRecargasPendientes()); // 2

sistema.acreditarSaldo(tarjeta2);
console.log(`Saldo tarjeta ${tarjeta2.consultarID()}:`, tarjeta2.consultarSaldo()); // 300
console.log("Pendientes:", sistema.cantidadRecargasPendientes()); // 1

console.log("\n=== Montos acreditados y no acreditados ===");
console.log(`Tarjeta ${tarjeta1.consultarID()} - Acreditado:`, sistema.montoAcreditado(tarjeta1));    // 500
console.log(`Tarjeta ${tarjeta1.consultarID()} - No acreditado:`, sistema.montoNoAcreditado(tarjeta1)); // 200
console.log(`Tarjeta ${tarjeta2.consultarID()} - Acreditado:`, sistema.montoAcreditado(tarjeta2));    // 300
console.log(`Tarjeta ${tarjeta2.consultarID()} - No acreditado:`, sistema.montoNoAcreditado(tarjeta2)); // 0

console.log("\n=== Pagar viajes ===");
tarjeta1.pagarViaje(800);
console.log(`Saldo tarjeta ${tarjeta1.consultarID()}:`, tarjeta1.consultarSaldo()); // 700

console.log("\n=== Pruebas de error ===");

try {
    sistema.cargarTarjeta(tarjeta1.consultarID(), -100);
} catch (e) {
    console.log("Error esperado:", e.message);
}

try {
    const tarjeta3 = new TarjetaSube(0);
    sistema.acreditarSaldo(tarjeta3);
} catch (e) {
    console.log("Error esperado:", e.message);
}

try {
    tarjeta2.pagarViaje(1000);
} catch (e) {
    console.log("Error esperado:", e.message);
}