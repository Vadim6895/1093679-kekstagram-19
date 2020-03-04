'use strict';
(function () {
  var cards = [];

  window.generateCards.generateCardsAndComments(cards);// генерирует и сразу вставляет карточки
  window.renderCards.renderCards(cards);
  // window.renderOverlay.renderOverlayCards(); // получает карту и вставляет её в оверлей

  window.hiddenComments.getHiddenSocialComment();
  window.hiddenComments.getHiddenCommentsLoader();

  window.uploadForm.getUploadFormImg();
  window.uploadFormScale.addScale();
  window.uploadFormEffects.addEffects();
  window.uploadFormHashtags.addHashtags();
  window.uploadFormSlider.addSlider();

  window.overlayfindCard.getOverlayCard(cards); // отвечает за чистку коментариев, и определяет на какой карте клик
})();
