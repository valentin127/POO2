const Empleado = function (nombre, francos) {
  this.nombre = nombre;
  this.francos = francos; 

  this.tieneFranco = function(fecha) {
    return this.francos.some(franco => franco.esFranco(fecha));
  };

  this.getNombre = function() {
    return this.nombre;
  };
};

module.exports = { Empleado };
