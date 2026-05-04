// const numeroARomano = (n) => {
//     if (n >= 1000) return 'M' + numeroARomano(n - 1000);
//     if (n >= 900) return 'CM' + numeroARomano(n - 900);
//     if (n >= 500) return 'D' + numeroARomano(n - 500);
//     if (n <= 3)
//         return 'I'.repeat(n)
//     if (n >= 5 && n <= 8)
//         return 'V' + numeroARomano(n - 5);
//     if (n >= 10 && n < 40)
//         return 'X' + numeroARomano(n - 10);
//     if (n >= 50 && n < 90)
//         return 'L' + numeroARomano(n - 50);
//     if (n >= 100 && n < 400)
//         return 'C' + numeroARomano(n - 100);
//     if (n >= 500 && n < 900)
//         return 'D' + numeroARomano(n - 500);
//     if (n >= 1000)
//         return 'M' + numeroARomano(n - 1000);
//     if (n === 4 || n === 9) {
//         return numeroARomano(1) + numeroARomano(n + 1);
//     }
//     if (n >= 40 && n < 50 || n >= 90 && n < 100) {
//         const a = Math.trunc(n / 10) * 10;
//         return numeroARomano(10) + numeroARomano(a + 10) + numeroARomano(n - a)
//     }
//     if (n >= 400 && n < 500) {
//         const a = Math.trunc(n / 100) * 100;
//         return numeroARomano(100) + numeroARomano(a + 100) + numeroARomano(n - a);
//     }
// }

//Reescribiendo los ifs y como fui haciendo en las primeras lineas, podemos terminar en algo asi.
const numeroARomano = (n) => {
    if (n >= 1000) return 'M' + numeroARomano(n - 1000);
    if (n >= 900) return 'CM' + numeroARomano(n - 900);
    if (n >= 500) return 'D' + numeroARomano(n - 500);
    if (n >= 400) return 'CD' + numeroARomano(n - 400);
    if (n >= 100) return 'C' + numeroARomano(n - 100);
    if (n >= 90) return 'XC' + numeroARomano(n - 90);
    if (n >= 50) return  'L' + numeroARomano(n - 50);
    if (n >= 40) return 'XL' + numeroARomano(n - 40);
    if (n >= 10) return 'X' + numeroARomano(n - 10);
    if (n === 9) return 'IX';
    if (n >= 5) return 'V' + numeroARomano(n - 5);
    if (n === 4) return 'IV';
    return 'I'.repeat(n);
}

describe('numero a romano', () => {
    test('numero 1 a romano es I', () => {
        expect(numeroARomano(1)).toBe('I')
    });

    test('numero 2 a romano es II', () => {
        expect(numeroARomano(2)).toBe('II')
    });

    test('numero 4 a romano es IV', () => {
        expect(numeroARomano(4)).toBe('IV')
    })

    test('numero 5 a romano es V', () => {
        expect(numeroARomano(5)).toBe('V')
    })
    test('numero 6 a romano es VI', () => {
        expect(numeroARomano(6)).toBe('VI')
    })
    test('numero 7 a romano es VII', () => {
        expect(numeroARomano(7)).toBe('VII')
    })
    test('numero 8 a romano es VII', () => {
        expect(numeroARomano(8)).toBe('VIII')
    })
    test('numero 9 a romano es IX', () => {
        expect(numeroARomano(9)).toBe('IX')
    })
    test('numero 10 a romano es X', () => {
        expect(numeroARomano(10)).toBe('X')
    })
    test('numero 11 a romano es XI', () => {
        expect(numeroARomano(11)).toBe('XI')
    })

    test('numero 14 a romano es XIV', () => {
        expect(numeroARomano(14)).toBe('XIV')
    })

    test('numero 15 a romano es XV', () => {
        expect(numeroARomano(15)).toBe('XV')
    })
    test('numero 16 a romano es XV', () => {
        expect(numeroARomano(16)).toBe('XVI')
    })
    test('numero 20 a romano es XX', () => {
        expect(numeroARomano(20)).toBe('XX')
    })
    test('numero 19 a romano es XIX', () => {
        expect(numeroARomano(19)).toBe('XIX')
    })

    test('numero 25 a romano es XV', () => {
        expect(numeroARomano(25)).toBe('XXV')
    })

    test('numero 40 a romano es XL', () => {
        expect(numeroARomano(40)).toBe('XL')
    })
    test('numero 44 a romano es XLIV', () => {
        expect(numeroARomano(44)).toBe('XLIV')
    })

    test('numero 50 a romano es L', () => {
        expect(numeroARomano(50)).toBe('L')
    })

    test('numero 57 a romano es LVII', () => {
        expect(numeroARomano(57)).toBe('LVII')
    })

    test('numero 78 a romano es LXXVIII', () => {
        expect(numeroARomano(78)).toBe('LXXVIII')
    })

    test('numero 90 a romano es XC', () => {
        expect(numeroARomano(90)).toBe('XC')
    })

    test('numero 102 a romano es CII', () => {
        expect(numeroARomano(102)).toBe('CII')
    })

    test('numero 440 a romano es CDXL', () => {
        expect(numeroARomano(440)).toBe('CDXL')
    })
    test('numero 525 a romano es CDXL', () => {
        expect(numeroARomano(525)).toBe('DXXV')
    })
    test('numero 900 a romano es CM', () => {
        expect(numeroARomano(900)).toBe('CM')
    })
    test('numero 1350 a romano es MCCCL', () => {
        expect(numeroARomano(1350)).toBe('MCCCL')
    })
})