const SistemaCentralizado = require("./sistemaCentralizado.js");
const TarjetaSube = require("./sube.js");
const Peso = require("./peso.js")
const Dolar = require("./dolar.js")
const Libra = require("./libra.js")


const sc = new SistemaCentralizado();
const sube = new TarjetaSube(1);


sc.cargarTarjeta(1, new Peso(870));
sc.cargarTarjeta(1, new Dolar(1));
sc.cargarTarjeta(1, new Libra(1));
sc.cargarTarjeta(3, new Peso(100));

console.log("Monto acreditado: " + sc.montoTotalAcreditado());
console.log("Monto pendiente: " + sc.montoTotalPendiente());

sc.acreditarSaldo(sube);
sc.acreditarSaldo(sube);


console.log("Monto acreditado: " + sc.montoTotalAcreditado());
console.log("Monto pendiente: " + sc.montoTotalPendiente());