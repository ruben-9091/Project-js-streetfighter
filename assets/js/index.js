addEventListener('DOMContentLoaded', () => {
  let game = null;

  const btnStart = document.getElementById("startBtn")
  const music = new Audio('/assets/music/Street-Fighter-II-Arcade-Music.mp3');
    music.loop = true;
    music.volume = 0.5;

  btnStart.onclick = () => {
    if (!selectedP1 || !selectedP2) {
      alert ("SELECCIONA UN PERSONAJE")
      return; 
    }
    music.play()
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



  function setupCharacterSelection(player) {
    const buttons = document.querySelectorAll(`#select-${player} .character`);

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });
  }

  setupCharacterSelection("p1");
  setupCharacterSelection("p2");





  const btnReset = document.getElementById("restartBtn")

  btnReset.onclick = () => {
    location.reload();
  }
  
  
});
