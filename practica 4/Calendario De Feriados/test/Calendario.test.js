const { Empleado } = require('../src/Empleado');
const { FrancoDiaParticular } = require('../src/Francos/FrancoDiaParticular');
const { Calendario } = require('../src/Calendario');

test('dice si un empleado específico está de franco en una fecha dada', () => {
    const franco= new FrancoDiaParticular(new Date("2024-10-28T10:30:00Z"));     // Juan tiene franco el 2024-10-28.
    const juan = new Empleado("Juan",[franco]);

    const calendario = new Calendario([juan]); // Creamos el calendario con un empleado Juan que tiene franco ese día.

    const fechaConsulta = new Date("2024-10-28T10:30:00Z");

    expect(calendario.estaDeFranco("Juan", fechaConsulta)).toBe(true);// Juan sí descansa ese día.
    
});

test('dice si un empleado específico no está de franco en una fecha dada', () => {
    const pedro = new Empleado("Pedro",[]); // Pedro NO tiene franco ese día, sin francos.
    
    const calendario = new Calendario([pedro]); // Creamos el calendario con un empleado pedro que no tiene franco ese día.

    const fechaConsulta = new Date("2024-10-28T10:30:00Z");
    expect(calendario.estaDeFranco("Pedro", fechaConsulta)).toBe(false); // Pedro no.
});


test('sino existe el empleado en el calendario', () => {
  const coco = new Empleado("Coco",[]);
  expect(()=>pizzeria.iniciarPedido()).not.toThrow(new Error("Empleado con nombre'+ nombreEmpleado +' no encontrado."));
});
