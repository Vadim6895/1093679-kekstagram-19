'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  window.load = function (onSucess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      onSucess(xhr.response);
    });

    xhr.send();

  };
})();
