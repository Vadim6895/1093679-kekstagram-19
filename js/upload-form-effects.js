'use strict';

(function () {
/* effects--------------------*/
  var addEffects = function () {
    // var effectsList = document.querySelector('.effects__list');
    var imgUpload = document.querySelector('.img-upload__preview').querySelector('img');
    // var levelLine = document.querySelector('.effect-level__line');
    // var effectsNoneBtn = document.querySelector('.effects__preview--none');
    var effectLevelSlider = document.querySelector('.effect-level');

    var object = {
      'effect-none': 'effects-preview--none',
      'effect-chrome': 'effects-preview--chrome',
      'effect-sepia': 'effects-preview--sepia',
      'effect-marvin': 'effects-preview--marvin',
      'effect-phobos': 'effects-preview--phobos',
      'effect-heat': 'effects-preview--heat'
    };

    effectLevelSlider.classList.add('hidden');

    window.util.effectsList.addEventListener('click', function (evt) {
      if (evt.target.type === 'radio') {

        if (!imgUpload.className) {
          imgUpload.classList.add(object[evt.target.id]);
        }
        if (imgUpload.className !== evt.target.id) {
          imgUpload.className = '';
          imgUpload.classList.add(object[evt.target.id]);
        }
        if (imgUpload.className === object['effect-none']) {
          effectLevelSlider.classList.add('hidden');
        } else {
          effectLevelSlider.classList.remove('hidden');
        }

        if (imgUpload.className === object['effect-chrome']) {
          imgUpload.style.filter = 'grayscale(1)';
        }
        if (imgUpload.className === object['effect-sepia']) {
          imgUpload.style.filter = 'sepia(1)';
        }
        if (imgUpload.className === object['effect-marvin']) {
          imgUpload.style.filter = 'invert(100%)';
        }
        if (imgUpload.className === object['effect-phobos']) {
          imgUpload.style.filter = 'blur(3px)';
        }
        if (imgUpload.className === object['effect-heat']) {
          imgUpload.style.filter = 'brightness(3)';
        }
        if (imgUpload.className === object['effect-none']) {
          imgUpload.style = '';
        }
      }
    });

    // effectsNoneBtn.addEventListener('click', function () {
    // imgUpload.style = '';
    // });

    window.util.levelLine.addEventListener('mouseup', function (evt) {
      var saturation = evt.offsetX / window.util.levelLine.offsetWidth * 100;
      var saturationBlur = evt.offsetX / window.util.levelLine.offsetWidth * 3;
      var saturationBrightness = (evt.offsetX / window.util.levelLine.offsetWidth * 2) + 1;

      if (imgUpload.className === object['effect-chrome']) {
        imgUpload.style.filter = 'grayscale(0.' + Math.floor(saturation) + ')';
      }
      if (imgUpload.className === object['effect-sepia']) {
        imgUpload.style.filter = 'sepia(0.' + Math.floor(saturation) + ')';
      }
      if (imgUpload.className === object['effect-marvin']) {
        imgUpload.style.filter = 'invert(' + Math.round(saturation) + '%)';
      }
      if (imgUpload.className === object['effect-phobos']) {
        imgUpload.style.filter = 'blur(' + saturationBlur + 'px)';
      }
      if (imgUpload.className === object['effect-heat']) {
        imgUpload.style.filter = 'brightness(' + saturationBrightness + ')';
      }
    });
  };

  var removeEffects = function () {
    window.util.effectsList.removeEventListener('click');
    window.util.effectsNoneBtn.removeEventListener('click');
    window.util.levelLine.removeEventListener('click');
  };

  window.uploadFormEffects = {
    addEffects: addEffects,
    removeEffects: removeEffects
  };
})();
