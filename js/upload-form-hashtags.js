'use strict';

(function () {
  var addHashtags = function () {
  /* хэш теги ------------------------------------------*/
    var imgUploadSubmitBtn = document.querySelector('.img-upload__submit');
    var regex = /^#[a-zA-Z0-9]+$/;

    var isHashTagValid = function (tag) {
      if (tag.length > 20) {
        return false;
      }

      if (regex.test(tag)) {
        return true;
      }

      return false;
    };

    var cleanTags = function (arrTags) {
      var tagsArr = [];
      for (var k = 0; k < arrTags.length; k++) {
        if (arrTags[k] !== '') {
          tagsArr.push(arrTags[k]);
        }
      }
      return tagsArr;
    };

    var isAllHashTagsValid = function (str) {
      var tags = str.split(' ');
      var tagsNoSpaces = cleanTags(tags);

      if (tagsNoSpaces.length > 5) {
        return false;
      }
      for (var index = 0; index < tagsNoSpaces.length; index++) {
        for (var a = index + 1; a < tagsNoSpaces.length; a++) {
          if (tagsNoSpaces[index].toLowerCase() === tagsNoSpaces[a].toLowerCase()) {
            return false;
          }
        }
      }

      for (var g = 0; g < tagsNoSpaces.length; g++) {
        if (!isHashTagValid(tagsNoSpaces[g])) {
          return false;
        }
      }
      return true;
    };

    var isCommentValid = function (comment) {
      var commentArr = comment.split('');
      if (commentArr.length > 140) {
        return false;
      }
      return true;
    };


    imgUploadSubmitBtn.addEventListener('click', function () {
      if (!isAllHashTagsValid(window.util.hashtagInput.value)) {
        window.util.hashtagInput.setCustomValidity('Неверный формат тега');
      } else {
        window.util.hashtagInput.setCustomValidity('');
      }

      if (!isCommentValid(window.util.commentInput.value)) {
        window.util.commentInput.setCustomValidity('Длина комментария слишком большая');
      } else {
        window.util.commentInput.setCustomValidity('');
      }
    });
  };
  var removeHashtags = function () {
    window.util.imgUploadSubmitBtn.removeEventListener('click', function () {});
  };
  window.uploadFormHashtags = {
    addHashtags: addHashtags,
    removeHashtags: removeHashtags
  };
})();
