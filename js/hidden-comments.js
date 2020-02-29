'use strict';

(function () {

  function getHiddenSocialComment() {
    var socialComentCount = document.querySelector('.social__comment-count');
    socialComentCount.classList.add('hidden');
  }
  function getHiddenCommentsLoader() {
    var commentsLoader = document.querySelector('.comments-loader');
    commentsLoader.classList.add('hidden');
  }

  getHiddenSocialComment(); // скрывает счетчик комментариев
  getHiddenCommentsLoader(); // скрывает меню "показать больше комментариев"
})();
