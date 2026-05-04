function Nodo(valor) {
    this.valor = valor
    this.siguiente = null
}

function Cola() {
    this.primero = null
    this.ultimo = null
}

Cola.prototype.estaVacia = function () {
    if( this.primero === null){throw new Error("La cola esta vacia.")}
}

Cola.prototype.encolar = function (valor) {
    const nuevo = new Nodo(valor)

    if (this.primero === null) {
        this.primero = nuevo
        this.ultimo = nuevo
    } else {
        this.ultimo.siguiente = nuevo
        this.ultimo = nuevo
    }
}

Cola.prototype.desencolar = function () {
    if (this.estaVacia()) {throw new Error("La cola esta vacía")}

    const valor = this.primero.valor
    this.primero = this.primero.siguiente

    if (this.primero === null) {
        this.ultimo = null
    }

    return valor
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

        expect(() => cola.desencolar()).toThrow()
    })

})