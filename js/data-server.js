'use strict';

(function () {

  window.dataServer = function (onSucess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');

    xhr.addEventListener('load', function () {
      onSucess(xhr.response);
    });

    xhr.send();

  };
})();
