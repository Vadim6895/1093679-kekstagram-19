'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  var renderComment = function (newCard) {
    var commentFragment = document.createDocumentFragment();
    var commentHTML = document.querySelector('.social__comments');

    for (var index = 0; index < newCard.comments.length; index++) {
      var comment = document.createElement('li');
      comment.className = 'social__comment';

      var imgtag = document.createElement('img');
      imgtag.className = 'social__picture';
      imgtag.src = newCard.comments[index].avatar;
      imgtag.alt = newCard.comments[index].name;
      imgtag.width = '35';
      imgtag.height = '35';

      var ptag = document.createElement('p');
      ptag.className = 'social__text';
      ptag.textContent = newCard.comments[index].message;

      var cardDescription = document.querySelector('.social__caption');
      cardDescription.textContent = newCard.description;

      commentFragment.appendChild(comment).appendChild(imgtag);
      comment.appendChild(ptag);
      commentHTML.appendChild(commentFragment);
    }
  };

  var renderBigCard = function (newCard, picture) {
    bigPicture = picture;
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = newCard.url;
    bigPicture.querySelector('.likes-count').textContent = newCard.likes;
  };

  window.renderOverlayCards = {
    renderComment: renderComment,
    renderBigCard: renderBigCard
  };
})();
