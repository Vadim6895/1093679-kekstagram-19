'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var isEscPressed = function (evt) {
    return evt.key === ESC_KEY;
  };

  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

  var effectsList = document.querySelector('.effects__list');
  var levelLine = document.querySelector('.effect-level__line');
  var effectsNoneBtn = document.querySelector('.effects__preview--none');

  var smallScaleBtn = document.querySelector('.scale__control--smaller');
  var biggerScaleBtn = document.querySelector('.scale__control--bigger');

  var imgUploadSubmitBtn = document.querySelector('.img-upload__submit');

  var levelPinSlider = document.querySelector('.effect-level__pin');


  window.util = {
    hashtagInput: hashtagInput,
    commentInput: commentInput,
    isEscPressed: isEscPressed,
    effectsList: effectsList,
    levelLine: levelLine,
    effectsNoneBtn: effectsNoneBtn,
    smallScaleBtn: smallScaleBtn,
    biggerScaleBtn: biggerScaleBtn,
    imgUploadSubmitBtn: imgUploadSubmitBtn,
    levelPinSlider: levelPinSlider
  };
})();
