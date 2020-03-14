'use strict';

(function () {

  var render = function (cardsArr) {
    var PICTURE_ID = '#picture';
    var PICTURES_CLASS = '.pictures';
    var PICTURE_COMMENTS = '.picture__comments';
    var PICTURE_IMG = '.picture__img';
    var PICTURE_LIKES = '.picture__likes';

    var pictureContainer = document.querySelector(PICTURES_CLASS);
    var pictureTemplate = document.querySelector(PICTURE_ID).content;


    var renderCard = function (card, index) {
      var pictureNode = pictureTemplate.cloneNode(true);

      pictureNode.querySelector(PICTURE_COMMENTS).textContent = card.comments.length;
      pictureNode.querySelector(PICTURE_IMG).src = card.url;
      pictureNode.querySelector(PICTURE_LIKES).textContent = card.likes;
      pictureNode.querySelector('.picture').dataset.index = index;
      return pictureNode;
    };


    var generateFragment = function () {
      var fragment = document.createDocumentFragment();
      for (var index = 0; index < cardsArr.length; index++) {
        fragment.appendChild(renderCard(cardsArr[index], index));
      }

      pictureContainer.appendChild(fragment);
    };
    generateFragment();

  };
  window.renderCards = {
    render: render
  };

})();
