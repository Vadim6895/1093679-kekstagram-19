'use strict';

(function () {
  var myFunc = function (cardsArr) {
    var MAX_RANDOM_CARDS = 10;
    var MIN_CARDS = 1;
    // var MAX_CARDS = 25;
    var ACTIVE_CLASS_FILTER = 'img-filters__button--active';

    var filterDefault = document.querySelector('#filter-default');
    var filterRandom = document.querySelector('#filter-random');
    var filterDiscussed = document.querySelector('#filter-discussed');
    var filtersForm = document.querySelector('.img-filters__form');
    var picturesContainer = document.querySelector('.pictures');


    var filters = document.querySelector('.img-filters');
    filters.classList.remove('img-filters--inactive');

    function getArrayRandElement(cards) {
      var randomInt = Math.floor(Math.random() * (cards.length - MIN_CARDS)) + MIN_CARDS;
      return randomInt;
    }

    var deleteCards = function () {
      for (var i = 0; i < picturesContainer.childNodes.length; i++) {
        if (picturesContainer.childNodes[i].nodeName === 'A') {
          picturesContainer.childNodes[i].remove();
        }
      }
    };

    var addActiveFilter = function (evt) {
      if (evt.target.type === 'button') {
        filterDefault.classList.remove(ACTIVE_CLASS_FILTER);
        filterRandom.classList.remove(ACTIVE_CLASS_FILTER);
        filterDiscussed.classList.remove(ACTIVE_CLASS_FILTER);
        evt.target.classList.add(ACTIVE_CLASS_FILTER);
      }
    };


    var getRandomCards = function () {
      deleteCards();
      var newCards = cardsArr.slice(0, cardsArr.length);
      var randomCards = [];

      for (var i = 0; i < MAX_RANDOM_CARDS; i++) {
        var temp = getArrayRandElement(newCards);
        randomCards.push(newCards[temp]);
        newCards.splice(temp, 1);
      }
      return randomCards;
    };

    var getSortCommentsCards = function () {
      deleteCards();
      var newCards = cardsArr.slice(0, cardsArr.length);

      var companare = function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        }
        if (a.comments.length === b.comments.length) {
          return 0;
        }
        if (a.comments.length > b.comments.length) {
          return -1;
        } else {
          return undefined;
        }
      };

      newCards.sort(companare);
      return newCards;
    };

    filterDefault.addEventListener('click', function () {
      deleteCards();
      window.renderCards.renderCards(cardsArr);
    });
    filterRandom.addEventListener('click', function () {
      window.renderCards.renderCards(getRandomCards());
    });
    filterDiscussed.addEventListener('click', function () {
      window.renderCards.renderCards(getSortCommentsCards());
    });

    filtersForm.addEventListener('click', addActiveFilter);


  };
  window.filtersCards = {
    myFunc: myFunc
  };

})();
