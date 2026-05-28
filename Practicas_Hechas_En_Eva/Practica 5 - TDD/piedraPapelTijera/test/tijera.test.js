const Tijera = require("../src/tijera");
const Piedra = require("../src/piedra");
const Papel = require("../src/papel");
const { victoria, derrota, empate } = require("../src/resultados");

test("El resultado de tijera contra tijera es Empate", () => {
    const tijera1 = new Tijera();
    const tijera2 = new Tijera();

    const resultado = tijera1.contra(tijera2);

    expect(resultado).toBe(empate);
});

test("El resultado de tijera contra papel es Victoria", () => {
    const tijera = new Tijera();
    const papel = new Papel();

    const resultado = tijera.contra(papel);

    expect(resultado).toBe(victoria);
});

test("El resultado de tijera contra piedra es Derrota", () => {
    const tijera = new Tijera();
    const piedra = new Piedra();

    const resultado = tijera.contra(piedra);

    expect(resultado).toBe(derrota);
});
