addEventListener('DOMContentLoaded', () => {
  const game = new Game('streetFighter');

  const btnStart = document.getElementById("startBtn")

  btnStart.onclick = () => {
    btnStart.style.display = "none"
    game.start();
  }
  
  const btnReset = document.getElementById("restartBtn")

  btnReset.onclick = () => {
    btnStart.style.display = "block"
    game.reset();
  }
  
});
