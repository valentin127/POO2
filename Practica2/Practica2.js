const Sube = function (){
    this.idActual = 1;
    this.SALDO_MINIMO = -600;
    this.identificador = Sube.idActual;
    Sube.idActual += 1;
    this.saldo = 0;
    

    this.obtenerSaldo = function(){
        return this.saldo;
    }

    this.pagarViaje = function(costoDeViaje){
        if(this.saldo - costoDeViaje < Sube.SALDO_MINIMO){
            throw new Error("Saldo insuficiente");
        } 

        this.saldo -= costoDeViaje;
        return this.saldo;
    }

    this.cargarSaldo = function(monto){
        this.saldo += monto;
    }

    this.tenesId = function(identificador){
        return this.identificador === identificador;
    }
}



const SistemaCentralizado = function(){
    this.cargas = [];

    this.cargarTarjeta = function(id, monto){
        if(monto < 0){
            throw new Error("El monto a cargar debe ser positivo!")
        }

        this.cargas.push(new Carga(id, monto));
    }

    this.acreditarSaldo = function(tarjetaSube){
        this.cargas.forEach((carga) => {
            carga.acreditar(tarjetaSube)   //ACREDITA TODAS LAS CARGAS PENDIENTES DE UNA TARJETA
        });
    }

    this.cantidadRecargasPendientes = function(){
        return this.cargas.filter(carga => carga.esPendiente()).length; //CAMBIAR CARGA.ESTADO.ESPENDIENTE() YA QUE ROMPE ENCAPSULACION
    }

    saldosPendientes(){
        return this.cargas.reduce((total,carga) => carga.esPendiente() ? total + carga.obtenerMonto() : total, 0);
        // CAMBIAR CARGA.MONTO YA QUE ROMPE ENCAPSULACION
    }

    saldosAcreditados(){
        return this.cargas.reduce((total,carga) => carga.esAcreditado() ? total + carga.obtenerMonto() : total, 0);
        // CAMBIAR CARGA.MONTO YA QUE ROMPE ENCAPSULACION
    }
}

class Acreditado{
    cargarSaldo(tarjetaSube, monto){
        return; 
    }

    esPendiente(){
        return false;
    }

    esAcreditado(){
        return !this.esPendiente(); //APROVECHAR QUE YA TENGO ARMADO EL ESPENDIENTE() !!
    }
}

class Pendiente{
    cargarSaldo(tarjetaSube, monto){
       tarjetaSube.cargarSaldo(monto)
    }

    esPendiente(){
        return true;
    }

    esAcreditado(){
        return !this.esPendiente(); //APROVECHAR QUE YA TENGO ARMADO EL ESPENDIENTE() !!
    }
}


class Carga{
    constructor(id, monto){
        this.monto = monto;
        this.id = id;
        this.estado = new Pendiente();
        this.acreditado= false; 
    }

    mostrarEstado(){
        return this.estado;
    }

    obtenerMonto(){
        return this.monto;
    }

    esPendiente(){
        return this.estado.esPendiente();
    }

    esAcreditado(){
        return this.estado.esAcreditado();
    }

    acreditar(tarjetaSube){
        if(this.correspondeA(tarjetaSube)){
            this.estado.cargarSaldo(tarjetaSube, this.monto);
            this.estado = new Acreditado();
        }
    }

    correspondeA(tarjetaSube){
        return tarjetaSube.tenesId(this.id); //VALIDA QUE LA CARGA SOLO SE ACREDITE A LA TARJETA CUYO ID SEA IGUAL AL DE LA CARGA
    }

    //le pido a la sube que me diga si tiene ese id -> esto logra MANTENER EL ENCAPSULAMIENTO. 
    //La carga no tiene porque saber como se implementa la funcion

    /*
    mensajeProfe(num){
        return num + this.monto
    }
    */ 
};