//Ejercicio 1
/**
Escribe un programa en JavaScript que dada una calificación numérica entre 0 y
10 y la transforma en calificación alfabética, escribiendo el resultado.
 */

let nota = 6;
let mensajeMota = "La nota es invalida";

if (nota >= 0 && nota < 3) {
    mensajeMota = "deficiente";
} else if (nota >= 3 && nota < 5) {
    mensajeMota = "insuficiente";
} else if (nota >= 5 && nota < 6) {
    mensajeMota = "bien";
} else if (nota >= 6 && nota < 9) {
    mensajeMota = "notable";
} else if (nota <= 10) {
    mensajeMota = "sobresaliente";
}

console.log("Con un " + nota + " la calificación es: " + mensajeMota);

//Ejercicio 2
/**
Escribe un programa en JavaScript que dada una hora expresada en horas,
minutos y segundos que nos calcula y escribe la hora, minutos y segundos que
serán, transcurrido un segundo.
 */

let horas = 21;
let minutos = 23;
let segundos = 59;

segundos++;

if (segundos == 60) {
    segundos = 0;
    minutos++;
    if (minutos == 60) {
        minutos = 0;
        horas++;
        if (horas == 24) {
            horas = 0;
        }
    }
}

console.log("La hora es: " + horas + ":" + minutos + ":" + segundos);

//Ejercicio 3
/**
Escribe un programa en JavaScript para crear el juego de “Piedra, papel o
tijera”, el programa debe de seguir la siguiente estructura.
 */

console.log("--- Piedra, Papel o Tijera --- ");
console.log(" - Piedra = P");
console.log(" - Papel = L");
console.log(" - Tijera = T");
console.log("- Elije una de las tres opciones -");

function jugadaPC() {
    let opcione = ["P", "L", "T"];
    let jugada = Math.floor(Math.random() * 3);

    return opcione[jugada];
}

function jugadaUS() {
    let opcione = ["P", "L", "T"];
    let jugada = Math.floor(Math.random() * 3);

    return opcione[jugada];
}

let Usuario = jugadaUS();

let PC = jugadaPC();

let ganador;

if (Usuario == PC) {
    ganador = "Empate";
} else if (
    (Usuario == "P" && PC == "T") ||
    (Usuario == "L" && PC == "P") ||
    (Usuario == "T" && PC == "L")
) {
    ganador = "Has ganado";
} else if (Usuario == "P" || Usuario == "L" || Usuario == "T") {
    ganador = "Ha gandado la PC";
} else {
    ganador = "has ingresado una opcion invalida";
}

console.log("Tu jugada: " + Usuario);
console.log("Jugada de la PC: " + PC);
1;
console.log("Ganador: " + ganador);

//Ejercicio 4
/**
Crea un programa que cree un array con 100 números reales aleatorios entre
0.0 y 1.0, utilizando Math.random(). Define una función que dado un array y
un numero muestre cuántos valores del array son igual o superiores al
número dado.
 */

let numerosArray = [];

for (let i = 0; i < 100; i++) {
    numerosArray[i] = Math.random();
}

function contarValores(array, numero) {
    let contador = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] >= numero) {
            contador++;
        }
    }
    return contador;
}

let numero = 0.8;

let resultado = contarValores(numerosArray, numero);

console.log("Array generado: ");
console.log(numerosArray);
console.log("Numero dado: " + numero);
console.log(
    "valores que son iguales o superiores a " + numero + ": " + resultado,
);

//Ejercicio 5
/**
Desarrollar un programa que cree un array con 100 números reales aleatorios
entre 0.0 y 10.0, utilizando Math.random(), nos calcule la media, mediana, la
suma, el máximo, el mínimo y el valor más repetido.
 */

let numerosArray2 = [];

for (let i = 0; i < 100; i++) {
    numerosArray2.push(Number((Math.random() * 10).toFixed(2)));
}

numerosArray2.sort((a, b) => a - b);

console.log(numerosArray2);

let min = numerosArray2[0];
console.log("El minimo es:" + min);

let max = numerosArray2[numerosArray2.length - 1];
console.log("El maximo es:" + max);

let suma = numerosArray2.reduce((acumulador, valor) => acumulador + valor, 0);
console.log("La suma es:" + suma);

let media = suma / numerosArray2.length;
console.log("La media es:" + media);

function calcularMediana(numerosArray2) {
    numerosArray2.sort((a, b) => a - b);
    let mitad = Math.floor(numerosArray2.length / 2);

    if (numerosArray2.length % 2 === 0) {
        return (numerosArray2[mitad - 1] + numerosArray2[mitad]) / 2;
    } else {
        return numerosArray2[mitad];
    }
}

let mediana = calcularMediana(numerosArray2);
console.log("La mediana es:" + mediana);

function calcularMasRepetido(numerosArray2) {
    let frecuencias = {};
    let maxFrecuencia = 0;
    let valorMasRep = null;

    numerosArray2.forEach((valor) => {
        frecuencias[valor] = (frecuencias[valor] || 0) + 1;
        if (frecuencias[valor] > maxFrecuencia) {
            maxFrecuencia = frecuencias[valor];
            valorMasRep = valor;
        }
    });
    return valorMasRep;
}

let valorRep = calcularMasRepetido(numerosArray2);
console.log("El valor mas repetitivo es:" + valorRep);
