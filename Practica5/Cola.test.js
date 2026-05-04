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