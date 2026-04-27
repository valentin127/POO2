// ============================================================
//  app.js — Punto de entrada
//  Demuestra los 3 patrones del Tema 6 con prototipos:
//    · Factory  → FrancoFactory.crear(tipo, ...args)
//    · Strategy → cada franco es una ConcreteStrategy intercambiable
//    · Singleton→ gestor siempre es la misma instancia
// ============================================================

var Empleado      = require("./empleado");
var FrancoFactory = require("./francoFactory");
var gestor        = require("./gestorDeEmpleados");

// ── Verificamos Singleton ────────────────────────────────────
var gestor2 = require("./gestorDeEmpleados");
console.log("¿Mismo gestor (Singleton)? →", gestor === gestor2); // true

// ── Crear empleados ──────────────────────────────────────────
var ana       = new Empleado("Ana");
var roberto   = new Empleado("Roberto");
var francisco = new Empleado("Francisco");

// ── Francos de Ana (via Factory → Strategy) ──────────────────
ana.agregarFranco(FrancoFactory.crear("diaExacto",   25, 11, 2024)); // 25/12/2024
ana.agregarFranco(FrancoFactory.crear("anual",        1,  0));        // 1/1 cada año
ana.agregarFranco(FrancoFactory.crear("diaSemana",    0));             // todos los domingos

// ── Francos de Roberto (via Factory → Strategy) ──────────────
roberto.agregarFranco(FrancoFactory.crear("diaSemanaAnio", 1, 2024)); // lunes de 2024
roberto.agregarFranco(FrancoFactory.crear("diaMes",       15, 2024)); // día 15 de c/mes 2024
roberto.agregarFranco(FrancoFactory.crear("mesCompleto",   6, 2025)); // julio 2025

// ── Francos de Francisco — CASO DEL ENUNCIADO ────────────────
// "todos los martes (2) de septiembre (8)"
francisco.agregarFranco(FrancoFactory.crear("diaSemanasMes", 2, 8));

// ── Registrar en el Singleton ────────────────────────────────
gestor.agregar(ana);
gestor.agregar(roberto);
gestor.agregar(francisco);

gestor.listarEmpleados();
ana.verFrancos();
roberto.verFrancos();
francisco.verFrancos();

// ── Consultas ────────────────────────────────────────────────
console.log("\n=== Consultas ===");

// Ana
gestor.consultarFranco("Ana", new Date("2024-12-25T12:00:00Z")); // ✅ día exacto
gestor.consultarFranco("Ana", new Date("2024-12-22T12:00:00Z")); // ✅ domingo
gestor.consultarFranco("Ana", new Date("2025-01-01T12:00:00Z")); // ✅ anual
gestor.consultarFranco("Ana", new Date("2024-12-24T12:00:00Z")); // ❌ martes

// Roberto
gestor.consultarFranco("Roberto", new Date("2024-03-15T12:00:00Z")); // ✅ día 15
gestor.consultarFranco("Roberto", new Date("2024-01-08T12:00:00Z")); // ✅ lunes 2024
gestor.consultarFranco("Roberto", new Date("2025-07-10T12:00:00Z")); // ✅ julio 2025
gestor.consultarFranco("Roberto", new Date("2025-01-07T12:00:00Z")); // ❌

// Francisco — caso del enunciado
gestor.consultarFranco("Francisco", new Date("2024-09-03T12:00:00Z")); // ✅ martes sept
gestor.consultarFranco("Francisco", new Date("2024-09-10T12:00:00Z")); // ✅ martes sept
gestor.consultarFranco("Francisco", new Date("2024-09-04T12:00:00Z")); // ❌ miércoles sept
gestor.consultarFranco("Francisco", new Date("2024-10-01T12:00:00Z")); // ❌ martes oct

// Empleado inexistente
gestor.consultarFranco("Carlos", new Date("2024-12-25T12:00:00Z"));
