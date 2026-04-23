addEventListener('DOMContentLoaded', () => {
  const game = new Game('streetFighter');

  const btnStart = document.getElementById("startBtn")

  btnStart.onclick = () => {
    btnStart.style.display = "none"
    game.start();
  }
  
});
