// ==================== MONEDAS ====================

const PESO = {
    convertir(monto) {
        return monto;
    }
}

const LIBRA = {
    convertir(monto) {
        return monto * 1830;
    }
}

const DOLAR = {
    convertir(monto) {
        return monto * 1400;
    }
}

// ==================== GASTO ==================== conector de monto y moneda

const Gasto = function(monto, moneda) {
    this.monto = monto;
    this.moneda = moneda;

    this.enPesos = function() {
        return this.moneda.convertir(this.monto); // ← le manda el mensaje, no sabe cuál es
    }
}

// ==================== ESTADOS DE CARGA ==================== Con patron STATE.

const Acreditado = function() {
    this.cargarSaldo = function(tarjetaSube, gasto) {
        throw new Error("La carga ya esta habilitada");
    }

    this.esPendiente = function() {
        return false;
    }

    this.esAcreditado = function() {
        return !this.esPendiente(); //APROVECHAR QUE YA TENGO ARMADO EL ESPENDIENTE() !!
    }
}

const Pendiente = function() {
    this.cargarSaldo = function(tarjetaSube, gasto) {
        tarjetaSube.cargarSaldo(gasto); // ← pasa el gasto entero
    }

    this.esPendiente = function() {
        return true;
    }

    this.esAcreditado = function() {
        return !this.esPendiente(); //APROVECHAR QUE YA TENGO ARMADO EL ESPENDIENTE() !!
    }
}

// ==================== CARGA ====================

const Carga = function(id, gasto) {
    this.id = id;
    this.gasto = gasto; // ← ya no monto y moneda por separado, un solo objeto
    this.estado = new Pendiente(); //Se crea un estado de carga pendiente en base al patron state.

    this.mostrarEstado = function() { //GETTER
        return this.estado;
    }

    this.esPendiente = function() {
        return this.estado.esPendiente();
    }

    this.esAcreditado = function() {
        return this.estado.esAcreditado();
    }

    this.montoEnPesos = function() {
        return this.gasto.enPesos(); // ← le delega al gasto
    }

    this.acreditar = function(tarjetaSube) {
        if (this.correspondeA(tarjetaSube)) {
            this.estado.cargarSaldo(tarjetaSube, this.gasto); // ← pasa el gasto entero
            this.estado = new Acreditado();
        }
    }

    this.correspondeA = function(tarjetaSube) {
        return tarjetaSube.tenesId(this.id); //VALIDA QUE LA CARGA SOLO SE ACREDITE A LA TARJETA CUYO ID SEA IGUAL AL DE LA CARGA
        //le pido a la sube que me diga si tiene ese id -> esto logra MANTENER EL ENCAPSULAMIENTO.
        //La carga no tiene porque saber como se implementa la funcion
    }
}

// ==================== SUBE ====================

const Sube = function() {
    this.identificador = Sube.idActual;
    Sube.idActual += 1;
    this.saldo = 0;

    this.obtenerSaldo = function() {
        return this.saldo; //getter solo para console log
    }

    this.obtenerID = function() {
        return this.identificador;
    }

    this.pagarViaje = function(gasto) {
        const costoEnPesos = gasto.enPesos(); // ← le pregunta al gasto
        if (this.saldo - costoEnPesos < Sube.SALDO_MINIMO) { throw new Error("Saldo insuficiente"); }
        this.saldo -= costoEnPesos;
        return this.saldo;
    }

    this.cargarSaldo = function(gasto) {
        this.saldo += gasto.enPesos(); // ← le pregunta al gasto
    }

    this.tenesId = function(identificador) {
        return this.identificador === identificador;
    }
}

Sube.idActual = 1;
Sube.SALDO_MINIMO = -600;

// ==================== SISTEMA CENTRALIZADO ====================

const SistemaCentralizado = function() {
    this.cargas = [];

    this.cargarTarjeta = function(id, gasto) {
        if (gasto.enPesos() <= 0) throw new Error("El monto a cargar debe ser positivo!");
        this.cargas.push(new Carga(id, gasto));
    }

    this.acreditarSaldo = function(tarjetaSube) {
        this.cargas.forEach((carga) => {
            carga.acreditar(tarjetaSube);   //ACREDITA TODAS LAS CARGAS PENDIENTES DE UNA TARJETA
        });
    }

    this.cantidadRecargasPendientes = function() {
        return this.cargas.filter(carga => carga.esPendiente()).length; //CAMBIAR CARGA.ESTADO.ESPENDIENTE() YA QUE ROMPE ENCAPSULACION
    }

    this.saldosPendientes = function() {
        return this.cargas.reduce((total, carga) =>
            carga.esPendiente() ? total + carga.montoEnPesos() : total, 0);
        // CAMBIAR CARGA.MONTO YA QUE ROMPE ENCAPSULACION
    }

    this.saldosAcreditados = function() {
        return this.cargas.reduce((total, carga) =>
            carga.esAcreditado() ? total + carga.montoEnPesos() : total, 0);
        // CAMBIAR CARGA.MONTO YA QUE ROMPE ENCAPSULACION
    }
}

// ==================== PRUEBAS ====================

const sistema = new SistemaCentralizado();
const tarjeta1 = new Sube(); // id = 1
const tarjeta2 = new Sube(); // id = 2

console.log("=== Cargar en distintas monedas ===");
sistema.cargarTarjeta(tarjeta1.obtenerID(), new Gasto(1000, PESO));
sistema.cargarTarjeta(tarjeta1.obtenerID(), new Gasto(2, LIBRA));
sistema.cargarTarjeta(tarjeta2.obtenerID(), new Gasto(3, DOLAR));

console.log("Pendientes:", sistema.cantidadRecargasPendientes()); // 3
console.log("Saldo pendiente total:", sistema.saldosPendientes()); // 8860

console.log("\n=== Acreditar tarjeta 1 ===");
sistema.acreditarSaldo(tarjeta1);
console.log("Saldo tarjeta 1:", tarjeta1.obtenerSaldo()); // 4660 (1000 + 3660)
console.log("Pendientes:", sistema.cantidadRecargasPendientes()); // 1
console.log("Acreditados:", sistema.saldosAcreditados()); // 4660

console.log("\n=== Acreditar tarjeta 2 ===");
sistema.acreditarSaldo(tarjeta2);
console.log("Saldo tarjeta 2:", tarjeta2.obtenerSaldo()); // 4200
console.log("Pendientes:", sistema.cantidadRecargasPendientes()); // 0

console.log("\n=== Pagar viaje en libras (tarjeta 1) ===");
tarjeta1.pagarViaje(new Gasto(1, LIBRA)); // 1 libra = 1830 pesos
console.log("Saldo tarjeta 1:", tarjeta1.obtenerSaldo()); // 2830

console.log("\n=== Pagar viaje en dólares (tarjeta 2) ===");
tarjeta2.pagarViaje(new Gasto(1, DOLAR)); // 1 dólar = 1400 pesos
console.log("Saldo tarjeta 2:", tarjeta2.obtenerSaldo()); // 2800

console.log("\n=== Error: saldo insuficiente en libras ===");
try {
    tarjeta2.pagarViaje(new Gasto(5, LIBRA)); // 5 libras = 9150 pesos, no alcanza
} catch (e) {
    console.log("Error esperado:", e.message);
}