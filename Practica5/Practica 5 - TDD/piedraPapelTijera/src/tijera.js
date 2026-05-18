const { derrota, victoria, empate } = require('./resultados');

const Tijera = function(){

    this.contraPiedra = function(){
        return derrota;
    }

    this.contraPapel = function(){
        return victoria;
    }

    this.contraTijera = function(){
        return empate;
    }

    this.contra = function(contrincante){
        return contrincante.contraTijera().not();
    };
};

module.exports = Tijera;