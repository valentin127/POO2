// empleado.js
function Empleado(nombre) {
    this.nombre  = nombre;
    this.francos = [];
}

Empleado.prototype.agregarFranco = function(franco) {
    this.francos.push(franco);
};
//Patron composite. 
Empleado.prototype.esFranco = function(fecha) {
    return this.francos.some(franco => franco.esFranco(fecha));
};

module.exports = Empleado;