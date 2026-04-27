// ============================================================
//  empleado.js — Contexto del patrón Strategy (con prototipos)
//
//  El Empleado no sabe CÓMO se verifica un franco; delega en
//  cada ConcreteStrategy (objetos Franco) a través de esFranco().
//  Los métodos están en el prototype → compartidos por todas
//  las instancias sin duplicarse en memoria.
// ============================================================

function Empleado(nombre) {
    this.nombre   = nombre;
    this._francos = [];
}

// Agrega una estrategia de franco
Empleado.prototype.agregarFranco = function(franco) {
    this._francos.push(franco);
};

// Patrón Strategy: delega en cada ConcreteStrategy
Empleado.prototype.tieneFranco = function(fecha) {
    return this._francos.some(function(franco) {
        return franco.esFranco(fecha);
    });
};

Empleado.prototype.verFrancos = function() {
    console.log("\nFrancos de " + this.nombre + ":");
    if (this._francos.length === 0) {
        console.log("  (sin francos configurados)");
        return;
    }
    this._francos.forEach(function(f) {
        console.log("  · " + f);
    });
};

Empleado.prototype.toString = function() {
    return "Empleado(" + this.nombre + ")";
};

module.exports = Empleado;
