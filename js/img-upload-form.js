'use strict';

(function () {
/* MODULE 4 -- TASK 2 (временно)-------------------------------------------- */
  var imgUploadForm = document.querySelector('.img-upload__overlay');
  var imgButtonCancel = document.querySelector('.img-upload__cancel');
  var imgUploadInput = document.querySelector('.img-upload__input');

  function getModalOpen() {
    var modal = document.querySelector('body');
    modal.classList.add('modal-open');
  }
  function getModalClose() {
    var modal = document.querySelector('body');
    modal.classList.remove('modal-open');
  }

  var onPopupEscPress = function (evt) {
    if (evt.key === window.util.ESC_KEY) {
      if (evt.target !== window.util.hashtagInput && evt.target !== window.util.commentInput) {
        uploadFormClose();
      }
    }
  };

  function uploadFormOpen() {
    imgUploadForm.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    getModalOpen();
  }

  function uploadFormClose() {
    imgUploadForm.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    getModalClose();
  }

  imgUploadInput.addEventListener('change', function () {
    uploadFormOpen();
  });

  imgButtonCancel.addEventListener('click', function () {
    uploadFormClose();
  });

})();
