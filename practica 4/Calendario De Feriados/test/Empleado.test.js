const { Empleado } = require('../src/Empleado');
const { FrancoDiaParticular } = require('../src/Francos/FrancoDiaParticular');

test('un empleado que tiene franco un día puntual descansa ese día', () => {
  const franco = new FrancoDiaParticular(new Date("2024-10-28T10:30:00Z"));

  const juan = new Empleado("Juan",[franco]); // el empleado tiene franco el 2024-10-28

  const mismaFecha = new Date("2024-10-28T10:30:00Z"); // le pregunto justo esa fecha (objeto fecha de js no importa)

  expect(juan.tieneFranco(mismaFecha)).toBe(true); //Verifico que tiene franco la misma fecha
});

test('ese mismo empleado NO tiene franco en otra fecha distinta', () => {
  const franco = new FrancoDiaParticular(new Date("2024-10-28T10:30:00Z"));
  const juan = new Empleado("Juan",[franco]);
  const otraFecha = new Date("2024-10-29T10:30:00Z");     // otra fecha

  expect(juan.tieneFranco(otraFecha)).toBe(false); 
});

