'use strict';

(function () {

  var template = document.querySelector('template');
  var mapPins = document.querySelector('.map__pins');

  // создание маркера
  var fillPins = function (advertisement) {

    var pin = template.content.querySelector('.map__pin').cloneNode(true);

    pin.style = 'left: ' + (advertisement.location.x - 25) + 'px; top: ' + (advertisement.location.y - 70) + 'px;';
    pin.querySelector('img').src = advertisement.author;
    pin.querySelector('img').alt = advertisement.title;

    pin.addEventListener('click', function () {
      window.map.openPopup(advertisement);
    });

    return pin;
  };

  // отрисовка маркеров на карте
  window.createPins = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(fillPins(arr[i]));
    }

    return mapPins.appendChild(fragment);
  };

})();
