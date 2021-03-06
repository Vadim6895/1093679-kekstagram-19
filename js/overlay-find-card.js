'use strict';

(function () {
  var COMMENTS_COUNT = 5;
  var cardsArr = null;
  var btnCancelBigPic = document.querySelector('.big-picture__cancel');
  var bodyContainer = document.querySelector('BODY');
  var bigPicture = document.querySelector('.big-picture');
  var commentsLoader = document.querySelector('.comments-loader');
  var pictureContainer = document.querySelector('.pictures');
  var newComments = [];
  var activeCard;
  var activeCommentsCount = document.querySelector('.social__comment-count');
  var socialButton = document.querySelector('.social__comments-loader');

  function deleteComments() {
    var socialComments = document.querySelector('.social__comments');
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }
  }

  function changeCommentsCounts() {
    var maxCommentsCount = newComments.length + activeCard.comments.length;

    activeCommentsCount.textContent = activeCard.comments.length + ' из ' + maxCommentsCount + ' комментариев';
  }

  function getHiddenOrShowCommentsLoader() {
    if (newComments.length) {
      commentsLoader.classList.remove('hidden');
    } else {
      commentsLoader.classList.add('hidden');
    }
  }

  function cutOutComments(card) {
    newComments = card.comments.splice(COMMENTS_COUNT, card.comments.length - COMMENTS_COUNT);
    activeCard = card;
    changeCommentsCounts();
  }

  function showComments() {
    var limit = Math.min(COMMENTS_COUNT, newComments.length);
    for (var i = 0; i < limit; i++) {
      if (newComments.length > 0) {
        activeCard.comments.push(newComments[0]);
        newComments.splice(0, 1);
      }

      deleteComments();
      window.renderOverlayCards.initializeComment(activeCard);
      changeCommentsCounts();
    }
    getHiddenOrShowCommentsLoader();
  }

  function returnComments() {
    var arrLength = newComments.length;
    for (var i = 0; i < arrLength; i++) {
      activeCard.comments.push(newComments[0]);
      newComments.splice(0, 1);
    }
    getHiddenOrShowCommentsLoader();
  }


  var getCardOnClick = function (evt) {
    if (evt.target.closest('A')) {
      var a = evt.target.closest('A').dataset.index;
      deleteComments();
      cutOutComments(cardsArr[a]);
      window.renderOverlayCards.initializeBigCard(cardsArr[a], bigPicture);
      window.renderOverlayCards.initializeComment(cardsArr[a]);
      openOverlayPicture();
    }
  };

  var onOverlayEscPress = function (evt) {
    if (window.util.isEscPressed(evt)) {
      closeOverlayPicture();
    }
  };

  function openOverlayPicture() {
    getHiddenOrShowCommentsLoader();
    socialButton.addEventListener('click', showComments);
    bigPicture.classList.remove('hidden');
    bodyContainer.addEventListener('keydown', onOverlayEscPress);
    btnCancelBigPic.addEventListener('click', closeOverlayPicture);
    window.util.getModalOpen();
  }

  function closeOverlayPicture() {
    returnComments();
    socialButton.removeEventListener('click', showComments);
    bigPicture.classList.add('hidden');
    bodyContainer.removeEventListener('keydown', onOverlayEscPress);
    btnCancelBigPic.removeEventListener('click', closeOverlayPicture);
    window.util.getModalClose();
  }
  pictureContainer.addEventListener('click', getCardOnClick);

  window.overlayfindCardUpdate = function (cards) {
    cardsArr = cards;
  };

})();
