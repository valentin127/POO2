const Peso = require("./peso.js")

class Carga{
    constructor(id,monto){
        this.identificador=id;
        this.monto=monto;
        this.estado = new Pendiente();
    }

    correspondeA(tarjeta){
        return tarjeta.tenesId(this.identificador);
    }

    cargar(tarjeta){
        tarjeta.acreditarSaldo(this.saldoPendiente());
        this.estado = new Acreditado();
    }

    saldoPendiente(){
        return this.estado.saldoPendiente(this.monto);
    }

    
    saldoAcreditado(){
        return  this.estado.saldoAcreditado(this.monto);
    }
}

class Pendiente{
    saldoPendiente(monto){
        return monto;
    }

    saldoAcreditado(monto){
        return new Peso(0);
    }
}

class Acreditado{
    constructor(monto){
        this.monto = monto;
    }

    saldoPendiente(monto){
        return new Peso(0);
    }

    saldoAcreditado(monto){
        return monto;
    }
}

module.exports = Carga;