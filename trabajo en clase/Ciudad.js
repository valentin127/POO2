class Edificio {
    constructor(caracteristicas = []) {
        this.fila = 0;
        this.columna = 0;
        this.caracteristicas = caracteristicas;
        this.identificador = "E";
    }

    setPosicion(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }

    getSimbolo() {
    return this.caracteristicas.length === 0? this.identificador: this.caracteristicas.length === 1? this.identificador.toLowerCase(): this.identificador.toLowerCase() + "*";
}

}

class Hospital extends Edificio {
    constructor(especialidad, caracteristicas = []) {
        super(caracteristicas);
        this.especialidad = especialidad;
        this.identificador = "H";
    }
}

class Casa extends Edificio {
    constructor(numHabitaciones, caracteristicas = []) {
        super(caracteristicas);
        this.numHabitaciones = numHabitaciones;
        this.identificador = "C";
    }
}

class Ciudad {
    constructor(nombre) {
    this.nombre = nombre;
    this.filas = 6;
    this.columnas = 6;
    this.mapa = [...Array(this.filas)].map(() => [...Array(this.columnas)].map(() => null) 
    );}
    
    agregarEdificio(edificio, fila, columna) {
        if (fila < 0 || fila >= this.filas || columna < 0 || columna >= this.columnas) {
            throw new Error("Posición fuera del mapa");
        }
        edificio.setPosicion(fila, columna); 
        this.mapa[fila][columna] = edificio;
    }
    
    mostrarMapa() {
    this.mapa.forEach(fila => {
        let linea = fila.map(celda => (celda ? celda.getSimbolo() : ".")).reduce((acc, elem) => acc === "" ? elem : acc + " " + elem, "");
        console.log(linea);
    });} 
}



//Ejemplo para ejecutar el main
let ciudad = new Ciudad("Ciudad Inteligente");
let hospital1 = new Hospital("Cardiología");
let casa1 = new Casa(3);
let casa2 = new Casa(2, ["wifi"]);
let casa3 = new Casa(4, ["wifi", "panel solar"]); 
let hospital2 = new Hospital("Pediatría", ["panel solar", "wifi"]);

ciudad.agregarEdificio(hospital1, 0, 0);   
ciudad.agregarEdificio(casa1, 1, 3);      
ciudad.agregarEdificio(casa2, 2, 2);       
ciudad.agregarEdificio(casa3, 3, 4);       
ciudad.agregarEdificio(hospital2, 4, 1);   


ciudad.mostrarMapa();

console.log('Hospital común: "H"');
console.log('Casa común: "C"');
console.log('Casa con 1 característica: "c"');
console.log('Casa con 2 características: "c*"');
console.log('Hospital con 2 características: "h*"'); 