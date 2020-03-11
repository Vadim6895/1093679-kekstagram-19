'use strict';
(function () {
  window.load(function (cards) {
    window.renderCards.renderCards(cards);
    window.overlayfindCard.getOverlayCard(cards);
    window.filtersCards.addFiltersCards(cards);
  });


  window.uploadForm.getUploadFormImg();
})();
