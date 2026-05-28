const Compania = require("../src/compania");
const Cliente = require("../src/cliente");
const ConsumoInternet = require("../src/consumoInternet");
const ConsumoLlamada = require("../src/consumoLlamada");

test("se puede agregar un cliente al sistema", () => {
  const sistema = new Compania();
  const cliente = new Cliente();

  sistema.agregarCliente(cliente);

  expect(sistema.esCliente(cliente)).toBe(true);
});

test("al vender un paquete a un NoCliente el sistema falla", () => {
  const sistema = new Compania();
  const cliente = new Cliente();

  expect(() => sistema.vender(1, cliente)).toThrow(
    new Error("Solo se pueden vender paquetes a clientes."),
  );
});

test("al vender un paquete a un Cliente sin saldo suficiente el sistema falla", () => {
  const sistema = new Compania();
  const cliente = new Cliente();

  sistema.agregarCliente(cliente);

  expect(() => sistema.vender(1, cliente)).toThrow(
    new Error("No hay saldo suficiente para pagar el paquete."),
  );
});

test("Al vender un paquete a un cliente con saldo, el mismo queda activo", () => {
  const sistema = new Compania();
  const cliente = new Cliente();

  cliente.cargarSaldo(1000);
  sistema.agregarCliente(cliente);
  sistema.vender(1, cliente);

  expect(cliente.megasDisponibles()).toEqual(2500);
  expect(cliente.minutosDisponibles()).toEqual(1000);
});

test("Los paquetes adquiridos reducen la cuenta prepaga del cliente", () => {
  const sistema = new Compania();
  const cliente = new Cliente();

  cliente.cargarSaldo(1000);
  sistema.agregarCliente(cliente);
  sistema.vender(1, cliente);

  expect(cliente.saldoDisponible()).toEqual(600);
});

test("Se puede comprar cualquiera de los paquetes disponibles del sistema", () => {
  const sistema = new Compania();
  const cliente = new Cliente();

  cliente.cargarSaldo(150);
  sistema.agregarCliente(cliente);
  sistema.vender(2, cliente);

  expect(cliente.saldoDisponible()).toEqual(0);
});

test("Al realizar un consumo de internet se consumen los megas correspondientes.", () => {
  const sistema = new Compania();
  const cliente = new Cliente();
  const consumoDeInternet = new ConsumoInternet(500);
  cliente.cargarSaldo(1000);
  sistema.agregarCliente(cliente);
  sistema.vender(1, cliente);

  cliente.consumir(consumoDeInternet);

  expect(cliente.megasDisponibles()).toEqual(2000);
  expect(cliente.minutosDisponibles()).toEqual(1000);
});

test("Al realizar un consumo de minutos se consumen los minutos correspondientes.", () => {
  const sistema = new Compania();
  const cliente = new Cliente();
  const consumoLlamada = new ConsumoLlamada(500);
  cliente.cargarSaldo(1000);
  sistema.agregarCliente(cliente);
  sistema.vender(1, cliente);

  cliente.consumir(consumoLlamada);

  expect(cliente.minutosDisponibles()).toEqual(500);
  expect(cliente.megasDisponibles()).toEqual(2500);
});

test("Al realizar un consumo de minutos superior a los disponibles, el sistema falla y no consume", () => {
  const sistema = new Compania();
  const cliente = new Cliente();
  const consumoLlamada = new ConsumoLlamada(1001);
  cliente.cargarSaldo(1000);
  sistema.agregarCliente(cliente);
  sistema.vender(1, cliente);

  expect(() => cliente.consumir(consumoLlamada)).toThrow(
    new Error("No hay saldo suficiente para realizar el consumo."),
  );
  expect(cliente.minutosDisponibles()).toEqual(1000);
  expect(cliente.megasDisponibles()).toEqual(2500);
});

test("Al realizar un consumo de internet superior a los megas disponibles, el sistema falla y no consume", () => {
  const sistema = new Compania();
  const cliente = new Cliente();
  const consumoInternet = new ConsumoInternet(2501);
  cliente.cargarSaldo(1000);
  sistema.agregarCliente(cliente);
  sistema.vender(1, cliente);

  expect(() => cliente.consumir(consumoInternet)).toThrow(
    new Error("No hay saldo suficiente para realizar el consumo."),
  );
  expect(cliente.minutosDisponibles()).toEqual(1000);
  expect(cliente.megasDisponibles()).toEqual(2500);
});

