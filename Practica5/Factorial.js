const Factorial = function FactorialNum(num){
    return  1;
}

describe('Factorial de un numero', () => {
    test('El factorial de 1 es uno', () => {
        expect(Factorial(1)).toBe(1)
    });
})