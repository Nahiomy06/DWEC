"use strict";
// Entrenamiento 2
/**
 * Escribe un programa en TypeScript que reciba un DNI (8 números) y calcule la
letra del DNI.
*/
const generarLetraDNI = (num) => {
    let letrasDNI = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X',
        'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    const index = parseInt(num) % 23;
    return num + letrasDNI[index];
};
console.log(generarLetraDNI("5558116"));
