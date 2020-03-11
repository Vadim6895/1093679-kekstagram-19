'use strict';

(function () {

  var MAX_VALUE_LEVELINE = '452px';
  var MAX_LEVEL_DEPTH = '100%';

  var effectsList = document.querySelector('.effects__list');
  var imgUpload = document.querySelector('.img-upload__preview').querySelector('img');
  var effectLevelSlider = document.querySelector('.effect-level');
  var imgOverlay = document.querySelector('.img-upload__overlay');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var levelPinSlider = document.querySelector('.effect-level__pin');
  var levelLine = document.querySelector('.effect-level__line');

  var object = {
    'effect-none': 'effects-preview--none',
    'effect-chrome': 'effects-preview--chrome',
    'effect-sepia': 'effects-preview--sepia',
    'effect-marvin': 'effects-preview--marvin',
    'effect-phobos': 'effects-preview--phobos',
    'effect-heat': 'effects-preview--heat'
  };

  effectLevelSlider.classList.add('hidden');

  var addEffect = function (evt) {
    if (evt.target.type === 'radio') {

      if (!imgUpload.className) {
        imgUpload.classList.add(object[evt.target.id]);
        levelPinSlider.style.left = MAX_VALUE_LEVELINE;
        effectLevelDepth.style.width = MAX_LEVEL_DEPTH;
      }
      if (imgUpload.className !== evt.target.id) {
        imgUpload.className = '';
        imgUpload.classList.add(object[evt.target.id]);
        levelPinSlider.style.left = MAX_VALUE_LEVELINE;
        effectLevelDepth.style.width = MAX_LEVEL_DEPTH;
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
  };


  var changeEffect = function () {
    var dataPinSlider = levelPinSlider.offsetLeft;
    var levelLineWidth = levelLine.offsetWidth;
    var saturation = (dataPinSlider / levelLineWidth) * 10;
    var saturationInvert = (dataPinSlider / levelLineWidth) * 100;
    var saturationBlur = (dataPinSlider / levelLineWidth) * 3;
    var saturationBrightness = (dataPinSlider / levelLineWidth * 2) + 1;

    if (imgUpload.className === object['effect-chrome']) {
      imgUpload.style.filter = 'grayscale(0.' + Math.floor(saturation) + ')';
    }
    if (imgUpload.className === object['effect-sepia']) {
      imgUpload.style.filter = 'sepia(0.' + Math.floor(saturation) + ')';
    }
    if (imgUpload.className === object['effect-marvin']) {
      imgUpload.style.filter = 'invert(' + Math.round(saturationInvert) + '%)';
    }
    if (imgUpload.className === object['effect-phobos']) {
      imgUpload.style.filter = 'blur(' + saturationBlur + 'px)';
    }
    if (imgUpload.className === object['effect-heat']) {
      imgUpload.style.filter = 'brightness(' + saturationBrightness + ')';
    }
  };


  var addEffects = function () {
    effectsList.addEventListener('click', addEffect);
    imgOverlay.addEventListener('mousemove', changeEffect);

  };

  var removeEffects = function () {
    effectsList.removeEventListener('click', addEffect);
    imgOverlay.removeEventListener('mousemove', changeEffect);
  };

  window.uploadFormEffects = {
    addEffects: addEffects,
    removeEffects: removeEffects
  };
})();
