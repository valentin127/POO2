const { FrancoFactory } = require('../src/Francos/FrancoFactory');

test('crea un franco de día particular cuando le pido DIA_PARTICULAR', () => {
  const fecha = new Date("2024-10-28T10:30:00Z");

  const franco = FrancoFactory("DIA_PARTICULAR", { fechaExacta: fecha });

  expect(franco.esFranco(new Date("2024-10-28T10:30:00Z"))).toBe(true);
  expect(franco.esFranco(new Date("2024-10-29T10:30:00Z"))).toBe(false);
});

test('si le pido un tipo inválido tira error', () => {
  expect(() => FrancoFactory("INVENTADO", {})).toThrow("Tipo de franco inválido: INVENTADO.");
});

test('crea un franco de mes completo cuando le pido MES_COMPLETO', () => {
  const francoMes = FrancoFactory("MES_COMPLETO", { anio: 2024, mes: 9 });

  // mismo mes y año -> true
  expect(francoMes.esFranco(new Date("2024-10-01T10:00:00Z"))).toBe(true);
  expect(francoMes.esFranco(new Date("2024-10-28T10:00:00Z"))).toBe(true);

  // otro mes mismo año -> false
  expect(francoMes.esFranco(new Date("2024-11-01T10:00:00Z"))).toBe(false);

  // mismo mes pero otro año -> false
  expect(francoMes.esFranco(new Date("2023-10-15T10:00:00Z"))).toBe(false);
});