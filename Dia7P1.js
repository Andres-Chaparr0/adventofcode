const readline = require('readline');

// Crear interfaz para leer entrada desde la terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Enter values (type 'done' to finish):");

const inputLines = [];
const dictionary = {};
rl.on('line', (line) => {
    if (line.toLowerCase() === 'done') {
        rl.close();
        return;
    }

    if (line.includes(':')) {
        const [key, values] = line.split(':').map(part => part.trim());
        const numericKey = Number(key); // Asegurarse de que la clave sea un número
        dictionary[numericKey] = values.split(' ').map(Number); // Convertir valores a números

    } else {
        console.log("Invalid input. Please enter values in the correct format (e.g., 190: 10 19).");
    }
});

rl.on('close', () => {

    console.log("\nResultado:", dictionary);
});

// Función para convertir las líneas de entrada en un diccionario
function ResolverP1(dictionary) {
    let resultado = 0;
    for (const key in dictionary) {
        const values = dictionary[key];
        for (const value of values) {
            resultado += value;
        }
    }
    return dictionary;
}