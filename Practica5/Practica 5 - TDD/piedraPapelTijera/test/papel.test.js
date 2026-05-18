const Papel = require("../src/papel");
const Piedra = require("../src/piedra");
const Tijera = require("../src/tijera");
const { victoria, derrota, empate } = require("../src/resultados");

test("El resultado de papel contra papel es Empate", () => {
    //set up
    const papel1 = new Papel();
    const papel2 = new Papel();

    //Act
    const resultado = papel1.contra(papel2);

    //Assert
    expect(resultado).toBe(empate)
});

test("El resultado de papel contra piedra es Victoria", () => {
    const papel = new Papel();
    const piedra = new Piedra();

    const resultado = papel.contra(piedra);

    expect(resultado).toBe(victoria);
});

test("El resultado de papel contra tijera es Derrota", () => {
    const papel = new Papel();
    const tijera = new Tijera();

    const resultado = papel.contra(tijera);

    expect(resultado).toBe(derrota);
});