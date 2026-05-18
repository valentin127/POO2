// ===== IMPORTS - TODOS AL INICIO, UNA SOLA VEZ =====
const Cliente = require('../src/Cliente');
const CuentaPrepaga = require('../src/Cuenta_Prepaga');
const Paquete = require('../src/Paquete');
const { Consumo, ConsumoInternet, ConsumoLlamada } = require('../src/Consumo');





// ===== TESTS DE CUENTA PREPAGA =====
describe('CuentaPrepaga', () => {
  
  test('debe crear una cuenta con saldo inicial 0 por defecto', () => {
    const cuenta = new CuentaPrepaga();
    expect(cuenta.saldo).toBe(0);
  });

  test('debe crear una cuenta con saldo inicial especificado', () => {
    const cuenta = new CuentaPrepaga(500);
    expect(cuenta.saldo).toBe(500);
  });

  test('debe aumentar el saldo al cargar dinero', () => {
    const cuenta = new CuentaPrepaga(100);
    cuenta.cargarSaldo(50);
    expect(cuenta.saldo).toBe(150);
  });

  test('debe lanzar error si el monto a cargar es 0 o negativo', () => {
    const cuenta = new CuentaPrepaga();
    expect(() => cuenta.cargarSaldo(0)).toThrow();
    expect(() => cuenta.cargarSaldo(-50)).toThrow();
  });

  test('debe disminuir el saldo al debitar', () => {
    const cuenta = new CuentaPrepaga(100);
    cuenta.debitar(30);
    expect(cuenta.saldo).toBe(70);
  });

  test('debe lanzar error si no hay saldo suficiente', () => {
    const cuenta = new CuentaPrepaga(50);
    expect(() => cuenta.debitar(100)).toThrow("Saldo insuficiente");
  });

  test('debe retornar true si hay saldo suficiente', () => {
    const cuenta = new CuentaPrepaga(100);
    expect(cuenta.tieneSaldoSuficiente(50)).toBe(true);
    expect(cuenta.tieneSaldoSuficiente(100)).toBe(true);
    expect(cuenta.tieneSaldoSuficiente(150)).toBe(false);
  });
});





// ===== TESTS DE PAQUETE =====
describe('Paquete', () => {
  
  test('debe crear un paquete con los datos especificados', () => {
    const paquete = new Paquete(2500, 1000, 400, 30);
    expect(paquete.datosMB).toBe(2500);
    expect(paquete.minutos).toBe(1000);
    expect(paquete.costo).toBe(400);
    expect(paquete.duracionDias).toBe(30);
  });

  test('debe inicializar con datos y minutos disponibles iguales a los totales', () => {
    const paquete = new Paquete(2500, 1000, 400, 30);
    expect(paquete.datosDisponibles).toBe(2500);
    expect(paquete.minutosDisponibles).toBe(1000);
  });

  test('debe inicializar en estado NoActivo', () => {
    const paquete = new Paquete(2500, 1000, 400, 30);
    expect(paquete.estaActivo()).toBe(false);
  });

  test('debe cambiar a estado Activo al activar', () => {
    const paquete = new Paquete(2500, 1000, 400, 30);
    paquete.activar();
    expect(paquete.estaActivo()).toBe(true);
    expect(paquete.fechaActivacion).not.toBeNull();
    expect(paquete.fechaVencimiento).not.toBeNull();
  });

  test('debe descontar datos correctamente', () => {
    const paquete = new Paquete(2500, 1000, 400, 30);
    paquete.activar();
    paquete.descontarDatos(500);
    expect(paquete.datosDisponibles).toBe(2000);
  });

  test('debe lanzar error si no hay suficientes datos', () => {
    const paquete = new Paquete(100, 1000, 400, 30);
    paquete.activar();
    expect(() => paquete.descontarDatos(200)).toThrow("No hay suficientes datos disponibles");
  });

  test('debe descontar minutos correctamente', () => {
    const paquete = new Paquete(2500, 1000, 400, 30);
    paquete.activar();
    paquete.descontarMinutos(200);
    expect(paquete.minutosDisponibles).toBe(800);
  });

  test('debe lanzar error si no hay suficientes minutos', () => {
    const paquete = new Paquete(2500, 100, 400, 30);
    paquete.activar();
    expect(() => paquete.descontarMinutos(200)).toThrow("No hay suficientes minutos disponibles");
  });

  test('debe retornar false cuando NO está agotado', () => {
    const paquete = new Paquete(100, 100, 400, 30);
    paquete.activar();
    expect(paquete.estaAgotado()).toBe(false);
  });

  test('debe cambiar a NoActivo cuando se agota', () => {
    const paquete = new Paquete(100, 100, 400, 30);
    paquete.activar();
    expect(paquete.estaActivo()).toBe(true);
    
    paquete.descontarDatos(100);
    paquete.descontarMinutos(100);
    
    expect(paquete.estaAgotado()).toBe(true);
    expect(paquete.estaActivo()).toBe(false);
  });
});




