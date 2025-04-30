let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let circleX = 400;
let circleY = 300;
let circleAng = Math.random() * 2*Math.PI;
let circleSpeed = 10;
let circleSpeedX = Math.cos(circleAng) * circleSpeed;
let circleSpeedY = Math.sin(circleAng) * circleSpeed;

let shipX = 400;
let shipY = 500;
let shipW = 64;
let shipH = 64;

let player = new Image();
player.src = "spaceship.png";

let bullet = new Image();
bullet.src = "bullet.png";
let bulletW = 16;
let bulletH = 32;
let bulletSpeed = 5;
let bulletRadius = bulletW;

let bullets = [[400, 400], [400, -100], [400, -100]];

let bg = new Image();
bg.src = "bg_space_seamless.png";

let bgW = canvas.width;
let bgH = canvas.height;
let bgY1 = 0;
let bgY2 = bgH;
let bgSpeed = 1;

let enemy = new Image();
enemy.src = "saucer2.png";
let enW = 64;
let enH = 32;
let enemies = [[100, 100, 1], [700, 100, -1]];
let enSpeed = 0.5;
let enRadius = enW;

canvas.addEventListener(
    "mousemove",
    function(event)
    {
        let rect = canvas.getBoundingClientRect();
        shipX = event.clientX - rect.left - shipW/2;
        //shipY = event.clientY - rect.top - shipH/2;
        //console.log(`Coords: ${x}, ${y}`);   
    }
);

canvas.addEventListener(
    "click",
    function(event)
    {
        for (let i = 0; i < bullets.length; i++)
        {
            if (bullets[i][1] <= -bulletH/2)
            {
                bullets[i][0] = shipX + shipW/2;
                bullets[i][1] = shipY;
                break;
            }
        }
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

function drawBullet()
{
    for (let i = 0; i < bullets.length; i++)
    {
        bullets[i][1] -= bulletSpeed;
        ctx.beginPath();
        ctx.drawImage(
            bullet,
            bullets[i][0] - bulletW/2,
            bullets[i][1] - bulletH/2,
            bulletW,
            bulletH
        );
    }
}

function drawBG()
{
    bgY1 += bgSpeed;
    bgY2 += bgSpeed;

    if (bgY1 >= bgH)
    {
        bgY1 -= 2*bgH;
    }
    if (bgY2 >= bgH)
    {
        bgY2 -= 2*bgH;
    }

    ctx.beginPath();
    ctx.drawImage(
        bg,
        0,
        bgY1,
        bgW,
        bgH
    );

    ctx.beginPath();
    ctx.drawImage(
        bg,
        0,
        bgY2,
        bgW,
        bgH
    );
}

function drawEnemy()
{
    ctx.beginPath();
    for (let i = 0; i < enemies.length; i++)
    {
        ctx.drawImage(
            enemy,
            enemies[i][0],
            enemies[i][1],
            enW,
            enH
        );
    }
}

function collisionBulletEnemy(b, e)
{
    let colidiu = false;
    let dist = Math.sqrt(
                (b[0] - e[0])**2 + 
                (b[1] - e[1])**2
            );
    let somaDosRaios = enRadius + bulletRadius;
    
    if(dist < somaDosRaios)
    {
        colidiu = true;
    }
    
    return colidiu;
}

function collisionTest()
{
    for (let i = 0; i < bullets.length; i++)
    {
        for(let j = 0; j < enemies.length; j++)
        {
            if (collisionBulletEnemy(bullets[i], enemies[j]))
            {
                bullets[i][1] = -500;
            }
        }
    }
}

function jogar()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBG();

    ctx.beginPath();
    ctx.drawImage(player, shipX, shipY, shipW, shipH);

    drawBullet();
    drawEnemy();
    collisionTest();
}

setInterval(jogar, 1000/60);


