const backgroundAudio = document.getElementById('background-sound');

window.addEventListener('load', () => {
  if (backgroundAudio && backgroundAudio.paused) {
    backgroundAudio.volume = 0.5;
    backgroundAudio.play().catch(err => {});
  }
});
