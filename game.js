let points = 0;
let lives = 3;
let gameInterval;
const gameDuration = 30000; // 30 seconds

const gameArea = document.getElementById("game-area");
const pointsDisplay = document.getElementById("points");
const livesDisplay = document.getElementById("lives");
const gameTime = document.getElementById("game-time");

function startGame() {
  gameInterval = setInterval(spawnItem, 1000); // spawn item every second
  setTimeout(endGame, gameDuration);
  gameTime.style.animation = `countdown ${
    gameDuration / 1000
  }s linear forwards`;
}

function spawnItem() {
  // Create a new item element
  const item = document.createElement("div");
  item.className = "game-item";
  item.style.left = `${Math.random() * 100}%`;
  item.style.animationDuration = `${Math.random() * 5 + 3}s`;

  // Determine if item is good or bad
  const isGood = Math.random() > 0.5;
  item.classList.add(isGood ? "good" : "bad");

  // Add click event listener
  item.addEventListener("click", () => {
    if (isGood) {
      points++;
    } else {
      lives--;
    }
    pointsDisplay.textContent = points;
    livesDisplay.textContent = lives;
    gameArea.removeChild(item);
    checkGameStatus();
  });

  // Remove item after animation ends
  item.addEventListener("animationend", () => {
    if (gameArea.contains(item)) {
      if (!isGood) lives--;
      livesDisplay.textContent = lives;
      gameArea.removeChild(item);
      checkGameStatus();
    }
  });

  gameArea.appendChild(item);
}

function checkGameStatus() {
  if (lives <= 0) {
    endGame("Game Over");
  }
}

function endGame(message = "Level Complete") {
  clearInterval(gameInterval);
  alert(message);
}

// Start the game when the window loads
window.onload = startGame;
