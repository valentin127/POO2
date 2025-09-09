const valores = [1,1,2,1];

function masrepetido(arreglo){
    return arreglo.reduce((acumulador, valorActual) => {
        const resultadoValorActual = arreglo.filter((elemento) => elemento === valorActual).length;
        const resultadoAcumulador = arreglo.filter((elemento) => elemento === acumulador).length;
        return resultadoValorActual > resultadoAcumulador ? valorActual : acumulador;
    }, 0);
}

console.log(masRepetido(valores)); //1

//Ejemplo de decir que elemento se repite mas veces en un array.