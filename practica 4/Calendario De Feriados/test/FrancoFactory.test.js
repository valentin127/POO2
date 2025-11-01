const { FrancoFactory } = require('../src/Francos/FrancoFactory');
const { FrancoDiaParticular } = require('../src/Francos/FrancoDiaParticular');


test('crea un franco de día particular cuando le pido DIA_PARTICULAR', () => {
    const fecha = new Date("2024-10-28T10:30:00Z");

    const franco = FrancoFactory("DIA_PARTICULAR", { fechaExacta: fecha });

    // esperamos que el objeto se comporte igual que un FrancoDiaParticular
    expect(franco.esFranco(new Date("2024-10-28T10:30:00Z"))).toBe(true);
    expect(franco.esFranco(new Date("2024-10-29T10:30:00Z"))).toBe(false);
});

test('si le pido un tipo inválido tira error', () => {
    expect(() => FrancoFactory("INVENTADO", {})).toThrow("Tipo de franco inválido: INVENTADO");
});
