const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let w = canvas.width;
let h = canvas.height;
let mouseY;
let gameOver;

class player {
  constructor(position, isPlayer, width, height, side) {
    this.position = position;
    this.isPlayer = isPlayer;
    this.width = width;
    this.height = height;
    this.side = side;
  }
  draw() {
    this.position.x += this.position.velX;
    this.position.y += this.position.velY;
    ctx.fillStyle = "white";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    let distance = {
      x: Ball.position.x - this.position.x,
      y: Ball.position.y - this.position.y,
    };
    if (this.isPlayer) {
      if (mouseY) {
        this.position.y = mouseY;
      } else {
        this.position.y = h / 2;
      }
    } else {
      if (this.position.velY) {
        this.position.y += this.position.velY;
      }
    }
    if (
      distance.x < this.width + 10 &&
      distance.x > 0 &&
      distance.y < this.height &&
      distance.y > 0
    ) {
      Ball.position.velX = -Ball.position.velX;
    }
  }
  score() {
    ctx.fillStyle = "white";
    ctx.font = "50px cascadia code";
    ctx.textBaseLine = "middle";
    ctx.textAlign = "center";
    if (this.side == 1) {
      ctx.fillText(`Score: ${Ball.playerLeftScore}`, 500, 50);
    } else {
      ctx.fillText(`Score: ${Ball.playerRightScore}`, w - 500, 50);
    }
  }
}

class ball {
  constructor(position) {
    this.position = position;
    this.playerLeftScore = 0;
    this.playerRightScore = 0;
  }

  draw() {
    this.position.x += this.position.velX;
    this.position.y += this.position.velY;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  }
  update() {
    let distance = {
      w: w - this.position.x,
      startW: 0 - this.position.x,
      h: h - this.position.y,
      startH: 0 - this.position.y,
    };
    if (distance.w < 10) {
      this.position.velX = 0;
      this.position.velY = 0;
      setTimeout(() => {
        if (randNum()) {
          this.position.velX = -2;
          this.position.velY = -2;
        } else {
          this.position.velX = 2;
          this.position.velY = 2;
        }
      }, 500);
      this.position.x = w / 2;
      this.position.y = h / 2;
      this.playerLeftScore++;
    } else if (distance.startW < 10 && distance.startW > 0) {
      this.position.velX = 0;
      this.position.velY = 0;
      setTimeout(() => {
        if (randNum()) {
          this.position.velX = -2;
          this.position.velY = -2;
        } else {
          this.position.velX = 2;
          this.position.velY = 2;
        }
      }, 500);
      this.position.x = w / 2;
      this.position.y = h / 2;
      this.playerRightScore++;
    } else if (distance.h < 10) {
      this.position.velY = -2;
    } else if (distance.startH < 10 && distance.startH > 0) {
      this.position.velY = 2;
    }
  }
}

playerLeft = new player(
  (position = {
    x: 2,
    y: mouseY,
    velX: 0,
    velY: 0,
  }),
  true,
  20,
  150,
  1
);
playerRight = new player(
  (position = {
    x: w - 20,
    y: h / 2,
    velX: 0,
    velY: 0,
  }),
  false,
  20,
  150,
  0
);

const players = () => {
  playerLeft.position.x = 2;
  playerRight.position.x = w - 20;
};

let Ball = new ball({
  x: w / 2,
  y: h / 2,
  velX: 2,
  velY: -2,
});

const randNum = () => {
  let randInt = Math.random() < 0.5;
  if (randInt > 0.5) {
    return true;
  } else {
    return false;
  }
};

const update = () => {
  players();
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 10;
  ctx.strokeRect(0, 0, w, h);
  Ball.update();
  Ball.draw();
  playerRight.draw();
  playerRight.update();
  playerLeft.draw();
  playerLeft.update();
  playerRight.score();
  playerLeft.score();
};

const main = () => {
  update();
  requestAnimationFrame(main);
};

addEventListener("mousemove", (e) => {
  mouseY = e.clientY;
});

addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowDown":
      playerRight.position.velY = 2;
      document.onkeyup = () => {
        playerRight.position.velY = 0;
      };
      break;
    case "ArrowUp":
      playerRight.position.velY = -2;
      document.onkeyup = () => {
        playerRight.position.velY = 0;
      };
      break;
  }
});

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  w = canvas.width;
  h = canvas.height;
};

main();
