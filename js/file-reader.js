'use strict';
(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imgInputFile = document.querySelector('.img-upload__input');
  var preview = document.querySelector('.img-upload__preview').querySelector('img');

  imgInputFile.addEventListener('change', function () {
    var file = imgInputFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

})();
