'use strict';

(function () {
  var REQUEST_TIMEOUT_MS = 10000;
  var SUCCESS_STATUS = 200;
  var URL = 'https://js.dump.academy/kekstagram/data';

  function getData(onSucess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUEST_TIMEOUT_MS;

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSucess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.send();
  }

  function showError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.load = {
    getData: getData,
    showError: showError
  };
})();
