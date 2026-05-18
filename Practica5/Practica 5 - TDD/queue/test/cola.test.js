const Cola =  require("../src/cola")

test("falla al desencolar una cola vacia", ()=> {
    const cola = new Cola();

    expect(() => cola.desencolar()).toThrow(new Error("La cola esta vacia"));
})

test("cuando la cola tiene un elemento, al desencolarlo lo obtengo", () => {
    const cola = new Cola();
    const elemento = 1;
    cola.encolar(elemento);

    const resutado = cola.desencolar();

    expect(resutado).toBe(elemento);
});
    // Encolar 2 elementos, al desencolarlos los obtenemos
    // Encolar otro elemento y desencolarlo
test("Al desencolar un elemento, la cola queda vacia y falla al desencolar otro.", () => {
    // Encolar 1, desencolar 2 veces y fallar al segundo
    const cola = new Cola();
    const elemento = 1;
    cola.encolar(elemento);
    cola.desencolar();

    expect(() => cola.desencolar()).toThrow(new Error("La cola esta vacia"));
});

test("al encolar multiples elementos, nos devuelve el primero.", ()=>{
    const cola = new Cola();
    const elemento = 2;
    const otroElemento = 10;
    cola.encolar(elemento);
    cola.encolar(otroElemento);

    expect(cola.desencolar()).toBe(elemento)
});

test("Al encolar 2 elementos, y desencolarlos los obtengo en orden", ()=>{
    const cola = new Cola();
    const elemento = 2;
    const otroElemento = 10;

    cola.encolar(elemento);
    cola.encolar(otroElemento);
    cola.desencolar();

    expect(cola.desencolar()).toBe(otroElemento);
});

test("Al encolar 2 elementos, y desencolar uno mas falla.", ()=>{
    const cola = new Cola();

    cola.encolar(2);
    cola.encolar(10);
    cola.desencolar();
    cola.desencolar();

    expect(() => cola.desencolar()).toThrow(new Error("La cola esta vacia"));
});

test("Al encolar 3 elementos, y desencolarlos.", ()=>{
    const cola = new Cola();

    cola.encolar(2);
    cola.encolar(10);
    cola.encolar(15);
    cola.desencolar();
    cola.desencolar();

    expect(cola.desencolar()).toBe(15);
});