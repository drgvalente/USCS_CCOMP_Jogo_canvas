let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let score = 0;
let scoreX = 50;
let scoreY = 50;
let scoreColor = "yellow";

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
let bulletRadius = bulletW/2;

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
let enHP = 3;
let enemies = [ [100, 100, 1, enHP], [700, 100, -1, enHP] ];
let enSpeed = 2;
let enRadius = enW/2;
let enSpawnCD = 3000; // tempo em ms para aparecer outro inimigo
let enSpawnTimer = 0;

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
    enSpawnTimer += 1000/60;
    if (enSpawnTimer >= enSpawnCD)
    {
        enSpawnTimer = 0;
        let x = Math.random() * canvas.width;
        let y = Math.random() * 100 + 50
        let dir = Math.random() * 2 - 1
        let e = [x, y, dir, enHP];
        enemies.push(e);
    }
    ctx.beginPath();
    for (let i = 0; i < enemies.length; i++)
    {
        if (enemies[i][0] < canvas.width && enemies[i][0] > 0)
            enemies[i][0] += enSpeed * enemies[i][2];
        else
        {
            enemies[i][2] *= -1;
            enemies[i][0] += enSpeed * enemies[i][2];
        }
            
        ctx.drawImage(
            enemy,
            enemies[i][0] - enW/2,
            enemies[i][1] - enH/2,
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
            if ( collisionBulletEnemy(bullets[i], enemies[j]) )
            {
                bullets[i][1] = -500; // tira a bullet da tela
                enemies[j][3] -= 1; // tira uma "vida" do inimigo
                if (enemies[j][3] <= 0)
                {
                    enemies.splice(j, 1);
                    score += 1;
                }
                    
            }
        }
    }
}

function drawScore()
{
    ctx.beginPath();
    ctx.fillStyle = scoreColor;
    ctx.font = "50px Arial";
    ctx.fillText(score, scoreX, scoreY);
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
    drawScore();
}

setInterval(jogar, 1000/60);


