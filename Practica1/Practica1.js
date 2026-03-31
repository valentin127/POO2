//Ej 1
/*const cuadrado_de = num => num*num; 
console.log(cuadrado_de(5));//5
console.log(cuadrado_de(6));//6
console.log(cuadrado_de(7));//7
console.log(cuadrado_de(8));//8
*/

//EJ 2
/*const creaResta = x => (y) => y-x;
const Resta = creaResta(3); //x=3 x es n e y es m y el resultado da m-n.
console.log(Resta(10)); // y=10 -> 10 - 3 = 7 
*/

//Ej3
/*
const repeat = (functionToRepeat, n) => Array.from({ length: n }, (_, i) => functionToRepeat(i + 1));
const printString = (n) => ('Excution number: ',n);
console.log(repeat(printString, 4));
*/

//Ej 4
/*
const pilotos = ["Verstappen", "Hamilton", "Russell", "Sainz", "Perez", "Leclerc", "Alonso", "Ocon", "Vettel"];

// a. Posición de llegada de Russell (índice + 1)
const posRussell = pilotos.indexOf("Russell") + 1;
console.log(posRussell); // 3

// b. ¿Quién llegó sexto?
const sexto = pilotos[5];
console.log(sexto);

// c. Pilotos que contengan la letra "a"
const conA = pilotos.filter(piloto => piloto.includes("a"));
console.log(conA);

// d. true si está en el listado original, false si no
const consulta = ["Russell", "Bottas", "Perez"];
const estaEnLista = consulta.map(piloto => pilotos.includes(piloto));
console.log(estaEnLista); 

// e. Perez no llegó quinto sino segundo → moverlo a índice 1
const pilotosMod = pilotos.filter(p => p !== "Perez");
pilotosMod.splice(1, 0, "Perez");
console.log(pilotosMod);
*/

//Ej5 
/*
const array = [3, 6, 9, 3, 1, 5, 2, 10];

const howManyTimesAppears = (arr, num) => arr.filter(n => n === num).length;
console.log(howManyTimesAppears(array, 3)); // 2
console.log(howManyTimesAppears(array, 5)); // 1
console.log(howManyTimesAppears(array, 7)); // 0
*/

//Ej 6
/*
const Array1 = [4, 8, 2, 13, 20];
const Array2 = [4, 8, 2, -5, 20];

const sumarMinimo = (arr) => {
const minimo = Math.min(...arr);
    return arr.map(n => n + minimo);
};

console.log(sumarMinimo(Array1)); // [6, 10, 4, 15, 22]
console.log(sumarMinimo(Array2)); // [-1, 3, -3, -10, 15]

//5 con reduce e if.
const SumarMinimo = (arr) => {
    const minimo = arr.reduce((min, n) => {
        if (n < min) {
            return n;
        } else {
            return min;
        }
    }, arr[0]);
    return arr.map(n => n + minimo);
};

console.log(SumarMinimo(Array1)); // [6, 10, 4, 15, 22]
console.log(SumarMinimo(Array2)); // [-1, 3, -3, -10, 15]
*/
//EJ 7
/*
const personas = ["Lionel Messi", "Rodrigo Depaul", "Emiliano Martinez", "Angel Di Maria", "Soledad Jaimes", "Yamila Rodriguez", "Florencia Bonsegundo"];

// 1) Ordenar alfabéticamente por nombre
const porNombre = [...personas].sort((a, b) => {
    const nombreA = a.split(" ")[0];
    const nombreB = b.split(" ")[0];
    if (nombreA < nombreB) { return -1; }
    else { return 1; }
});
console.log(porNombre);

// 2) Invertir de "Nombre Apellido" a "Apellido Nombre"
const invertidos = personas.map(persona => {
    const partes = persona.split(" ");
    return partes[1] + " " + partes[0];
});
console.log(invertidos);

// 3) Ordenar la nueva lista alfabéticamente por apellido
const porApellido = [...invertidos].sort((a, b) => {
    const apellidoA = a.split(" ")[0];
    const apellidoB = b.split(" ")[0];
    if (apellidoA < apellidoB) { return -1; }
    else { return 1; }
});
console.log(porApellido);
*/