'use strict';

(function () {
/* Масштаб-----------------------*/
  var smallScaleBtn = document.querySelector('.scale__control--smaller');
  var biggerScaleBtn = document.querySelector('.scale__control--bigger');
  var scaleControlInput = document.querySelector('.scale__control--value');
  var imgUploadDiv = document.querySelector('.img-upload__preview');
  var STEP_VALUES = ['25', '50', '75', '100'];
  var stepValue = 3;
  scaleControlInput.value = '100%';

  function smallScale() {
    if (scaleControlInput.value === '25%') {
      scaleControlInput.value = '25%';
    } else {
      stepValue--;
      scaleControlInput.value = STEP_VALUES[stepValue] + '%';
      imgUploadDiv.style.transform = 'scale(0.' + STEP_VALUES[stepValue] + ')';
    }
  }
  function biggerScale() {
    if (scaleControlInput.value === '100%') {
      scaleControlInput.value = '100%';
    } else {
      stepValue++;
      scaleControlInput.value = STEP_VALUES[stepValue] + '%';
      if (STEP_VALUES[stepValue] === '100') {
        imgUploadDiv.style.transform = 'scale(1.0)';
      } else {
        imgUploadDiv.style.transform = 'scale(0.' + STEP_VALUES[stepValue] + ')';
      }
    }
  }

  smallScaleBtn.addEventListener('click', function () {
    smallScale();
  });
  biggerScaleBtn.addEventListener('click', function () {
    biggerScale();
  });

})();
