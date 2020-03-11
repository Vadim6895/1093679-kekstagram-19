'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var isEscPressed = function (evt) {
    return evt.key === ESC_KEY;
  };

  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

  window.util = {
    hashtagInput: hashtagInput,
    commentInput: commentInput,
    isEscPressed: isEscPressed,
  };
})();
