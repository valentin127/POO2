// Constructor base para Franco
function Franco() {}
Franco.prototype.obtenerFechas = function() {
    return [];
};

// Constructor para Franco en un día particular de un año
function FrancoDiaParticular(dia, mes, ano) {
    this.fecha = new Date(ano, mes - 1, dia);
}
FrancoDiaParticular.prototype = Object.create(Franco.prototype);
FrancoDiaParticular.prototype.obtenerFechas = function() {
    return [this.fecha];
};

// Constructor para Franco todos los años en un mismo día y mes
function FrancoAnual(dia, mes) {
    this.dia = dia;
    this.mes = mes;
}
FrancoAnual.prototype = Object.create(Franco.prototype);
FrancoAnual.prototype.obtenerFechas = function(anoInicio, anoFin) {
    const fechas = [];
    for (let ano = anoInicio; ano <= anoFin; ano++) {
        fechas.push(new Date(ano, this.mes - 1, this.dia));
    }
    return fechas;
};

// Constructor para Franco en un día de la semana
function FrancoDiaSemana(diaSemana) {
    this.diaSemana = diaSemana; // 0: Domingo, 1: Lunes, ..., 6: Sábado
}
FrancoDiaSemana.prototype = Object.create(Franco.prototype);
FrancoDiaSemana.prototype.obtenerFechas = function(anoInicio, anoFin) {
    const fechas = [];
    for (let ano = anoInicio; ano <= anoFin; ano++) {
        for (let mes = 0; mes < 12; mes++) {
            for (let dia = 1; dia <= 31; dia++) {
                const fecha = new Date(ano, mes, dia);
                if (fecha.getDay() === this.diaSemana && fecha.getMonth() === mes) {
                    fechas.push(fecha);
                }
            }
        }
    }
    return fechas;
};

// Constructor para Franco en un día de la semana de un año en particular
function FrancoDiaSemanaAno(diaSemana, ano) {
    this.diaSemana = diaSemana;
    this.ano = ano;
}
FrancoDiaSemanaAno.prototype = Object.create(Franco.prototype);
FrancoDiaSemanaAno.prototype.obtenerFechas = function() {
    const fechas = [];
    for (let mes = 0; mes < 12; mes++) {
        for (let dia = 1; dia <= 31; dia++) {
            const fecha = new Date(this.ano, mes, dia);
            if (fecha.getDay() === this.diaSemana && fecha.getMonth() === mes) {
                fechas.push(fecha);
            }
        }
    }
    return fechas;
};

// Constructor para Franco en un día de la semana de un mes en particular
function FrancoDiaSemanaMes(diaSemana, mes, ano) {
    this.diaSemana = diaSemana;
    this.mes = mes;
    this.ano = ano;
}
FrancoDiaSemanaMes.prototype = Object.create(Franco.prototype);
FrancoDiaSemanaMes.prototype.obtenerFechas = function() {
    const fechas = [];
    for (let dia = 1; dia <= 31; dia++) {
        const fecha = new Date(this.ano, this.mes - 1, dia);
        if (fecha.getDay() === this.diaSemana && fecha.getMonth() === this.mes - 1) {
            fechas.push(fecha);
        }
    }
    return fechas;
};

// Constructor para Franco el mismo día de cada mes de un año en particular
function FrancoDiaMensual(dia, ano) {
    this.dia = dia;
    this.ano = ano;
}
FrancoDiaMensual.prototype = Object.create(Franco.prototype);
FrancoDiaMensual.prototype.obtenerFechas = function() {
    const fechas = [];
    for (let mes = 0; mes < 12; mes++) {
        fechas.push(new Date(this.ano, mes, this.dia));
    }
    return fechas;
};

// Constructor para Franco un mes completo de un año en particular
function FrancoMesCompleto(mes, ano) {
    this.mes = mes;
    this.ano = ano;
}
FrancoMesCompleto.prototype = Object.create(Franco.prototype);
FrancoMesCompleto.prototype.obtenerFechas = function() {
    const fechas = [];
    const diasEnMes = new Date(this.ano, this.mes, 0).getDate();
    for (let dia = 1; dia <= diasEnMes; dia++) {
        fechas.push(new Date(this.ano, this.mes - 1, dia));
    }
    return fechas;
};

// Ejemplo de uso
const franco1 = new FrancoDiaParticular(25, 12, 2025);
console.log("Día particular:", franco1.obtenerFechas());

const franco2 = new FrancoAnual(1, 1);
console.log("Todos los años:", franco2.obtenerFechas(2023, 2025));

const franco3 = new FrancoDiaSemana(1); // Lunes
console.log("Día de la semana:", franco3.obtenerFechas(2025, 2025));

const franco4 = new FrancoDiaSemanaAno(1, 2025); // Lunes en 2025
console.log("Día de la semana en un año:", franco4.obtenerFechas());

const franco5 = new FrancoDiaSemanaMes(1, 6, 2025); // Lunes en junio 2025
console.log("Día de la semana en un mes:", franco5.obtenerFechas());

const franco6 = new FrancoDiaMensual(15, 2025); // Día 15 de cada mes
console.log("Día de cada mes:", franco6.obtenerFechas());

const franco7 = new FrancoMesCompleto(7, 2025); // Julio 2025
console.log("Mes completo:", franco7.obtenerFechas());