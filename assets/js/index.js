addEventListener('DOMContentLoaded', () => {
  let game = null;

  const btnStart = document.getElementById("startBtn")

  btnStart.onclick = () => {
    btnStart.style.display = "none"
    game = new Game('streetFighter', selectedP1, selectedP2)
    game.start();
  }
  
  let selectedP1 = null; 
  let selectedP2 = null; 

  document.getElementById("ryuP1").onclick = () => {selectedP1 = 'ryu'}
  document.getElementById("kenP1").onclick = () => {selectedP1 = 'ken'}
  document.getElementById("biankaP1").onclick = () => {selectedP1 = 'bianka'}
  document.getElementById("sagatP1").onclick = () => {selectedP1 = 'sagat'}

  document.getElementById("ryuP2").onclick = () => {selectedP2 = 'ryu'}
  document.getElementById("kenP2").onclick = () => {selectedP2 = 'ken'}
  document.getElementById("biankaP2").onclick = () => {selectedP2 = 'bianka'}
  document.getElementById("sagatP2").onclick = () => {selectedP2 = 'sagat'}






  const btnReset = document.getElementById("restartBtn")

  btnReset.onclick = () => {
    btnStart.style.display = "block"
    game.reset();
  }
  
});
