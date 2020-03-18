'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var isEscPressed = function (evt) {
    return evt.key === ESC_KEY;
  };

  function getModalOpen() {
    var modal = document.querySelector('body');
    modal.classList.add('modal-open');
  }
  function getModalClose() {
    var modal = document.querySelector('body');
    modal.classList.remove('modal-open');
  }

  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

  window.util = {
    hashtagInput: hashtagInput,
    commentInput: commentInput,
    isEscPressed: isEscPressed,
    getModalOpen: getModalOpen,
    getModalClose: getModalClose
  };
})();
