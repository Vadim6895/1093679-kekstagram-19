'use strict';

(function () {
/* effects--------------------*/
  var addEffects = function () {
    // var effectsList = document.querySelector('.effects__list');
    var imgUpload = document.querySelector('.img-upload__preview').querySelector('img');
    // var levelLine = document.querySelector('.effect-level__line');
    // var effectsNoneBtn = document.querySelector('.effects__preview--none');
    var effectLevelSlider = document.querySelector('.effect-level');
    var imgOverlay = document.querySelector('.img-upload__overlay');
    var effectLevelDepth = document.querySelector('.effect-level__depth');
    var MAX_VALUE_LEVELINE = '452px';
    var MAX_LEVEL_DEPTH = '100%';
    // поскольку levelLine.offsetWidth при заданном display: none имеет значение 0, и ломает всю логику
    // заранее установленные константы кажутся адекватным решением :)
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
          window.util.levelPinSlider.style.left = MAX_VALUE_LEVELINE;
          effectLevelDepth.style.width = MAX_LEVEL_DEPTH;
        }
        if (imgUpload.className !== evt.target.id) {
          imgUpload.className = '';
          imgUpload.classList.add(object[evt.target.id]);
          window.util.levelPinSlider.style.left = MAX_VALUE_LEVELINE;
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
    });

    function cleanDataPinSlider(stroke) {
      var arr = [];
      arr = stroke.split('');
      var arr1 = [];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== 'p' && arr[i] !== 'x') {
          arr1.push(arr[i]);
        }
      }
      var str = arr1.join('');
      return str;
    }


    imgOverlay.addEventListener('mousemove', function () {
      var dataPinSlider = cleanDataPinSlider(window.util.levelPinSlider.style.left);
      var levelLineWidth = window.util.levelLine.offsetWidth;
      var saturation = (dataPinSlider / levelLineWidth) * 10;
      var saturationInvert = (dataPinSlider / levelLineWidth) * 100;
      var saturationBlur = (dataPinSlider / levelLineWidth) * 3;
      var saturationBrightness = (dataPinSlider / levelLineWidth * 2) + 1;
      /*  var saturation = evt.offsetX / window.util.levelLine.offsetWidth * 100;
      var saturationBlur = evt.offsetX / window.util.levelLine.offsetWidth * 3;
      var saturationBrightness = (evt.offsetX / window.util.levelLine.offsetWidth * 2) + 1;*/

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
