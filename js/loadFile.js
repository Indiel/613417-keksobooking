'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];

  var photoContainer = document.querySelector('.ad-form__photo-container');
  var fileChooserPhotos = document.querySelector('#images');
  var previewPhoto = document.querySelector('.ad-form__photo');

  var fileChooserAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var checkCorrectFiles = function (files) {
    var correctFiles = [].filter.call(files, function (file) {
      for (var i = 0; i < files.length; i++) {
        return FILE_TYPES.some(function (type) {
          return file.name.toLowerCase().endsWith(type);
        });
      }
    });
    return correctFiles;
  };

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files;
    var correctFiles = checkCorrectFiles(file);

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(correctFiles[0]);
  });

  fileChooserPhotos.addEventListener('change', function () {
    var files = fileChooserPhotos.files;
    var correctFiles = checkCorrectFiles(files);

    if (correctFiles.length >= 1) {

      if (photoContainer.children[1].children.length === 0) {
        window.adPhoto = photoContainer.removeChild(photoContainer.children[1]);
      }

      var readers = [];

      correctFiles.forEach(function (file, i) {
        readers[i] = new FileReader();

        readers[i].addEventListener('load', function () {
          var preview = previewPhoto.cloneNode();
          var img = document.createElement('img');
          img.src = this.result;
          img.width = 70;
          img.height = 70;
          preview.appendChild(img);
          photoContainer.appendChild(preview);
        });

        readers[i].readAsDataURL(file);
      });
    }
  });

})();
