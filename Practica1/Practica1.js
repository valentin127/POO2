/*const { number } = require("yargs");

const cuadrado_de = num => num*num;; //1
const creaResta = (x)=>
     function(y){
        return y-x;
    };

const n = 5;
const m = 10;
const resta = creaResta(n);
resta(m);
console.log(resta(m)); //2 la respuesta es que hace m - n;
*/
/*
const { emitKeypressEvents } = require("readline");

const repeat = (functionToRepeat,n)=> {
    const results = [];
    if (n>0){
        results.push(...repeat(functionToRepeat, n-1));
        results.push(functionToRepeat(n));
    }
    return results;
}
const printString = n => "Execution number:" + n ;
console.log(repeat(printString,4));
*/
/*
const pilotos = ["Verstappen", "Hamilton", "Russell", "Sainz", "Perez", "Leclerc", "Norris",
"Alonso", "Ocon", "Vettel"];

const Russell = pilotos.indexOf("Russell");//2 4)a)
console.log(Russell);
const sexro = pilotos[5];//4) B)
console.log(sexro);
const listado = pilotos.filter(palabra => palabra.includes("a") || palabra.includes("A"));
console.log(listado);//4)c)
const arreglo = ["Russell", "Bottas","Perez"];
const nuevo1 = arreglo.map(piloto => pilotos.includes(piloto));
console.log(nuevo1);
pilotos.splice(4,1)[0];
pilotos.splice(1,0,"Perez");
console.log(pilotos);   // Ej 4 completo
*/

/*
const howManyTimesAppear = (array,n) =>  {
    i=0;
    array.forEach(element => {
    if(element === n){
        i++;
    }
});
return array.filter(element => element===n).length;   //Ej 5 Completo
};


const array = [3, 6, 9, 3, 1, 5, 2, 10];
console.log("howManyTimesAppears(array,3): " + howManyTimesAppear(array,3));
console.log("howManyTimesAppears(array,5): " + howManyTimesAppear(array,5));
console.log("howManyTimesAppears(array,7): " + howManyTimesAppear(array,7));
*/

/*
const Array1 = [ 4, 8, 2, 13, 20];
const Array2 = [ 4, 8, 2, -5, 20];  //Ejercicio 6.


const sumarMinimo = array =>  {
    
    let minimo = array[0]; 
    array.forEach(num => { if (num < minimo) { //Este es el metodo para buscar el menor valor con un forEach. 
      minimo = num; 
    }
    });
    

    
    let minimo = array.reduce((acc, num) => num < acc ? num : acc, array[0]); //forma de buscar un minimo con reduce.
    
    
    let nuevoArray = array.map(num => num + minimo);

    return nuevoArray;
}


console.log(sumarMinimo([4, 8, 2, 13, 20])); // [6, 10, 4, 15, 22]
console.log(sumarMinimo([4, 8, 2, -5, 20])); // [-1, 3, -3, -10, 15]

*/


//Ejercicio 7
/*
const personas = ["Lionel Messi", "Rodrigo Depaul", "Emiliano Martinez", "Angel Dimaria",
"Soledad Jaimes", "Yamila Rodriguez", "Florencia Bonsegundo"];


// 1) Ordenar por nombre
const ordenadasPorNombre = [...personas].sort((a, b) => {
    const nombreA = a.slice(0, a.indexOf(" "));
    const nombreB = b.slice(0, b.indexOf(" "));
    var comparacion = 0;
    if (nombreA < nombreB) comparacion = -1;
    if (nombreA > nombreB) comparacion = 1;
    return comparacion;
});

// 2) Invertir "Nombre Apellido" → "Apellido Nombre"
const invertidas = personas.map(p => {
    const espacio = p.indexOf(" ");
    const nombre = p.slice(0, espacio);
    const apellido = p.slice(espacio + 1);
    return apellido + " " + nombre;
});

// 3) Ordenar por apellido
const ordenadasPorApellido = [...invertidas].sort((a, b) => {
    const apellidoA = a.slice(0, a.indexOf(" "));
    const apellidoB = b.slice(0, b.indexOf(" "));
    var comparacion = 0;
    if (apellidoA < apellidoB) comparacion = -1;
    if (apellidoA > apellidoB) comparacion = 1;
    return comparacion;
});

console.log("Por nombre:", ordenadasPorNombre);
console.log("Invertidas:", invertidas);
console.log("Por apellido:", ordenadasPorApellido);
*/