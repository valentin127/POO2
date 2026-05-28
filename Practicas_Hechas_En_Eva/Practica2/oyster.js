const Tarjeta = require("./tarjeta");

class TarjetaOyster extends Tarjeta {
    convertir(monto){
        return monto.aLibras();
    }
}

module.exports = TarjetaOyster