'use strict';

(function () {
/* ----------------Слайдер--------------------------------------------------*/
  var addSlider = function () {
    var levelPinSlider = document.querySelector('.effect-level__pin');
    var effectLevelDepth = document.querySelector('.effect-level__depth');
    var levelLine = document.querySelector('.effect-level__line');
    // uploadFormOpen();
    levelPinSlider.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoordsX = evt.clientX;
      var minCoordsLeft = levelLine.offsetWidth - levelLine.offsetWidth;
      var maxCoordsRight = levelLine.offsetWidth;


      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = startCoordsX - moveEvt.clientX;
        startCoordsX = moveEvt.clientX;

        var moveLevelpin = function () {
          levelPinSlider.style.left = (levelPinSlider.offsetLeft - shift) + 'px';
          effectLevelDepth.style.width = ((levelPinSlider.offsetLeft - shift) / levelLine.offsetWidth * 100) + '%';
        };

        if (levelPinSlider.offsetLeft - shift > minCoordsLeft && levelPinSlider.offsetLeft - shift < maxCoordsRight) {
          moveLevelpin();
        }
      };


      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
  var removeSlider = function () {
    window.util.levelPinSlider.removeEventListener('click', function () {});
  };

  window.uploadFormSlider = {
    addSlider: addSlider,
    removeSlider: removeSlider
  };
})();
