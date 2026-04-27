const { Empleado } = require('../src/Empleado');
const { FrancoFactory } = require('../src/Francos/FrancoFactory');
const { Calendario } = require('../src/Calendario');

test('dice si un empleado específico está de franco en una fecha dada', () => {
  const franco = FrancoFactory("DIA_PARTICULAR", {
    fechaExacta: new Date("2024-10-28T10:30:00Z")
  });

  const juan = new Empleado("Juan", [franco]);

  const calendario = new Calendario([juan]);

  const fechaConsulta = new Date("2024-10-28T10:30:00Z");

  expect(calendario.estaDeFranco("Juan", fechaConsulta)).toBe(true);
});

test('dice si un empleado específico no está de franco en una fecha dada', () => {
  const pedro = new Empleado("Pedro", []); // Pedro no tiene francos

  const calendario = new Calendario([pedro]);

  const fechaConsulta = new Date("2024-10-28T10:30:00Z");

  expect(calendario.estaDeFranco("Pedro", fechaConsulta)).toBe(false);
});

test('lanza un error si el empleado no existe en el calendario', () => {
  const calendario = new Calendario([]);
  const fechaConsulta = new Date("2024-10-28T10:30:00Z");
  expect(() => {calendario.estaDeFranco("Coco", fechaConsulta);}).toThrow("Empleado no encontrado.");
});