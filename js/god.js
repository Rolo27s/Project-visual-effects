const canvasGod = document.getElementById("canvas-god");
const ctxG = canvasGod.getContext('2d');

let cwG = window.innerWidth;
let chG = window.innerHeight;

canvasGod.width = cwG;
canvasGod.height = 800;

let heliceArray = [];
let conteo = 22;
let frameG = 0;

let gradient = ctxG.createLinearGradient(0,0,cwG, chG,cwG, chG);
gradient.addColorStop(0, "red");
gradient.addColorStop(0.2, "yellow");
gradient.addColorStop(0.4, "green");
gradient.addColorStop(0.6, "cyan");
gradient.addColorStop(0.8, "blue");
gradient.addColorStop(1, "magenta");

class Helice {
    constructor(radio, paso, posicion, size) {
        this.radio = radio;
        this.paso = paso;
        this.posicion = posicion;
        this.size = size;
    }

    draw() {
        ctxG.beginPath();
        ctxG.fillStyle = gradient;
        ctxG.arc(Math.cos(this.posicion) * this.radio + cwG / 2,
                Math.sin(this.posicion) * this.radio + chG / 2, 
                this.size, 0, Math.PI * 2, false);
        ctxG.fill();
        ctxG.closePath();
        
        this.posicion += this.paso;
    }
}

let updateG = ()=> {
    let radio = Math.random() * cwG;
    let paso = (Math.random() * 0.002) + 1;
    let posicion = Math.random() * (Math.PI * 2);
    let size = (Math.random() * 8) + 1;

    if (heliceArray.length < conteo) {
        let helice = new Helice(radio, paso, posicion, size);
        helice.draw();
        heliceArray.push(helice);
    }

    ctxG.fillStyle = "rgba(0,0,0,0.05)";
    ctxG.fillRect(0,0,cwG,chG);

    heliceArray.map(helice => {
        helice.draw();
    });

    requestAnimationFrame(updateG);
    frameG++;
}

updateG();

canvasGod.addEventListener('click', updateG);