// ===== TESTS DE CONSUMO =====
describe('Consumo', () => {
  
  test('debe lanzar error si se usa el método abstracto', () => {
    const consumo = new Consumo(new Date(), new Date());
    const paquete = new Paquete(1000, 500, 200, 30);
    expect(() => consumo.aplicarA(paquete)).toThrow("Método abstracto");
  });

  test('ConsumoInternet debe heredar de Consumo', () => {
    const consumo = new ConsumoInternet(500, new Date(), new Date());
    expect(consumo instanceof ConsumoInternet).toBe(true);
    expect(consumo instanceof Consumo).toBe(true);
  });

  test('ConsumoInternet debe descontar datos del paquete', () => {
    const paquete = new Paquete(1000, 500, 200, 30);
    const consumo = new ConsumoInternet(300, new Date(), new Date());
    consumo.aplicarA(paquete);
    expect(paquete.datosDisponibles).toBe(700);
  });

  test('ConsumoLlamada debe heredar de Consumo', () => {
    const consumo = new ConsumoLlamada(50, new Date(), new Date());
    expect(consumo instanceof ConsumoLlamada).toBe(true);
    expect(consumo instanceof Consumo).toBe(true);
  });

  test('ConsumoLlamada debe descontar minutos del paquete', () => {
    const paquete = new Paquete(1000, 500, 200, 30);
    const consumo = new ConsumoLlamada(50, new Date(), new Date());
    consumo.aplicarA(paquete);
    expect(paquete.minutosDisponibles).toBe(450);
  });

  test('debe permitir aplicar varios consumos seguidos', () => {
    const paquete = new Paquete(1000, 500, 200, 30);
    const consumo1 = new ConsumoInternet(200, new Date(), new Date());
    const consumo2 = new ConsumoLlamada(100, new Date(), new Date());
    
    consumo1.aplicarA(paquete);
    consumo2.aplicarA(paquete);
    
    expect(paquete.datosDisponibles).toBe(800);
    expect(paquete.minutosDisponibles).toBe(400);
  });
});




// ===== TESTS DE CLIENTE =====
describe('Cliente', () => {
  
  test('debe crear un cliente correctamente', () => {
    const cuenta = new CuentaPrepaga(500);
    const cliente = new Cliente("Juan Pérez", "1234567890", cuenta);
    expect(cliente.nombre).toBe("Juan Pérez");
    expect(cliente.numeroLinea).toBe("1234567890");
    expect(cliente.paqueteActual.estaActivo()).toBe(false);
    });

  test('debe comprar un paquete exitosamente', () => {
    const cuenta = new CuentaPrepaga(500);
    const cliente = new Cliente("Juan", "123", cuenta);
    const paquete = new Paquete(2500, 1000, 400, 30);
    
    cliente.comprarPaquete(paquete);
    
    expect(cliente.paqueteActual).toBe(paquete);
    expect(cuenta.saldo).toBe(100);
    expect(paquete.fechaActivacion).not.toBeNull();
  });

  test('debe lanzar error si no hay saldo suficiente', () => {
    const cuenta = new CuentaPrepaga(100);
    const cliente = new Cliente("Juan", "123", cuenta);
    const paquete = new Paquete(2500, 1000, 400, 30);
    
    expect(() => cliente.comprarPaquete(paquete)).toThrow("Saldo insuficiente");
  });

  test('debe lanzar error si ya tiene un paquete activo', () => {
    const cuenta = new CuentaPrepaga(1000);
    const cliente = new Cliente("Juan", "123", cuenta);
    const paquete1 = new Paquete(2500, 1000, 400, 30);
    const paquete2 = new Paquete(1000, 500, 200, 7);
    
    cliente.comprarPaquete(paquete1);
    expect(() => cliente.comprarPaquete(paquete2)).toThrow("Ya tiene un paquete activo");
  });

  test('debe realizar un consumo exitosamente', () => {
    const cuenta = new CuentaPrepaga(500);
    const cliente = new Cliente("Juan", "123", cuenta);
    const paquete = new Paquete(2500, 1000, 400, 30);
    cliente.comprarPaquete(paquete);
    
    const consumo = new ConsumoInternet(500, new Date(), new Date());
    cliente.realizarConsumo(consumo);
    
    expect(paquete.datosDisponibles).toBe(2000);
    expect(cliente.historialConsumos.length).toBe(1);
  });

  test('debe lanzar error si no tiene paquete activo', () => {
    const cuenta = new CuentaPrepaga(500);
    const cliente = new Cliente("Juan", "123", cuenta);
    const consumo = new ConsumoInternet(500, new Date(), new Date());
    
    expect(() => cliente.realizarConsumo(consumo)).toThrow("No tiene un paquete activo");
  });

  test('debe habilitar y deshabilitar renovación automática', () => {
    const cuenta = new CuentaPrepaga(500);
    const cliente = new Cliente("Juan", "123", cuenta);
    
    expect(cliente.renovacionAutomatica).toBe(false);
    cliente.habilitarRenovacionAutomatica();
    expect(cliente.renovacionAutomatica).toBe(true);
    cliente.deshabilitarRenovacionAutomatica();
    expect(cliente.renovacionAutomatica).toBe(false);
  });

  test('debe retornar datos y minutos disponibles', () => {
    const cuenta = new CuentaPrepaga(500);
    const cliente = new Cliente("Juan", "123", cuenta);
    
    expect(cliente.obtenerDatosDisponibles()).toBe(0);
    expect(cliente.obtenerMinutosDisponibles()).toBe(0);
    
    const paquete = new Paquete(2500, 1000, 400, 30);
    cliente.comprarPaquete(paquete);
    
    expect(cliente.obtenerDatosDisponibles()).toBe(2500);
    expect(cliente.obtenerMinutosDisponibles()).toBe(1000);
  });
});