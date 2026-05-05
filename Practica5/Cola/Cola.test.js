//Estados
function EstadoVacia() {}

EstadoVacia.prototype.encolar = function(cola, valor) {
    const nuevo = new Nodo(valor)
    cola.inicializar(nuevo)
    cola.estado = new EstadoNoVacia()
}

EstadoVacia.prototype.desencolar = function() {
    throw new Error("La cola esta vacía")
}

function EstadoNoVacia() {}

EstadoNoVacia.prototype.encolar = function(cola, valor) {
    const nuevo = new Nodo(valor)
    cola.enlazarNodo(nuevo);
}

EstadoNoVacia.prototype.desencolar = function(cola) {
    const valor = cola.primero.mostrarValor()
    cola.primero = cola.primero.mostrarSiguiente()

    if (cola.primero.estaVacio()) {
        cola.ultimo = new NodoVacio()
        cola.estado = new EstadoVacia()
    }

    return valor
}


//Nodos
function NodoVacio(){
    this.valor = null;
    this.siguiente = null;
}

NodoVacio.prototype.estaVacio = function(){
    return this.valor === null;
}

NodoVacio.prototype.mostrarValor = function(){
    return this.valor;
}

NodoVacio.prototype.mostrarSiguiente = function(){
    return this.siguiente 
}

NodoVacio.prototype.enlazar = function(nodo){
    this.siguiente = nodo;
}


function Nodo(valor) {
    this.valor = valor
    this.siguiente = new NodoVacio()
}

Nodo.prototype.mostrarSiguiente = function(){
    return this.siguiente 
}

Nodo.prototype.estaVacio = function(){
    return this.valor === null;
}

Nodo.prototype.mostrarValor = function(){
    return this.valor;
}

Nodo.prototype.enlazar = function(nodo){
    this.siguiente = nodo;
}

//Cola
function Cola() {
    this.primero = new NodoVacio()
    this.ultimo = new NodoVacio()
    this.estado = new EstadoVacia()
}

Cola.prototype.estaVacia = function () {
    return this.estado instanceof EstadoVacia
}

Cola.prototype.encolar = function (valor) {
    this.estado.encolar(this, valor)
}

Cola.prototype.desencolar = function () {
    return this.estado.desencolar(this)
}

Cola.prototype.enlazarNodo  = function(nuevo){
    this.ultimo.enlazar(nuevo)
    this.ultimo = nuevo
}

Cola.prototype.inicializar = function(nodo) {
    this.primero = nodo
    this.ultimo = nodo
}

Cola.prototype.avanzarPrimero = function() {
    const valor = this.primero.mostrarValor()
    this.primero = this.primero.mostrarSiguiente()
    return valor
}

Cola.prototype.resetear = function() {
    this.primero = new NodoVacio()
    this.ultimo = new NodoVacio()
}





describe("Cola - FIFO", () => {

    test("cola nueva está vacía", () => {
        const cola = new Cola()
        expect(cola.estaVacia()).toBe(true)
    })

    test("encolar agrega elemento", () => {
        const cola = new Cola()
        cola.encolar(10)

        expect(cola.estaVacia()).toBe(false)
    })

    test("desencolar devuelve el primero (FIFO)", () => {
        const cola = new Cola()
        cola.encolar(1)
        cola.encolar(2)
        cola.encolar(3)

        expect(cola.desencolar()).toBe(1)
    })

    test("FIFO en múltiples desencolados", () => {
        const cola = new Cola()
        cola.encolar(1)
        cola.encolar(2)
        cola.encolar(3)

        cola.desencolar()
        expect(cola.desencolar()).toBe(2)
    })

    test("desencolar elimina el elemento", () => {
        const cola = new Cola()
        cola.encolar(1)

        cola.desencolar()
        expect(cola.estaVacia()).toBe(true)
    })

    test("desencolar en vacío tira error", () => {
        const cola = new Cola()

        expect(() => cola.desencolar()).toThrow("La cola esta vacía")
    })

    test("Encolo 4 y saco el primero", () => {
        const cola = new Cola()
        cola.encolar(1)
        cola.encolar(2)
        cola.encolar(3)
        cola.encolar(4)
        expect(cola.desencolar()).toBe(1)
    })



})