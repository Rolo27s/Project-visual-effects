const canvasMatrix = document.getElementById("canvas-matrix");
const ctxM = canvasMatrix.getContext('2d');

let cwM = window.innerWidth;
let chM = window.innerHeight;

canvasMatrix.width = cwM;
canvasMatrix.height = 800;

const characters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '!', '@', '#', '$', '.', '?', '*', '~', '&', '&&', '||', '©'
];

let codigoArray = [];
let conteoCodigo = 200;
let fontSize = 15;
let numeroColumna = cwM / fontSize;
let frameM = 0;

class Matrix {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx) {
        this.valor = characters[Math.floor(Math.random() * (characters.length - 1))].toUpperCase();
        this.velocidad = Math.random() * fontSize * 3 / 4 + fontSize * 3 / 4;

        ctx.fillStyle = "rgba(0, 255, 0)";
        ctx.font = fontSize + "px san-serif";
        ctx.fillText(this.valor, this.x, this.y);

        this.y += this.velocidad;
        
        if (this.y > chM) {
            this.x = Math.floor((Math.random() * numeroColumna) * fontSize);
            this.y = 0;
            this.velocidad = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
        }
    }
}

let update = () => {
    if (codigoArray.length < conteoCodigo) {
        let matrix = new Matrix(Math.floor(Math.random() * numeroColumna) * fontSize, 0);
        codigoArray.push(matrix);
    }

    ctxM.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctxM.fillRect(0,0, cwM, 800);

    for (let i = 0 ; i < codigoArray.length && frameM % 2 == 0; i++) {
        codigoArray[i].draw(ctxM);
    }

    requestAnimationFrame(update)
    frameM++;
}

update();

// Se puede implementar que en un click que se haga, se genere un efecto de pequeña explosión en la zona.