'use strict';

(function () {
  var MAX_HASH_TAG_LENGTH = 20;
  var MAX_HASH_TAGS_NUMBER = 5;
  var MAX_COMMENT_LENGTH = 140;

  var imgUploadSubmitBtn = document.querySelector('.img-upload__submit');
  var regex = /^#[a-zA-Za-яА-я0-Я0-9]+$/;

  var isHashTagValid = function (tag) {
    if (tag.length > MAX_HASH_TAG_LENGTH) {
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

    if (tagsNoSpaces.length > MAX_HASH_TAGS_NUMBER) {
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
    var commentsArr = comment.split('');
    if (commentsArr.length > MAX_COMMENT_LENGTH) {
      return false;
    }
    return true;
  };

  var getValidHashtag = function () {
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
  };

  var initialize = function () {
    imgUploadSubmitBtn.addEventListener('click', getValidHashtag);
  };

  var reset = function () {
    imgUploadSubmitBtn.removeEventListener('click', getValidHashtag);
  };

  window.uploadFormHashtags = {
    initialize: initialize,
    reset: reset
  };
})();
