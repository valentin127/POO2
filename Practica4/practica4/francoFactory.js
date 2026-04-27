// ============================================================
//  PATRÓN: Factory (con prototipos)
//  francoFactory.js — Centraliza la creación de francos.
//  El cliente solo conoce el Factory, no cada constructor concreto.
//
//  Implementado como función constructora con método estático
//  en la propia función (no en el prototype, porque es de la
//  "clase", no de cada instancia).
// ============================================================

var francos = require("./francos");

function FrancoFactory() {}

// Método estático en la función constructora (no en prototype)
FrancoFactory.crear = function(tipo) {
    var args = Array.prototype.slice.call(arguments, 1);

    switch (tipo) {
        case "diaExacto":
            // args: (dia, mes, anio)
            return new francos.FrancoDiaExacto(args[0], args[1], args[2]);
        case "anual":
            // args: (dia, mes)
            return new francos.FrancoAnual(args[0], args[1]);
        case "diaSemana":
            // args: (diaSemana)
            return new francos.FrancoDiaSemana(args[0]);
        case "diaSemanaAnio":
            // args: (diaSemana, anio)
            return new francos.FrancoDiaSemanaAnio(args[0], args[1]);
        case "diaSemanasMes":
            // args: (diaSemana, mes)
            return new francos.FrancoDiaSemanasMes(args[0], args[1]);
        case "diaMes":
            // args: (dia, anio)
            return new francos.FrancoDiaMes(args[0], args[1]);
        case "mesCompleto":
            // args: (mes, anio)
            return new francos.FrancoMesCompleto(args[0], args[1]);
        default:
            throw new Error("Tipo de franco desconocido: " + tipo);
    }
};

module.exports = FrancoFactory;
