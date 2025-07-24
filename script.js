
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const pad = {
  x: canvas.width / 2 - 30,
  y: canvas.height - 60,
  width: 60,
  height: 30,
  speed: 5
};

let drops = [];

function drawPad() {
  ctx.fillStyle = "#f06292";
  ctx.fillRect(pad.x, pad.y, pad.width, pad.height);
}

function createDrop() {
  const x = Math.random() * (canvas.width - 20);
  drops.push({ x: x, y: 0, radius: 10 });
}

function drawDrops() {
  ctx.fillStyle = "#b71c1c";
  for (let drop of drops) {
    ctx.beginPath();
    ctx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function updateDrops() {
  for (let drop of drops) {
    drop.y += 3;
  }
  drops = drops.filter(d => d.y < canvas.height);
}

function detectCollisions() {
  drops = drops.filter(drop => {
    const withinX = drop.x > pad.x && drop.x < pad.x + pad.width;
    const withinY = drop.y + drop.radius > pad.y;
    return !(withinX && withinY);
  });
}

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPad();
  drawDrops();
  updateDrops();
  detectCollisions();
  requestAnimationFrame(updateGame);
}

setInterval(createDrop, 1000);
updateGame();

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && pad.x > 0) {
    pad.x -= pad.speed;
  } else if (e.key === "ArrowRight" && pad.x + pad.width < canvas.width) {
    pad.x += pad.speed;
  }
});
