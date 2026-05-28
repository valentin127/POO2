const { NodoVacio } = require('./Nodos');

const Cola = function(){
    let elemento = new NodoVacio();

    this.desencolar = function(){
        let elementoDesencolado;
        elementoDesencolado = elemento.obtenerElemento();
        elemento = elemento.obtenerNodoSiguiente();
        return elementoDesencolado;
    }
    
    this.encolar = function(elementoRecibido){
        elemento = elemento.asignarNodoSiguiente(elementoRecibido)
    }
}

module.exports = Cola;