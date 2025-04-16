let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let circleX = 400;
let circleY = 300;
let circleAng = Math.random() * 2*Math.PI;
let circleSpeed = 10;
let circleSpeedX = Math.cos(circleAng) * circleSpeed;
let circleSpeedY = Math.sin(circleAng) * circleSpeed;

canvas.addEventListener(
    "mousemove",
    function(event)
    {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        console.log(`Coords: ${x}, ${y}`);
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 2*Math.PI);
        ctx.fill();
        
    }
);

function desenha()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    circleX += circleSpeedX;
    circleY += circleSpeedY;

    if (circleX <= 0 || circleX >= canvas.width)
    {
        circleX -= circleSpeedX;
        circleSpeedX *= -1;
    }

    if (circleY <= 0 || circleY >= canvas.height)
    {
        circleY -= circleSpeedY;
        circleSpeedY *= -1;
    }

    ctx.beginPath();
    ctx.arc(circleX, circleY, 20, 0, 2*Math.PI);
    ctx.fill();
}

setInterval(desenha, 1000/60);


