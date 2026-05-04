// const factorialDe = (n) => {
//     if (n === 4) return 24
//     if (n === 3) return 6
//     if (n === 2) return 2;
//     return 1;
// }
// //paso 1: reemplazo 24 por 4 * 6 y 6 por 3 * 2
// const factorialDe = (n) => {
//     if (n === 4) return 4 * 6;
//     if (n === 3) return 3 * 2
//     if (n === 2) return 2;
//     return 1;
// }
// //paso 2: como se que 6 es factorial de 3, y que 2 es factorial de 2 ->
// const factorialDe = (n) => {
//     if (n === 4) return 4 * factorialDe(3);
//     if (n === 3) return 3 * factorialDe(2)
//     if (n === 2) return 2;
//     return 1;
// }
//
// //paso 3: Busco duplicaciones, si n es 4 entonces 3 se puede escribir como n - 1
// // Idem con el 2 cuando n es 3
// const factorialDe = (n) => {
//     if (n === 4) return 4 * factorialDe(n - 1);
//     if (n === 3) return 3 * factorialDe(n - 1)
//     if (n === 2) return 2;
//     return 1;
// }
//
// // paso 4: Genero duplicaciones entr eel 3 y 4. Si n es 3 o 4 -> return n * factorialDe(n-1)
// const factorialDe = (n) => {
//     if (n === 4) return n * factorialDe(n - 1);
//     if (n === 3) return n * factorialDe(n - 1)
//     if (n === 2) return 2;
//     return 1;
// }
//
// //paso 5: Y el caso de 2? Podemos reescribirlo como:
// const factorialDe = (n) => {
//     if (n === 4) return n * factorialDe(n - 1);
//     if (n === 3) return n * factorialDe(n - 1)
//     if (n === 2) return n * factorialDe(n - 1);
//     return 1;
// }

//paso 6: Tengo 3 ifs iguales, asumimos que funciona igual para n>=2
const factorialDe = (n) => {
    if (n >= 2) return n * factorialDe(n - 1);
    return 1;
}

describe("factorialDe()", () => {
    test('factorial de 0 es 1', () => {
        expect(factorialDe(0)).toBe(1)
    })

    test('factorial de 1 es 1', () => {
        expect(factorialDe(1)).toBe(1)
    })

    test('factorial de 2 es 2', () => {
        expect(factorialDe(2)).toBe(2)
    })

    test('factorial de 3 es 6', () => {
        expect(factorialDe(3)).toBe(6)
    })

    test('factorial de 4 es 24', () => {
        expect(factorialDe(4)).toBe(24)
    })
})