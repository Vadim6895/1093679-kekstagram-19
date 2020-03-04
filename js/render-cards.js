'use strict';

(function () {

  var renderCards = function (cardsArr) {
    var PICTUREID = '#picture';
    var PICTURESCLASS = '.pictures';
    var PICTURE_COMMENTS = '.picture__comments';
    var PICTURE_IMG = '.picture__img';
    var PICTURE_LIKES = '.picture__likes';

    var pictureContainer = document.querySelector(PICTURESCLASS);
    var pictureTemplate = document.querySelector(PICTUREID).content;


    var renderCard = function (card, index) { // отвечает за перенос данных в html из JS получает карту и индекс
      var pictureNode = pictureTemplate.cloneNode(true);

      pictureNode.querySelector(PICTURE_COMMENTS).textContent = card.comments.length;
      pictureNode.querySelector(PICTURE_IMG).src = card.url;
      pictureNode.querySelector(PICTURE_LIKES).textContent = card.likes;
      pictureNode.querySelector('.picture').dataset.index = index;
      return pictureNode;
    };

    var generateFragment = function () { // вставляет массив карт в разметку посредством множественного вызова рендера карты
      var fragment = document.createDocumentFragment();
      for (var index = 0; index < cardsArr.length; index++) {
        fragment.appendChild(renderCard(cardsArr[index], index));
      }

      pictureContainer.appendChild(fragment);
    };
    generateFragment();

  };
  window.renderCards = {
    renderCards: renderCards
  };
})();