test("Al cargar un cliente no tiene minutos disponibles ni megas", () => {
  const cliente = new Cliente();

  expect(cliente.minutosDisponibles()).toEqual(0);
  expect(cliente.megasDisponibles()).toEqual(0);
});

test("Al realizar un consumo de internet superior a los megas disponibles, el sistema falla y no consume", () => {
  const cliente = new Cliente();
  const consumoInternet = new ConsumoInternet(2501);

  expect(() => cliente.consumir(consumoInternet)).toThrow(
    new Error("No hay saldo suficiente para realizar el consumo."),
  );
});

test("Si el cliente tiene un paquete activo, no se le puede vender otro paquete", () => {
  const sistema = new Compania();
  const cliente = new Cliente();
  const consumoInternet = new ConsumoInternet(2501);
  cliente.cargarSaldo(1000);
  sistema.agregarCliente(cliente);
  sistema.vender(1, cliente);

  expect(() => sistema.vender(1, cliente)).toThrow(
    new Error("El cliente tiene un paquete activo"),
  );
});

test("Al agotarse un paquete, el mismo puede adquirir otro", () => {
  const sistema = new Compania();
  const cliente = new Cliente();
  const consumoInternet = new ConsumoInternet(2500);
  const consumollamada = new ConsumoLlamada(1000);
  cliente.cargarSaldo(10000);
  sistema.agregarCliente(cliente);
  sistema.vender(1, cliente);

  cliente.consumir(consumoInternet);
  cliente.consumir(consumollamada);
  sistema.vender(1, cliente);

  expect(cliente.minutosDisponibles()).toEqual(1000);
  expect(cliente.megasDisponibles()).toEqual(2500);
});

test("Al activar la renovacion automatica el paquete se compra automaticamente", () => {
  const sistema = new Compania();
  const cliente = new Cliente();
  const consumoInternet = new ConsumoInternet(2500);
  const consumollamada = new ConsumoLlamada(1000);
  cliente.cargarSaldo(10000);
  sistema.agregarCliente(cliente);
  sistema.vender(1, cliente);
  cliente.activarRenovacion();

  cliente.consumir(consumoInternet);
  cliente.consumir(consumollamada);

  expect(cliente.minutosDisponibles()).toEqual(1000);
  expect(cliente.megasDisponibles()).toEqual(2500);
});

test("La renovacion automatica solo funciona si hay saldo suficiente para comprar el paquete", () => {
  const sistema = new Compania();
  const cliente = new Cliente();
  const consumoInternet = new ConsumoInternet(2500);
  const consumollamada = new ConsumoLlamada(1000);
  cliente.cargarSaldo(400);
  sistema.agregarCliente(cliente);
  sistema.vender(1, cliente);
  cliente.activarRenovacion();

  cliente.consumir(consumoInternet);
  expect(() =>   cliente.consumir(consumollamada)).toThrow(
    new Error("No hay saldo suficiente para pagar el paquete."),
  );
  expect(cliente.minutosDisponibles()).toEqual(0);
  expect(cliente.megasDisponibles()).toEqual(0);
});

test("Un cliente conoce su historial de consumos.", () => {
  const sistema = new Compania();
  const cliente = new Cliente();
  const consumoInternet = new ConsumoInternet(2500);
  const consumollamada = new ConsumoLlamada(1000);
  cliente.cargarSaldo(10000);
  sistema.agregarCliente(cliente);
  sistema.vender(1, cliente);
  cliente.activarRenovacion();

  cliente.consumir(consumoInternet);
  cliente.consumir(consumollamada);

  expect(cliente.historialDeConsumos()).toEqual([consumoInternet, consumollamada])
});

test("Cuando un consumo no se puede hacer, el mismo no queda en el historial.", () => {
  const sistema = new Compania();
  const cliente = new Cliente();
  const consumoInternet = new ConsumoInternet(100000000000);
  const consumollamada = new ConsumoLlamada(1000);
  cliente.cargarSaldo(10000);
  sistema.agregarCliente(cliente);
  sistema.vender(1, cliente);
  cliente.activarRenovacion();

  expect(() => cliente.consumir(consumoInternet)).toThrow(
    new Error("No hay saldo suficiente para realizar el consumo."),
  );
  expect(cliente.historialDeConsumos()).toEqual([])
});