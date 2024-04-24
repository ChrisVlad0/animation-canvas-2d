const canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

//Obtiene las dimensianes de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

//El canvas tiene las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;


canvas.style.background = '#ff0'; //Color del fondo

class Circle{
    constructor(x, y, radius, color, text, speed){
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;

        this.speed = speed;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context){
        context.beginPath();

        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius,  0 , Math.PI*2, false);
        context.stroke();
        context.closePath();
    }

    update(context){        
        this.draw(context);

        //Si el círculo supera el margen derecho entonces se mueve a la izquierda
        if((this.posX + this.radius)>window_width){
            this.dx = -this.dx;
        }

        //Si el círculo supera el margen izquierdo entonces se mueve a la derecha
        if((this.posX - this.radius)<0){
            this.dx = -this.dx;
        }

        //Si el círculo supera el margen superior entonces se mueve hacia abajo
        if((this.posY - this.radius)<0){
            this.dy = -this.dy;
        }

        //Si el círculo supera el margen inferior entonces se mueve hacia arriba
        if((this.posY + this.radius)>window_height){
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

let arrayCircle = [];

for (let i = 0; i < 3; i++) {
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let randomRadius = Math.floor(Math.random() * 100 + 30);
    let randomColor = `rgb(${Math.floor(Math.random() * 256)}, 
                           ${Math.floor(Math.random() * 256)},
                           ${Math.floor(Math.random() * 256)})`;
    let text = "Círculo " + (i + 1);
    let randomSpeed = Math.random() * 5;

    let newCircle = new Circle(randomX, randomY, randomRadius, randomColor, text, randomSpeed);
    
    arrayCircle.push(newCircle);
}

let updateCircle = function () {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);
    arrayCircle.forEach(circle => {
        circle.update(ctx);
    });
};

updateCircle();