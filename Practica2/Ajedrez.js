class Pieza {
  constructor(nombre, color, simbolo) {
    this.nombre = nombre;
    this.color = color;
    this.simbolo = simbolo;
    this.fila = null;
    this.columna = null;
  }

  colocar(fila, columna) {
    this.fila = fila;
    this.columna = columna;
  }


  movimientosValidos(tablero) {
    return [];
  }

  descripcionMovimiento() {
    return `${this.nombre} se mueve de forma genérica`;
  }

  estaEnTablero(fila, col) {
    return fila >= 0 && fila < 8 && col >= 0 && col < 8;
  }

  toString() {
    return `${this.color} - ${this.nombre} en (${this.fila}, ${this.columna})`;
  }
}



class Torre extends Pieza {
  constructor(color) {
    super("Torre", color, color === "blanco" ? "♖" : "♜");
  }

  descripcionMovimiento() {
    return `La Torre se mueve en línea recta (horizontal o vertical) cualquier número de casillas`;
  }

  movimientosValidos(tablero) {
    const movimientos = [];
    const direcciones = [[1,0],[-1,0],[0,1],[0,-1]];

    for (const [df, dc] of direcciones) {
      let f = this.fila + df;
      let c = this.columna + dc;
      while (this.estaEnTablero(f, c)) {
        const ocupante = tablero[f][c];
        if (!ocupante) {
          movimientos.push([f, c]);
        } else {
          if (ocupante.color !== this.color) movimientos.push([f, c]);
          break;
        }
        f += df;
        c += dc;
      }
    }
    return movimientos;
  }
}


class Alfil extends Pieza {
  constructor(color) {
    super("Alfil", color, color === "blanco" ? "♗" : "♝");
  }

  descripcionMovimiento() {
    return `El Alfil se mueve en diagonal cualquier número de casillas`;
  }

  movimientosValidos(tablero) {
    const movimientos = [];
    const direcciones = [[1,1],[1,-1],[-1,1],[-1,-1]];

    for (const [df, dc] of direcciones) {
      let f = this.fila + df;
      let c = this.columna + dc;
      while (this.estaEnTablero(f, c)) {
        const ocupante = tablero[f][c];
        if (!ocupante) {
          movimientos.push([f, c]);
        } else {
          if (ocupante.color !== this.color) movimientos.push([f, c]);
          break;
        }
        f += df;
        c += dc;
      }
    }
    return movimientos;
  }
}



class Caballo extends Pieza {
  constructor(color) {
    super("Caballo", color, color === "blanco" ? "♘" : "♞");
  }

  descripcionMovimiento() {
    return `El Caballo se mueve en "L": 2 casillas en una dirección y 1 en perpendicular`;
  }

  movimientosValidos(tablero) {
    const movimientos = [];
    const saltos = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];

    for (const [df, dc] of saltos) {
      const f = this.fila + df;
      const c = this.columna + dc;
      if (this.estaEnTablero(f, c)) {
        const ocupante = tablero[f][c];
        if (!ocupante || ocupante.color !== this.color) {
          movimientos.push([f, c]);
        }
      }
    }
    return movimientos;
  }
}



class Reina extends Pieza {
  constructor(color) {
    super("Reina", color, color === "blanco" ? "♕" : "♛");
  }

  descripcionMovimiento() {
    return `La Reina se mueve en cualquier dirección cualquier número de casillas`;
  }

  movimientosValidos(tablero) {
    const movimientos = [];
    const direcciones = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];

    for (const [df, dc] of direcciones) {
      let f = this.fila + df;
      let c = this.columna + dc;
      while (this.estaEnTablero(f, c)) {
        const ocupante = tablero[f][c];
        if (!ocupante) {
          movimientos.push([f, c]);
        } else {
          if (ocupante.color !== this.color) movimientos.push([f, c]);
          break;
        }
        f += df;
        c += dc;
      }
    }
    return movimientos;
  }
}


class Rey extends Pieza {
  constructor(color) {
    super("Rey", color, color === "blanco" ? "♔" : "♚");
  }

  descripcionMovimiento() {
    return `El Rey se mueve una sola casilla en cualquier dirección`;
  }

  movimientosValidos(tablero) {
    const movimientos = [];
    const direcciones = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];

    for (const [df, dc] of direcciones) {
      const f = this.fila + df;
      const c = this.columna + dc;
      if (this.estaEnTablero(f, c)) {
        const ocupante = tablero[f][c];
        if (!ocupante || ocupante.color !== this.color) {
          movimientos.push([f, c]);
        }
      }
    }
    return movimientos;
  }
}



class Peon extends Pieza {
  constructor(color) {
    super("Peón", color, color === "blanco" ? "♙" : "♟");
  }

  descripcionMovimiento() {
    return `El Peón avanza una casilla (o dos desde la posición inicial) y captura en diagonal`;
  }

  movimientosValidos(tablero) {
    const movimientos = [];
    const dir = this.color === "blanco" ? -1 : 1;
    const filaInicial = this.color === "blanco" ? 6 : 1;


    if (this.estaEnTablero(this.fila + dir, this.columna) &&
        !tablero[this.fila + dir][this.columna]) {
      movimientos.push([this.fila + dir, this.columna]);


      if (this.fila === filaInicial &&
          !tablero[this.fila + dir * 2][this.columna]) {
        movimientos.push([this.fila + dir * 2, this.columna]);
      }
    }


    for (const dc of [-1, 1]) {
      const f = this.fila + dir;
      const c = this.columna + dc;
      if (this.estaEnTablero(f, c) && tablero[f][c] &&
          tablero[f][c].color !== this.color) {
        movimientos.push([f, c]);
      }
    }

    return movimientos;
  }
}


const tablero = Array.from({ length: 8 }, () => Array(8).fill(null));

const piezas = [
  new Torre("blanco"),
  new Alfil("blanco"),
  new Caballo("blanco"),
  new Reina("blanco"),
  new Rey("blanco"),
  new Peon("blanco"),
];


piezas[0].colocar(4, 4);
piezas[1].colocar(3, 3);
piezas[2].colocar(2, 2);
piezas[3].colocar(5, 5);
piezas[4].colocar(0, 4);
piezas[5].colocar(6, 3);

for (const pieza of piezas) {
  tablero[pieza.fila][pieza.columna] = pieza;
}

console.log("=== Ejercicio Polimorfismo - Movimientos de Ajedrez ===\n");
for (const pieza of piezas) {
  console.log(`${pieza.simbolo} ${pieza.descripcionMovimiento()}`);
  const movs = pieza.movimientosValidos(tablero);
  console.log(`  Movimientos posibles desde (${pieza.fila},${pieza.columna}): ${movs.length} casillas`);
  console.log();
}