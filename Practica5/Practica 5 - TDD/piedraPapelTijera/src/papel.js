const { victoria, empate, derrota } = require('./resultados');

const Papel = function(){

    this.contraPiedra = function (){
        return victoria;
    }

    this.contraPapel = function(){
        return empate;
    }

    this.contraTijera = function(){
        return derrota;
    }

    this.contra = function(contrincante){
        return contrincante.contraPapel().not();
    };
};

module.exports = Papel;