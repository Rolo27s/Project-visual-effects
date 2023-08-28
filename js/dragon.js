const canvasDragon = document.getElementById("canvas-dragon");
const ctxD = canvasDragon.getContext('2d');

let cwD = window.innerWidth;
let chD = window.innerHeight;

canvasDragon.width = cwD;
canvasDragon.height = 800;

ctxD.strokeStyle = "black";
ctxD.lineWidth = 7;
ctxD.shadowOffsetX = 10;
ctxD.shadowOffsetY = 10;
ctxD.shadowBlur = 20;
ctxD.shadowColor = "black";

let color = 0;
let angle = 0;
let drawing = false;

class Dragon {
    constructor(x, y, radius, inset, n) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.inset = inset;
        this.n = n;
    }

    draw() {
        ctxD.beginPath();
        ctxD.fillStyle = 'hsl(' + color +', 100%, 50%)';
        ctxD.save();
        ctxD.translate(this.x, this.y);
        ctxD.moveTo(0, 0 - this.radius);

        for ( let i = 0 ; i < this.n ; i++ ) {
            ctxD.rotate(Math.PI / this.n);
            ctxD.lineTo(0, 0 - (this.radius * this.inset));
            ctxD.rotate(Math.PI / this.n);
            ctxD.lineTo(0, 0 - this.radius);
        }

        ctxD.restore();
        ctxD.closePath();
        ctxD.stroke();
        ctxD.fill();
    }
}

function drawDragon(e) {
    if ( drawing ) {
        canvasDragon.style.cursor = "none";

        ctxD.save();
        ctxD.translate(e.clientX, e.clientY);
        ctxD.rotate(angle);
        color = (color + 3) % 360;
        angle = (angle + 0.9) % (Math.PI * 2);
        // color += 3;
        // angle += 0.9;

        let dragon = new Dragon(0, 0, 75, 0.5, 10);
        dragon.draw();
        ctxD.restore();
    }
}

canvasDragon.addEventListener('mousemove', drawDragon);
canvasDragon.addEventListener('touchmove', (e) => drawDragon(e.touches[0]));

canvasDragon.addEventListener('mousedown', () => {
    drawing = true;
});

canvasDragon.addEventListener('mouseup', () => {
    drawing = false;
    canvasDragon.style.cursor = "auto";
});

canvasDragon.addEventListener('touchstart', () => {
    drawing = true;
});

canvasDragon.addEventListener('touchend', () => {
    drawing = false;
    canvasDragon.style.cursor = "auto";
});

const clearDragonTail = document.querySelector(".btn-clear");
clearDragonTail.addEventListener('click', () => {
    ctxD.clearRect(0, 0, canvasDragon.width, canvasDragon.height);
});

// Se puede mejorar la experiencia de usuario agregando un menu lateral que modifique el tamaño de grosor de dibujo