'use strict';

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

document.querySelector('.map').classList.remove('map--faded');

var template = document.querySelector('template');
var mapPins = document.querySelector('.map__pins');

var renderValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// var renderValue = function (arr) {
//   return arr.splice(Math.round(Math.random() * (arr.length - 1)), 1);
// };

// var advertisementType = function () {
//   if advertisement
// };

var createFeatures = function (arr) {
  var copyArr = arr.slice();
  var featuresElement = [];
  var featuresElementLength = renderValue(0, copyArr.length - 1);
  for (var i = 0; i < featuresElementLength; i++) {
    featuresElement[i] = String(copyArr.splice(renderValue(0, copyArr.length - 1), 1));
  };

  return featuresElement;
};

var renderAdvertisements = function () {
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
  };

  return advertisements;
};

var fillPins = function (advertisement) {

  var pin = template.content.querySelector('.map__pin').cloneNode(true);

  pin.style = 'left: ' + (advertisement.location.x - 25) + 'px; top: ' + (advertisement.location.y - 70) + 'px;';
  pin.querySelector('img').src = advertisement.author;
  pin.querySelector('img').alt = advertisement.title;

  return pin;
};

var createFragment = function (advertisement) {

  var fragment = template.content.querySelector('.map__card').cloneNode(true);

  fragment.querySelector('.popup__avatar').src = advertisement.author;
  fragment.querySelector('.popup__title').textContent = advertisement.offer.title;
  fragment.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  fragment.querySelector('.popup__text--price').textContent = advertisement.offer.price + ' ₽/ночь';
  fragment.querySelector('.popup__type').textContent = advertisement.offer.type;
  fragment.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей.';
  fragment.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout + '.';
  fragment.querySelector('.popup__description').textContent = advertisement.offer.description;

  var features = fragment.querySelector('.popup__features');
  features.textContent = '';
  for (var j = 0; j < advertisement.offer.features.length; j++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + advertisement.offer.features[j]);
    features.appendChild(feature);
  };

  var galleryPhotos = [];
  galleryPhotos[0] = fragment.querySelector('.popup__photo');
  galleryPhotos[0].src = advertisement.offer.photos[0];

  for (var i = 1; i < advertisement.offer.photos.length; i++) {
    galleryPhotos[i] = galleryPhotos[0].cloneNode(true);
    galleryPhotos[i].src = advertisement.offer.photos[i];
    fragment.querySelector('.popup__photos').appendChild(galleryPhotos[i]);
  }

  document.querySelector('.map').insertBefore(fragment, document.querySelector('.map__filters-container'));
};

var createPins = function (arr) {
  var fragment = document.createDocumentFragment();

  for(var i = 0; i < arr.length; i++) {
    fragment.appendChild(fillPins(arr[i]));
  };

  createFragment(arr[0]);

  return mapPins.appendChild(fragment);
};

createPins(renderAdvertisements());
