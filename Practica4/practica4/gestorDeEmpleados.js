// ============================================================
//  PATRÓN: Singleton (con prototipos + IIFE)
//  gestorDeEmpleados.js
//
//  Implementación con prototipos tal como muestra el Tema 6:
//  el constructor guarda la instancia en GestorDeEmpleados.instance
//  y la devuelve si ya existe.
//
//  Usamos IIFE para que _empleados sea un estado privado
//  estático (igual al patrón de miembros estáticos privados
//  visto en Prototipos en detalle).
// ============================================================

var GestorDeEmpleados = (function() {

    // Estado privado — no accesible desde afuera
    var _instancia = null;

    function GestorDeEmpleados() {
        // Si ya existe la instancia, la devolvemos (Singleton)
        if (_instancia) {
            return _instancia;
        }
        this._empleados = [];
        _instancia = this;
    }

    GestorDeEmpleados.prototype.agregar = function(empleado) {
        this._empleados.push(empleado);
        console.log("✔ Empleado registrado: " + empleado.nombre);
    };

    GestorDeEmpleados.prototype.buscar = function(nombre) {
        var resultado = null;
        this._empleados.forEach(function(e) {
            if (e.nombre.toLowerCase() === nombre.toLowerCase()) {
                resultado = e;
            }
        });
        return resultado;
    };

    GestorDeEmpleados.prototype.consultarFranco = function(nombre, fecha) {
        var emp = this.buscar(nombre);
        if (!emp) {
            console.log("✘ Empleado '" + nombre + "' no encontrado.");
            return;
        }
        var esFranco = emp.tieneFranco(fecha);
        var fechaStr = fecha.toLocaleDateString("es-AR");
        console.log(
            emp.nombre + " — " + fechaStr + ": " +
            (esFranco ? "✅ ES FRANCO" : "❌ NO es franco")
        );
        return esFranco;
    };

    GestorDeEmpleados.prototype.listarEmpleados = function() {
        console.log("\n=== Empleados registrados ===");
        this._empleados.forEach(function(e) {
            console.log("  · " + e.nombre);
        });
    };

    return GestorDeEmpleados;

})();

// Exportamos la instancia única directamente
module.exports = new GestorDeEmpleados();
