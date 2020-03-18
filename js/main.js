'use strict';
(function () {
  window.load.getData(function (cards) {
    window.renderCardsInitialize(cards);
    window.overlayfindCardUpdate(cards);
    window.filtersCardsInitialize(cards);
  }, window.load.showError);

  window.uploadFormInitialize();
})();
