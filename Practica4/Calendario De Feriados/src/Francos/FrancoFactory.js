// FrancoFactory.js
var FrancoDiaParticular   = require("./FrancoDiaParticular");
var FrancoDiaAnual        = require("./FrancoDiaAnual");
var FrancoDeDeSemana      = require("./FrancoDeDeSemana");
var FrancoDiaDeSemanaAnio = require("./FrancoDiaDeSemanaAnio");
var FrancoDiaDeSemanaMes  = require("./FrancoDiaDeSemanaMes");
var FrancoDiaDeMesAnio    = require("./FrancoDiaDeMesAnio");
var MesCompleto           = require("./Mes_Completo");

function FrancoFactory() {}

FrancoFactory.crear = function(tipo,...args) {
    switch(tipo) {
        case "FrancoDiaParticular":   
          return new FrancoDiaParticular(...args);
        case "FrancoDiaAnual":        
          return new FrancoDiaAnual(...args);
        case "FrancoDeDeSemana":      
          return new FrancoDeDeSemana(...args);
        case "FrancoDiaDeSemanaAnio": 
          return new FrancoDiaDeSemanaAnio(...args);
        case "FrancoDiaDeSemanaMes":  
          return new FrancoDiaDeSemanaMes(...args);
        case "FrancoDiaDeMesAnio":    
          return new FrancoDiaDeMesAnio(...args);
        case "MesCompleto":           
          return new MesCompleto(...args);
        default: 
          throw new Error("Tipo desconocido.");
    }
};

module.exports = FrancoFactory;