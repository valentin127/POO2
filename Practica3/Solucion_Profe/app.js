const SistemaCentralizado = require("./sistemaCentralizado.js");
const TarjetaSube = require("./sube.js");
const OysterCard = require("./Oyster.js");
const Peso = require("./peso.js")
const Dolar = require("./dolar.js")
const Libra = require("./libra.js")

const sc = new SistemaCentralizado();
const sube = new TarjetaSube();   
const oyster = new OysterCard();  

console.log("=== IDs ===");
console.log("sube id:", sube.numeroDeIdentificador);     // 1
console.log("oyster id:", oyster.numeroDeIdentificador); // 2

console.log("\n=== Cargar tarjetas ===");
sc.cargarTarjeta(sube.numeroDeIdentificador, new Peso(870));   // 870 pesos
sc.cargarTarjeta(sube.numeroDeIdentificador, new Libra(1));    // 1 libra = 1830 pesos
sc.cargarTarjeta(oyster.numeroDeIdentificador, new Peso(1830)); // 1830 pesos → 1 libra internamente
sc.cargarTarjeta(oyster.numeroDeIdentificador, new Libra(2));  // 2 libras directo

console.log("\n=== Acreditar ===");
sc.acreditarSaldo(sube);
sc.acreditarSaldo(oyster);
console.log("Saldo sube (en pesos):", sube.obtenerSaldo());     // 2700
console.log("Saldo oyster (en libras):", oyster.obtenerSaldo()); // 3 (1 + 2)

console.log("\n=== Pagar viaje con sube en pesos ===");
sube.pagarViaje(new Peso(100));
console.log("Saldo sube:", sube.obtenerSaldo()); // 2600

console.log("\n=== Pagar viaje con oyster en libras ===");
oyster.pagarViaje(new Libra(1));
console.log("Saldo oyster:", oyster.obtenerSaldo()); // 2

console.log("\n=== Pagar viaje con oyster en pesos (conversion) ===");
oyster.pagarViaje(new Peso(1830)); // 1830 pesos = 1 libra
console.log("Saldo oyster:", oyster.obtenerSaldo()); // 1

console.log("\n=== Error: saldo insuficiente oyster ===");
try {
    oyster.pagarViaje(new Libra(5)); // no alcanza
} catch(e) {
    console.log("Error esperado:", e.message);
}