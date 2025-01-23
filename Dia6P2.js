//784 too low

const readline = require('readline');

// Crear interfaz para leer entrada desde la terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Enter values (type 'done' to finish):");

const Matriz = [];


rl.on('line', (line) => {
    if (line.toLowerCase() === 'done') {
        rl.close();
        return;
    }

    if (line.includes('.')) {
        // Parte de X|Y
        const numeros = line.split('');
        Matriz.push(numeros);

    } else {
        console.log("Invalid input. Please enter values in the correct format.");
    }
});

rl.on('close', () => {

    console.log("\nResultado Problema 1:", Problema(Matriz));
});

function Problema(Matriz){
    const Matriz2 = JSON.parse(JSON.stringify(Matriz));
    var resultado = 0;
    var x = 0;
    var y = 0;
    var x2 = 0;
    var y2 = 0;
    for (let i = 0; i < Matriz.length; i ++){
        for (let j = 0; j < Matriz[i].length; j++){
            if(Matriz[i][j] === '^'){
                var posicionInicial = [i, j];
            }
        }
    }
    let contador = 0;
    for (let i = 0; i < Matriz.length; i ++){
        for (let j = 0; j < Matriz[i].length; j++){
            x = posicionInicial[0];
            y = posicionInicial[1];
            contador += 1;
            
            if (i === 6 && j === 3){
                console.log(contador);
            }
            
            const nuevaMatriz = Matriz.map(arr => arr.slice());



            let direccion = 1;
            Matriz[i][j] = '#';
            nuevaMatriz[x][y] = [direccion];
            let llave = true;

            while (llave == true){
                
                if (direccion === 1){
                    x2 = x - 1;
                    y2 = y;
                }
                if (direccion === 2){
                    x2 = x;
                    y2 = y + 1;
                }
                if (direccion === 3){
                    x2 = x + 1;
                    y2 = y;
                }
                if (direccion === 4){
                    x2 = x;
                    y2 = y - 1;
                }
                if (x === Matriz.length - 1 || y === Matriz[x].length - 1|| x == 0 || y == 0){
                    llave = false;
                }
                else {
                    direccion = validacionDireccionSiguiente(direccion, x2, y2, x ,y);
                    x = validacionPosicionSiguiente(direccion, x, y)[0];
                    y = validacionPosicionSiguiente(direccion, x, y)[1];

                    
                    if (Array.isArray(nuevaMatriz[x][y])) {
                        if (nuevaMatriz[x][y].includes(direccion)) {
                            resultado += 1
                            llave = false;
                        }
                        else{
                            nuevaMatriz[x][y].push(direccion);
                        }
                    } else {
                        nuevaMatriz[x][y] = [direccion];
                    }
                    
                    
                }
            }
            Matriz[i][j] = Matriz2[i][j];
        }
    }
    // console.log("\nNueva Matriz:");
    
    return resultado;
}
function validacionPosicionSiguiente(direccion, x, y){
    let lista = [];
    if (direccion === 1){
        x2 = x - 1;
        y2 = y;
    }
    if (direccion === 2){
        x2 = x;
        y2 = y + 1;
    }
    if (direccion === 3){
        x2 = x + 1;
        y2 = y;
    }
    if (direccion === 4){
        x2 = x;
        y2 = y - 1;
    } 
    lista.push(x2);
    lista.push(y2);
    return lista;
}

function validacionDireccionSiguiente(direccion, x2, y2, x, y){
    siguiente = Matriz[x2][y2];
    let direccion2 = direccion;
    let direccion3 = direccion;
    let x3 = x;
    let y3 = y;
    if (siguiente === '.'|| siguiente === 'X' || siguiente === '^'){
        direccion2 = direccion;
    }
    else{
        while(siguiente === '#'){
            if (direccion2 === 1){
                direccion3 = 2;
            }
            if (direccion2 === 2){
                direccion3 = 3;
            }
            if (direccion2 === 3){
                direccion3 = 4;
            }
            if (direccion2 === 4){
                direccion3 = 1;
            }
            direccion2 = direccion3;
            x3 = validacionPosicionSiguiente(direccion2, x3, y3)[0];
            y3 = validacionPosicionSiguiente(direccion2, x3, y3)[1];
            siguiente = Matriz[x3][y3];
        }
    }

    return direccion2;
}