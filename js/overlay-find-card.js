'use strict';

(function () {

  var getOverlayCard = function (cardsArr) {
    var btnCancelBigPic = document.querySelector('.big-picture__cancel');
    var bodyContainer = document.querySelector('BODY');
    var bigPicture = document.querySelector('.big-picture');
    var commentsLoader = document.querySelector('.comments-loader');
    var pictureContainer = document.querySelector('.pictures');

    function deleteComments() {
      var socialComments = document.querySelector('.social__comments');
      while (socialComments.firstChild) {
        socialComments.removeChild(socialComments.firstChild);
      }
    }
    // -------------------------------module8-task3--------------------------------------
    var newComments = [];
    var activeCard;
    var COUNT = 5;
    var activeCommentsCount = document.querySelector('.social__comment-count');
    var socialButton = document.querySelector('.social__comments-loader');

    function changeCommentsCounts() {
      var maxCommentsCount;
      if (newComments.length) {
        maxCommentsCount = activeCard.comments.length;
      }
      maxCommentsCount = newComments.length + activeCard.comments.length;
      activeCommentsCount.remove();

      var divSocialCommentCount = document.createElement('div');
      divSocialCommentCount.classList.add('social__comment-count');
      divSocialCommentCount.textContent = activeCard.comments.length + ' из ' + maxCommentsCount + ' комментариев';
      var bitPictureSocial = document.querySelector('.big-picture__social');
      bitPictureSocial.appendChild(divSocialCommentCount);
    }


    function getHiddenOrShowCommentsLoader() {
      if (newComments.length) {
        commentsLoader.classList.remove('hidden');
      } else {
        commentsLoader.classList.add('hidden');
      }
    }

    function cutOutComments(card) {
      newComments = card.comments.splice(COUNT, card.comments.length - COUNT);
      activeCard = card;
      changeCommentsCounts();
    }

    function showComments() {
      if (newComments.length !== 0) {
        for (var i = 0; i < COUNT; i++) {
          if (newComments.length > 0) {
            activeCard.comments.push(newComments[0]);
            newComments.splice(0, 1);
          }
        }
        deleteComments();
        changeCommentsCounts();
        window.renderOverlayCards.renderComment(activeCard);
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

    // -------------------------------------------------------------------------
    var getCardOnClick = function (evt) {
      if (evt.target.closest('A')) {
        var a = evt.target.closest('A').dataset.index;
        deleteComments();
        cutOutComments(cardsArr[a]);
        window.renderOverlayCards.renderBigCard(cardsArr[a], bigPicture);
        window.renderOverlayCards.renderComment(cardsArr[a]);
        openOverlayPicture();
      }
    };


    var onOverlayEscPress = function () {
      if (window.util.isEscPressed) {
        closeOverlayPicture();
      }
    };

    function openOverlayPicture() {
      getHiddenOrShowCommentsLoader();
      socialButton.addEventListener('click', showComments);
      bigPicture.classList.remove('hidden');
      bodyContainer.addEventListener('keydown', onOverlayEscPress);
      btnCancelBigPic.addEventListener('click', closeOverlayPicture);
    }

    function closeOverlayPicture() {
      returnComments();
      socialButton.removeEventListener('click', showComments);
      bigPicture.classList.add('hidden');
      bodyContainer.removeEventListener('keydown', onOverlayEscPress);
      btnCancelBigPic.removeEventListener('click', closeOverlayPicture);
    }
    pictureContainer.addEventListener('click', getCardOnClick);

  };


  window.overlayfindCard = {
    getOverlayCard: getOverlayCard

  };
})();
