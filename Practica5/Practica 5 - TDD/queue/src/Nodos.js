const NodoVacio = function(){
    this.obtenerElemento = function(){
        throw new Error("La cola esta vacia")
    }

    this.asignarNodoSiguiente = function(elemento){
        return new Nodo(elemento);
    }
}

const Nodo = function(elemento){
    this.nodoSiguiente = new NodoVacio();

    this.asignarNodoSiguiente = function(elemento){
        this.nodoSiguiente = this.nodoSiguiente.asignarNodoSiguiente(elemento)
        return this;
    }

    this.obtenerElemento = function(){
        return elemento;
    }

    this.obtenerNodoSiguiente = function(){
        return this.nodoSiguiente;
    }
}

module.exports = { NodoVacio, Nodo };