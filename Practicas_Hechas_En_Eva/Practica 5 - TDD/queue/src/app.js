const { NodoVacio } = require('./Nodos.js');
const  Cola  = require('./cola.js');
    const cola = new Cola();
    const elemento = 2;
    const otroElemento = 10;
    cola.encolar(elemento);
    cola.encolar(otroElemento);
    cola.desencolar();
    