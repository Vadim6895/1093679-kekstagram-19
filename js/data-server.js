'use strict';

(function () {

  window.dataServer = function (onSucess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
    window.a = 1;
    console.log(a);
    xhr.addEventListener('load', function () {
      onSucess(xhr.response);
      a = xhr.response;
      console.log(a);
    });

    xhr.send();
    console.log(a);


  };

  // window.dataServerXHR = {
  //  dataServer: dataServer
  // };
})();
