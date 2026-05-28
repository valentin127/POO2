const Carga = require("./Carga.js")

class SistemaCentralizado{
    constructor(){
        this.cargas = [];
    }

    acreditarSaldo(tarjetaSube){
        /*
        const cargasNoAcreditadas = this.cargas.filter(carga => 
            !carga.correspondeA(tarjetaSube)
        );
        this.cargas.filter(carga => 
            carga.correspondeA(tarjetaSube)
        ).forEach(carga => carga.cargar(tarjetaSube));
        this.cargas = cargasNoAcreditadas;
*/
        this.cargas
            .filter(carga => carga.correspondeA(tarjetaSube))
            .forEach(carga => carga.cargar(tarjetaSube));
    }

    cargarTarjeta(id, monto){
        if(monto < 0)
            throw new Error("Monto negativo");
        const carga=new Carga(id,monto);
        this.cargas.push(carga);
    }

    montoTotalAcreditado(){
        let total = 0;
        return this.cargas.reduce((total, carga) => total + carga.saldoAcreditado().aPesos(), 0);
    }

    montoTotalPendiente(){
        let total = 0;
        return  this.cargas.reduce((total, carga) => total + carga.saldoPendiente().aPesos(), 0);
    }
}

module.exports = SistemaCentralizado