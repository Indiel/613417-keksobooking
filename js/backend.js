'use strict';

(function () {

  var URL_DOWNLOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  var getResponseStatus = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });

    xhr.timeout = 10000;
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });
  };

  window.backend = {
    onError: function (message) {
      document.body.insertAdjacentHTML('afterbegin', '<div class="error-substrate"><div class="error-wrap"><div class="error-message"></div></div></div>');

      var errorMessage = document.querySelector('.error-message');
      errorMessage.textContent = message;

      var hideError = function () {
        document.body.removeChild(document.querySelector('.error-substrate'));
      };

      setTimeout(hideError, 3000);
    },
    download: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      getResponseStatus(xhr, onLoad, onError);

      xhr.open('GET', URL_DOWNLOAD);
      xhr.send();
    },
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      getResponseStatus(xhr, onLoad, onError);

      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    }
  };
})();
