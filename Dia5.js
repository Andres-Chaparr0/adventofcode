const readline = require('readline');

// Crear interfaz para leer entrada desde la terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Enter values (type 'done' to finish):");

let diccionario = {};
let listaDeListas = [];


rl.on('line', (line) => {
    if (line.toLowerCase() === 'done') {
        rl.close();
        return;
    }

    if (line.includes('|')) {
        // Parte de X|Y
        const [x, y] = line.split('|').map(Number);
        if (!diccionario[x]) {
            diccionario[x] = [];
        }
        diccionario[x].push(y);
    } else if (line.includes(',')) {
        // Parte de las listas separadas por comas
        const numeros = line.split(',').map(Number);
        listaDeListas.push(numeros);
    } else {
        console.log("Invalid input. Please enter values in the correct format.");
    }
});

rl.on('close', () => {
    //console.log("\nDiccionario (X -> lista de Y):", diccionario);
    //console.log("\nLista de listas:", listaDeListas);
    console.log("\nResultado Problema 1:", Problema(listaDeListas, diccionario)[0]);
    console.log("\nResultado Problema 2:", Problema2(Problema(listaDeListas, diccionario)[1], diccionario));
});


function Problema(listaDeListas, diccionario){
    let resultado = 0;
    let ListaIncorrectos =[];
    for (let i=0; i<listaDeListas.length; i++){
        let Lista = listaDeListas[i];
        let llave = Valdiacion(Lista, diccionario)[0];
        if (llave === true){
            const indiceCentral = Math.floor(Lista.length / 2);
            resultado += Lista[indiceCentral];
        }
        else{
            ListaIncorrectos.push(Lista);
        }
    }

    let final = [resultado, ListaIncorrectos];
    return final;
}

function Problema2(listaIncorrectos, diccionario){
    let resultado = 0;
    let NuevaLista = [];
    for (let i=0; i<listaIncorrectos.length; i++){
        let Lista = listaIncorrectos[i];
        var llave = Valdiacion(Lista, diccionario);

        while (llave[0] === false){

            let valor1 = llave[1];
            let valor2 = llave[2];
            let indice1 = Lista.indexOf(valor1);
            let indice2 = Lista.indexOf(valor2);

            // Verifica que ambos valores existan en la lista
            if (indice1 !== -1 && indice2 !== -1) {
                // Intercambia los valores
                let temp = Lista[indice1];
                Lista[indice1] = Lista[indice2];
                Lista[indice2] = temp;
            }
            llave = Valdiacion(Lista, diccionario);
        }
        resultado += Lista[Math.floor(Lista.length / 2)];
    }
    return resultado;
}

function Valdiacion(Lista, diccinario){
    let llave = true;
    let final = []
    for (let j = 0; j<Lista.length; j++){
        let valor = Lista[Lista.length - j - 1];
        if(j != Lista.length - 1){
            for (let k = 0; k<Lista.length - j - 1; k++){
                let valor2 = Lista[k];
                if (diccionario[valor]){
                    if ( diccionario[valor].includes(valor2)){
                        llave = false;
                        final.push(llave);
                        final.push(valor);
                        final.push(valor2);
                        break;
                    }
                }
            }
        }
        if (llave === false){
            return final;
        }
    } 
    final.push(llave);
    return final;
}