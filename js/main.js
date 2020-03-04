'use strict';
(function () {
  // var cards = [];
  window.dataServer(function (cards) {
    window.renderCards.renderCards(cards);
    window.overlayfindCard.getOverlayCard(cards);
  });
  // window.generateCards.generateCardsAndComments(cards);
  // window.renderCards.renderCards();
  // window.renderOverlay.renderOverlayCards();

  window.hiddenComments.getHiddenSocialComment();
  window.hiddenComments.getHiddenCommentsLoader();

  window.uploadForm.getUploadFormImg();
  window.uploadFormScale.addScale();
  window.uploadFormEffects.addEffects();
  window.uploadFormHashtags.addHashtags();
  window.uploadFormSlider.addSlider();

  // window.overlayfindCard.getOverlayCard(cards);
  // window.renderCards.renderCards(cards);

})();
