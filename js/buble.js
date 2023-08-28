const canvasBuble = document.getElementById("canvas-buble");
const ctxE = canvasBuble.getContext('2d');

let cwE = window.innerWidth;
let chE = window.innerHeight;

canvasBuble.width = cwE;
canvasBuble.height = 800;

let espumaArray = [];
let conteoEspuma = 300;
let frameE = 0;

class Espuma {
    constructor(x,y,size,direccionx, direcciony, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.direccionx = direccionx;
        this.direcciony = direcciony;
        this.color = color;
    }

    draw() {
        ctxE.beginPath();
        ctxE.fillStyle = this.color;
        ctxE.arc (this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctxE.fill();
        ctxE.closePath();

        this.x += this.direccionx;
        this.y += this.direcciony;

        if (this.x + this.size > cwE || this.x - this.size < 0) {
            this.direccionx = -this.direcciony;
        }

        if (this.y + this.size > chE || this.y - this.size < 0) {
            this.direcciony = - this.direcciony;
        }
    }
}

let updateE = () => {
    let x = Math.random() * cwE;
    let y = Math.random() * chE;
    let size = Math.random() * 20;
    let direccionx = (Math.random() * 0.8) - 0.2;
    let direcciony = (Math.random() * 0.8) - 0.2;
    let color = 'white';

    if(espumaArray.length < conteoEspuma) {
        let espuma = new Espuma(x, y, size, direccionx,direcciony,color);
        espuma.draw();
        espumaArray.push(espuma);
    }

    ctxE.clearRect(0,0,cwE,chE);

    for (let i = 0 ; i < espumaArray.length ; i++) {
        espumaArray[i].draw();
    }

    requestAnimationFrame(updateE);
    frameE++;
}

updateE();