'use strict';

(function () {

  var getOverlayCard = function (cardsArr) {
    var picContainer = document.querySelector('.pictures');
    var btnCancelBigPic = document.querySelector('.big-picture__cancel');
    var bodyContainer = document.querySelector('BODY');
    var bigPicture = document.querySelector('.big-picture');

    function deleteComments() {
      var socialComments = document.querySelector('.social__comments');
      while (socialComments.firstChild) {
        socialComments.removeChild(socialComments.firstChild);
      }
    }

    picContainer.addEventListener('click', function (evt) {

      if (evt.target.closest('A')) {
        var a = evt.target.closest('A').dataset.index;
        deleteComments();
        window.renderOverlayCards.renderBigCard(cardsArr[a], bigPicture);
        window.renderOverlayCards.renderComment(cardsArr[a]);
        openOverlayPicture();
      }
    });


    var onOverlayEscPress = function () {
      if (window.util.isEscPressed) {
        closeOverlayPicture();
      }
    };

    function openOverlayPicture() {
      bigPicture.classList.remove('hidden');
      bodyContainer.addEventListener('keydown', onOverlayEscPress);
      btnCancelBigPic.addEventListener('click', closeOverlayPicture);
    }

    function closeOverlayPicture() {
      bigPicture.classList.add('hidden');
      bodyContainer.removeEventListener('keydown', onOverlayEscPress);
      btnCancelBigPic.removeEventListener('click', closeOverlayPicture);
    }
  };
  window.overlayfindCard = {
    getOverlayCard: getOverlayCard
  };
})();
