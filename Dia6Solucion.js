
const readline = require('readline');

// Crear interfaz para leer entrada desde la terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Enter values (type 'done' to finish):");

const text = [];


rl.on('line', (line) => {
    if (line.toLowerCase() === 'done') {
        rl.close();
        return;
    }

    if (line.includes('.')) {

        const numeros = line;
        text.push(numeros);
    } else {
        console.log("Invalid input. Please enter values in the correct format.");
    }
});

rl.on('close', () => {


    let guard = {
        x: -1,
        y: -1,
        speedX: 0,
        speedY: -1
    }
    let obstacles = []
    let visited = []
    let calculating = true
    
    //Encontrar al guardia -> starting position
    //Guardar todos los obstaculos
    for (let y = 0; y < text.length; y++) {
        for (let x = 0; x < text[y].length; x++) {
            if (text[y][x] === '.') {
    
            } else if (text[y][x] === '#') {
                obstacles.push({
                    x: x,
                    y: y
                })
            } else if (text[y][x] === '^') {
                guard.x = x
                guard.y = y
            }
        }
    }
    
    //console.log(guard, obstacles)
    
    //Comenzar a iterar hasta que salga
    //bucle
    while (calculating) {
        //Checker si ha chocado -> modificamos la velocidad
        if (obstacles.some((obs) => obs.x === guard.x + guard.speedX && obs.y === guard.y + guard.speedY)) {
            //girar al guardia
            if (guard.speedX === 0 && guard.speedY === -1) {
                //giro de arriba a derecha
                guard.speedX = 1
                guard.speedY = 0
            } else if (guard.speedX === 1 && guard.speedY === 0) {
                //giro de derecha a abajo
                guard.speedX = 0
                guard.speedY = 1
            } else if (guard.speedX === 0 && guard.speedY === 1) {
                //Giro de abajo a izq
                guard.speedX = -1
                guard.speedY = 0
            } else if (guard.speedX === -1 && guard.speedY === 0) {
                guard.speedX = 0
                guard.speedY = -1
            }
        }
    
        //avanzar guardia
        guard.x += guard.speedX
        guard.y += guard.speedY
    
        //Checkear si ha salido -> termina el juego
        if (guard.x < 0 || guard.y < 0 || guard.x > text[0].length || guard.y > text.length) {
            calculating = false
            console.log('Solucion: ', visited.length)
        } else {
            //Checkear si ya hemos visitado esa posición -> guardarla
            if (!visited.some((v) => v.x === guard.x && v.y === guard.y)) {
                visited.push({
                    x: guard.x + 0,
                    y: guard.y + 0
                })
            }
        }
    }
});

