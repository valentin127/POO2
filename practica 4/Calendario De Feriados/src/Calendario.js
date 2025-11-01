const Calendario = function (listaDeEmpleados) {
  // listaDeEmpleados: [Empleado, Empleado, ...]
  this.empleados = listaDeEmpleados;

  this.estaDeFranco = function(nombreEmpleado, fecha) {
    const empleado = this.empleados.find(
      (e) => e.getNombre() === nombreEmpleado
    ); // 1. Busco el empleado por nombre

    if (!empleado) {
      throw new Error('Empleado no encontrado.');
    }// 2. Si no existe ese empleado en el calendario, devuelvo false
        
    return empleado.tieneFranco(fecha); // 3. Delego en el empleado la consulta de si tiene franco esa fecha. (Agrego responsabilidad a empleado)
  };
};

module.exports = { Calendario };
