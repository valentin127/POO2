const { empate, derrota, victoria } = require('./resultados');

const Piedra = function(){

    this.contraPiedra = function(){
        return empate;
    }

    this.contraPapel = function(){
        return derrota;
    }

    this.contraTijera = function(){
        return victoria;
    }

    this.contra = function(contrincante){
        return contrincante.contraPiedra().not();
    };

}

module.exports = Piedra;