'use strict';
(function () {
  window.load(function (cards) {
    window.renderCards.renderCards(cards);
    window.overlayfindCard.updateCards(cards);
    window.filtersCards.addFilters(cards);
  });

  window.uploadForm.getUploadFormImg();
})();
