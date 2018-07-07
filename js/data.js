// Это старый модуль с моковыми данными, которые подставлялись вместо объектов с сервера

'use strict';

(function () {

  var TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var renderValue = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var createFeatures = function (arr) {
    var copyArr = arr.slice();
    var featuresElement = [];
    var featuresElementLength = renderValue(0, copyArr.length - 1);

    for (var i = 0; i < featuresElementLength; i++) {
      featuresElement[i] = String(copyArr.splice(renderValue(0, copyArr.length - 1), 1));
    }

    return featuresElement;
  };

  var mapPins = document.querySelector('.map__pins');

  // создание объектов, соответствующих другим предложениям
  window.renderAdvertisements = function () {
    var advertisements = [];

    var locationX;
    var locationY;

    for (var i = 0; i < 8; i++) {
      locationX = renderValue(0, mapPins.clientWidth);
      locationY = renderValue(130, 630);

      advertisements[i] = {
        author: 'img/avatars/user0' + (i + 1) + '.png',
        offer: {
          title: TITLES.splice(renderValue(0, TITLES.length - 1), 1),
          address: locationX + ', ' + locationY,
          price: renderValue(1000, 1000000),
          type: TYPES[Object.keys(TYPES)[renderValue(0, Object.keys(TYPES).length - 1)]],
          rooms: renderValue(1, 5),
          guests: renderValue(1, 10),
          checkin: TIMES[renderValue(0, TIMES.length - 1)],
          checkout: TIMES[renderValue(0, TIMES.length - 1)],
          features: createFeatures(FEATURES),
          description: '',
          photos: PHOTOS
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
    }

    return advertisements;
  };

})();
