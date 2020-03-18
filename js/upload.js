'use strict';

(function () {
  var REQUEST_TIMEOUT_MS = 10000;
  var SUCCESS_STATUS = 200;
  var URL = 'https://js.dump.academy/kekstagram';

  window.upload = function (data, onSucess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = REQUEST_TIMEOUT_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSucess();
      } else {
        onError();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

})();
