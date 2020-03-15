'use strict';
(function () {
  window.load.getData(function (cards) {
    window.renderCards.initialize(cards);
    window.overlayfindCard.updateCards(cards);
    window.filtersCards.initialize(cards);
  }, window.load.showError);

  window.uploadForm.initialize();
})();
