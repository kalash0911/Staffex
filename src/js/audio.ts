export const initAudioClicks = () => {
  function playSound() {
    var audio = new Audio('./files/click-song.mp3');
    audio.play();
  }

  var clickButtons = document.querySelectorAll('.click-song');

  clickButtons.forEach(function (button) {
    button.addEventListener('click', playSound);
  });
};
