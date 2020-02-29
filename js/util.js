'use strict';

(function () {
  var cards = [];
  var ESC_KEY = 'Escape';
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

  window.util = {
    cards: cards,
    hashtagInput: hashtagInput,
    commentInput: commentInput,
    ESC_KEY: ESC_KEY
  };
})();
