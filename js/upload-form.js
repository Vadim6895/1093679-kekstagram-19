'use strict';

(function () {
  var getUploadFormImg = function () {
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
      if (window.util.isEscPressed) {
        if (evt.target !== window.util.hashtagInput && evt.target !== window.util.commentInput) {
          uploadFormClose();
        }
      }
    };

    function uploadFormOpen() {
      imgUploadForm.classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
      getModalOpen();
      imgButtonCancel.addEventListener('click', uploadFormClose);
      window.uploadFormScale.addScale();
      window.uploadFormEffects.addEffects();
      window.uploadFormHashtags.addHashtags();
      window.uploadFormSlider.addSlider();
      imgUploadInput.removeEventListener('change', uploadFormOpen);
    }

    function uploadFormClose() {
      imgUploadForm.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      getModalClose();
      imgButtonCancel.removeEventListener('click', uploadFormClose);
      window.uploadFormEffects.removeEffects();
      window.uploadFormScale.removeScale();
      window.uploadFormHashtags.removeHashtags();
      window.uploadFormSlider.removeSlider();
      imgUploadInput.addEventListener('change', uploadFormOpen);
    }

    imgUploadInput.addEventListener('change', uploadFormOpen);


    // -----------------------module6-task3--------------------------
    var uploadForm = document.querySelector('.img-upload__form');
    var imgUpload = document.querySelector('.img-upload__preview').querySelector('img');
    uploadForm.addEventListener('submit', function (evt) {
      window.upload(new FormData(uploadForm), function (response) {
        uploadFormClose();
        uploadForm.reset();
        imgUpload.className = '';
        imgUpload.style = ' ';

        if (response) {
          successMessage();
        } else {
          errorMessage();
        }
      });
      evt.preventDefault();
    });

    var pictures = document.querySelector('.pictures');

    var templateError = document.querySelector('#error');
    var error = templateError.content.querySelector('.error');
    pictures.appendChild(error);
    error.classList.add('visually-hidden');

    var templateSuccess = document.querySelector('#success');
    var success = templateSuccess.content.querySelector('.success');
    pictures.appendChild(success);
    success.classList.add('visually-hidden');

    var errorMessage = function () {
      error.classList.remove('visually-hidden');
      error.addEventListener('click', function () {
        error.classList.add('visually-hidden');
      });
      document.addEventListener('keydown', function () {
        if (window.util.isEscPressed) {
          error.classList.add('visually-hidden');
        }
      });
    };

    var successMessage = function () {
      success.classList.remove('visually-hidden');
      success.addEventListener('click', function () {
        success.classList.add('visually-hidden');
      });
      document.addEventListener('keydown', function () {
        if (window.util.isEscPressed) {
          success.classList.add('visually-hidden');
        }
      });
    };

    // ----------------------------------------------------------
  };

  window.uploadForm = {
    getUploadFormImg: getUploadFormImg
  };
})();
