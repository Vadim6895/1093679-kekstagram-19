'use strict';

(function () {
  var initialize = function () {
    var imgUploadForm = document.querySelector('.img-upload__overlay');
    var imgButtonCancel = document.querySelector('.img-upload__cancel');
    var imgUploadInput = document.querySelector('.img-upload__input');

    var templateError = document.querySelector('#error');
    var error = templateError.content.querySelector('.error');
    var templateSuccess = document.querySelector('#success');
    var success = templateSuccess.content.querySelector('.success');
    var pictures = document.querySelector('.pictures');

    var uploadForm = document.querySelector('.img-upload__form');
    var imgUpload = document.querySelector('.img-upload__preview').querySelector('img');
    var effectLevelSlider = document.querySelector('.effect-level');


    var onPopupEscPress = function (evt) {
      if (window.util.isEscPressed(evt)) {
        if (evt.target !== window.util.hashtagInput && evt.target !== window.util.commentInput) {
          closeUploadForm();
        }
      }
    };

    function openUploadForm() {
      imgUploadForm.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
      window.util.getModalOpen();
      imgButtonCancel.addEventListener('click', closeUploadForm);
      window.uploadFormScale.increase();
      window.uploadFormEffects.initialize();
      window.uploadFormHashtags.initialize();
      window.uploadFormSlider.initialize();
      imgUploadInput.removeEventListener('change', openUploadForm);
      effectLevelSlider.classList.add('hidden');
    }

    function closeUploadForm() {
      imgUploadForm.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      window.util.getModalClose();
      imgButtonCancel.removeEventListener('click', closeUploadForm);
      window.uploadFormEffects.reset();
      window.uploadFormScale.decrease();
      window.uploadFormHashtags.reset();
      window.uploadFormSlider.reset();
      imgUploadInput.addEventListener('change', openUploadForm);
      uploadForm.reset();
      imgUpload.className = '';
      imgUpload.style = ' ';
    }

    imgUploadInput.addEventListener('change', openUploadForm);


    uploadForm.addEventListener('submit', function (evt) {
      window.upload(new FormData(uploadForm), getResponse);
      evt.preventDefault();
    });

    function getResponse(status) {
      closeUploadForm();

      if (status === 200) {
        showSuccessMessage();

      } else {
        showErrorMessage();
      }
    }


    pictures.appendChild(error);
    error.classList.add('visually-hidden');

    pictures.appendChild(success);
    success.classList.add('visually-hidden');


    var onClick = function (evt) {
      if (evt.target.type === 'button' || evt.target.tagName === 'SECTION') {
        error.classList.add('visually-hidden');
        success.classList.add('visually-hidden');
        error.removeEventListener('click', onClick);
        success.removeEventListener('click', onClick);
      }
    };

    var onKeyDown = function (evt) {
      if (window.util.isEscPressed(evt)) {
        success.classList.add('visually-hidden');
        error.classList.add('visually-hidden');
        document.removeEventListener('keydown', onKeyDown);
      }
    };


    var showSuccessMessage = function () {
      success.classList.remove('visually-hidden');
      success.addEventListener('click', onClick);
      document.addEventListener('keydown', onKeyDown);
    };

    var showErrorMessage = function () {
      error.classList.remove('visually-hidden');
      error.addEventListener('click', onClick);
      document.addEventListener('keydown', onKeyDown);
    };
  };

  window.uploadForm = {
    initialize: initialize
  };
})();
