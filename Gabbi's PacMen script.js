var pos = 0;
var pacArray = [
    ['PacMan1.png', 'PacMan2.png'], 
    ['PacMan3.png', 'PacMan4.png'],
];
const pacMen = [];

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}

// PacMan Factory
function makePac() {
    let velocity = setToRandom(10);
    let position = setToRandom(550);
    let direction = parseInt(Math.random()*2);
    let focus = parseInt(Math.random()*2);

    if (direction === 1) {
        velocity.x = -velocity.x;
    }

    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = pacArray[direction][focus];
    newimg.width = 100;
    newimg.style.left = position.x + "px";
    newimg.style.top = position.y + "px";


    game.appendChild(newimg);
    return {
        position,
        velocity,
        newimg,
        direction,
        focus
    };
}

function update() {
    pacMen.forEach((item) => {
        checkCollisions(item);
        item.focus = (item.focus + 1) % 2;
        item.newimg.src = pacArray[item.direction][item.focus];

        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
    });
    setTimeout(update, 60);
}

function checkCollisions(item) {
    if (item.position.x + item.velocity.x + item.newimg.width >= window.innerWidth ||
        item.position.x + item.velocity.x <= 0
        ) { 
        item.velocity.x = -item.velocity.x;
        item.direction = (item.direction + 1) % 2;
        }
    if (item.position.y + item.velocity.y + item.newimg.height >= window.innerHeight ||
        item.position.y + item.velocity.y <= 0
        ) { 
        item.velocity.y = -item.velocity.y;
        }
}

function makeOne() {
    pacMen.push(makePac()); // This will add a new PacMan
}

// Project collab with MIT + Women Cohort 2023 classmates: Jackeline Park, Jennifer Eldridge, Gabriela Gomez, Candace Ryan, Helga Sallaku, Jesica Hurstle & Sarah Zimmerman.