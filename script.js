const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
let playerBottom = 0;
let isJumping = false;

document.addEventListener('keydown', event => {
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    let jumpInterval = setInterval(() => {
        if (playerBottom < 150) {
            playerBottom += 20;
            player.style.bottom = playerBottom + 'px';
        } else {
            clearInterval(jumpInterval);
            let fallInterval = setInterval(() => {
                if (playerBottom > 0) {
                    playerBottom -= 20;
                    player.style.bottom = playerBottom + 'px';
                } else {
                    clearInterval(fallInterval);
                    isJumping = false;
                }
            }, 50);
        }
    }, 50);
}

function moveObstacle() {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    if (obstacleLeft > -30) {
        obstacle.style.left = obstacleLeft - 4 + 'px';
    } else {
        obstacle.style.left = 600 + 'px';
    }
}

setInterval(moveObstacle, 50);

function checkCollision() {
    let playerTop = 300 - playerBottom;
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    if (obstacleLeft < 80 && obstacleLeft > 20 && playerBottom < 60) {
        alert("Game Over!");
    }
}

setInterval(checkCollision, 50);
