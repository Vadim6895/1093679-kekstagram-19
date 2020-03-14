'use strict';
(function () {
  window.load.getLoadData(function (cards) {
    window.renderCards.render(cards);
    window.overlayfindCard.updateCards(cards);
    window.filtersCards.addFilters(cards);
  }, window.load.showError);

  window.uploadForm.initialize();
})();
