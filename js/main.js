'use strict';
(function () {
  window.load(function (cards) {
    window.renderCards.renderCards(cards);
    window.overlayfindCard.updateCards(cards);
    window.filtersCards.addFiltersCards(cards);
  });

  window.uploadForm.getUploadFormImg();
})();
