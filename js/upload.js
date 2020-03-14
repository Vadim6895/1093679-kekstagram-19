'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  window.upload = function (data, onSucess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSucess(xhr.status);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

})();
