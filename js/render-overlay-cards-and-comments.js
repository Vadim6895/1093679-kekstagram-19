'use strict';

(function () {
/* MODULE 3 -- TASK 3 (временно)-------------------------------------------- */
  var bigPicture = document.querySelector('.big-picture');

  window.renderComment = function (newCard) { // получает обьект карту и берет кол-во коментов из обьекта и вставляет случайнные комменты в разметку\
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
      ptag.textContent = newCard.comments[index].comments;

      var cardDescription = document.querySelector('.social__caption');
      cardDescription.textContent = newCard.description;

      commentFragment.appendChild(comment).appendChild(imgtag);
      comment.appendChild(ptag);
      commentHTML.appendChild(commentFragment);
    }
  };

  window.renderBigCard = function (newCard, picture) { // получает обьект(карту) и оверлей, подставляет в оверлей данные из карты
    bigPicture = picture;
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = newCard.url;
    bigPicture.querySelector('.likes-count').textContent = newCard.likes;
    bigPicture.querySelector('.comments-count').textContent = newCard.comments.length;
  };

})();
