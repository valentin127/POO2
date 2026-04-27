const { Empleado } = require('../src/Empleado');
const { FrancoFactory } = require('../src/Francos/FrancoFactory');

test('un empleado que tiene franco un día puntual descansa ese día', () => {
  const franco = FrancoFactory("DIA_PARTICULAR", {
    fechaExacta: new Date("2024-10-28T10:30:00Z")
  });

  const juan = new Empleado("Juan", [franco]);

  const mismaFecha = new Date("2024-10-28T10:30:00Z");

  expect(juan.tieneFranco(mismaFecha)).toBe(true);
});

test('ese mismo empleado NO tiene franco en otra fecha distinta', () => {
  const franco = FrancoFactory("DIA_PARTICULAR", {
    fechaExacta: new Date("2024-10-28T10:30:00Z")
  });

  const juan = new Empleado("Juan", [franco]);

  const otraFecha = new Date("2024-10-29T10:30:00Z");

  expect(juan.tieneFranco(otraFecha)).toBe(false);
});
