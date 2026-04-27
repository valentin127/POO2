// ============================================================
//  PATRÓN: Strategy (con prototipos)
//  francos.js — Cada función constructora es una ConcreteStrategy.
//  Todas comparten la misma "interfaz": el método esFranco(fecha)
//  definido en su prototype. El Empleado delega en ellas sin saber
//  cuál es cuál → los algoritmos varían independientemente.
// ============================================================

var NOMBRES_DIA = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
var NOMBRES_MES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                   "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

// ── ConcreteStrategy 1: Un día exacto del año ────────────────
function FrancoDiaExacto(dia, mes, anio) {
    this.dia  = dia;   // 1-31
    this.mes  = mes;   // 0-11
    this.anio = anio;
}
FrancoDiaExacto.prototype.esFranco = function(fecha) {
    return fecha.getDate()     === this.dia  &&
           fecha.getMonth()    === this.mes  &&
           fecha.getFullYear() === this.anio;
};
FrancoDiaExacto.prototype.toString = function() {
    return "Día exacto: " + this.dia + "/" + (this.mes + 1) + "/" + this.anio;
};

// ── ConcreteStrategy 2: Mismo día y mes todos los años ───────
function FrancoAnual(dia, mes) {
    this.dia = dia;
    this.mes = mes;
}
FrancoAnual.prototype.esFranco = function(fecha) {
    return fecha.getDate()  === this.dia &&
           fecha.getMonth() === this.mes;
};
FrancoAnual.prototype.toString = function() {
    return "Anual: " + this.dia + "/" + (this.mes + 1) + " (todos los años)";
};

// ── ConcreteStrategy 3: Un día de la semana ──────────────────
function FrancoDiaSemana(diaSemana) {
    this.diaSemana = diaSemana; // 0=Dom ... 6=Sáb
}
FrancoDiaSemana.prototype.esFranco = function(fecha) {
    return fecha.getDay() === this.diaSemana;
};
FrancoDiaSemana.prototype.toString = function() {
    return "Día de semana: todos los " + NOMBRES_DIA[this.diaSemana];
};

// ── ConcreteStrategy 4: Día de semana en un año particular ───
function FrancoDiaSemanaAnio(diaSemana, anio) {
    this.diaSemana = diaSemana;
    this.anio      = anio;
}
FrancoDiaSemanaAnio.prototype.esFranco = function(fecha) {
    return fecha.getDay()       === this.diaSemana &&
           fecha.getFullYear()  === this.anio;
};
FrancoDiaSemanaAnio.prototype.toString = function() {
    return "Día semana/año: " + NOMBRES_DIA[this.diaSemana] + " de " + this.anio;
};

// ── ConcreteStrategy 5: Día de semana en un mes particular ───
//    → CASO FRANCISCO: "todos los martes de septiembre"
function FrancoDiaSemanasMes(diaSemana, mes) {
    this.diaSemana = diaSemana;
    this.mes       = mes;
}
FrancoDiaSemanasMes.prototype.esFranco = function(fecha) {
    return fecha.getDay()   === this.diaSemana &&
           fecha.getMonth() === this.mes;
};
FrancoDiaSemanasMes.prototype.toString = function() {
    return "Día semana/mes: " + NOMBRES_DIA[this.diaSemana] + " de " + NOMBRES_MES[this.mes];
};

// ── ConcreteStrategy 6: El mismo día de cada mes en un año ───
function FrancoDiaMes(dia, anio) {
    this.dia  = dia;
    this.anio = anio;
}
FrancoDiaMes.prototype.esFranco = function(fecha) {
    return fecha.getDate()     === this.dia &&
           fecha.getFullYear() === this.anio;
};
FrancoDiaMes.prototype.toString = function() {
    return "Día de cada mes: día " + this.dia + " de cada mes en " + this.anio;
};

// ── ConcreteStrategy 7: Un mes completo de un año ────────────
function FrancoMesCompleto(mes, anio) {
    this.mes  = mes;
    this.anio = anio;
}
FrancoMesCompleto.prototype.esFranco = function(fecha) {
    return fecha.getMonth()    === this.mes &&
           fecha.getFullYear() === this.anio;
};
FrancoMesCompleto.prototype.toString = function() {
    return "Mes completo: " + NOMBRES_MES[this.mes] + " de " + this.anio;
};

module.exports = {
    FrancoDiaExacto    : FrancoDiaExacto,
    FrancoAnual        : FrancoAnual,
    FrancoDiaSemana    : FrancoDiaSemana,
    FrancoDiaSemanaAnio: FrancoDiaSemanaAnio,
    FrancoDiaSemanasMes: FrancoDiaSemanasMes,
    FrancoDiaMes       : FrancoDiaMes,
    FrancoMesCompleto  : FrancoMesCompleto
};
