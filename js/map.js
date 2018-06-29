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

var template = document.querySelector('template');
var mapPins = document.querySelector('.map__pins');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === 27) {
    closePopup();
  }
};

var openPopup = function (element) {
  if (document.querySelector('.map__card')) {
    document.querySelector('.map__card').remove();
  }

  createFragment(element);

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  document.querySelector('.map__card').remove();
  document.removeEventListener('keydown', onPopupEscPress);
};

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

// создание объектов, соответствующих другим предложениям
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
  }

  return advertisements;
};

// создание маркера
var fillPins = function (advertisement) {

  var pin = template.content.querySelector('.map__pin').cloneNode(true);

  pin.style = 'left: ' + (advertisement.location.x - 25) + 'px; top: ' + (advertisement.location.y - 70) + 'px;';
  pin.querySelector('img').src = advertisement.author;
  pin.querySelector('img').alt = advertisement.title;

  pin.addEventListener('click', function () {
    openPopup(advertisement);
  });

  return pin;
};

// отрисовка карточки
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
  }

  var galleryPhotos = [];
  galleryPhotos[0] = fragment.querySelector('.popup__photo');
  galleryPhotos[0].src = advertisement.offer.photos[0];

  for (var i = 1; i < advertisement.offer.photos.length; i++) {
    galleryPhotos[i] = galleryPhotos[0].cloneNode(true);
    galleryPhotos[i].src = advertisement.offer.photos[i];
    fragment.querySelector('.popup__photos').appendChild(galleryPhotos[i]);
  }

  var closeButton = fragment.querySelector('.popup__close');
  closeButton.addEventListener('click', closePopup);

  document.querySelector('.map').insertBefore(fragment, document.querySelector('.map__filters-container'));
};

// отрисовка маркеров на карте
var createPins = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(fillPins(arr[i]));
  }

  return mapPins.appendChild(fragment);
};

var fieldsets = document.querySelectorAll('fieldset');
for (var i = 0; i < fieldsets.length; i++) {
  fieldsets[i].disabled = true;
}

var mapFilters = document.querySelectorAll('.map__filter');
for (var k = 0; k < mapFilters.length; k++) {
  mapFilters[k].disabled = true;
}

var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');

var addressInput = document.querySelector('#address');
addressInput.value = (mainPin.offsetLeft + 32) + ', ' + (mainPin.offsetTop + 32);

var onMainPinActiveteSite = function () {
  document.querySelector('.map').classList.remove('map--faded');
  createPins(renderAdvertisements());
  for (var j = 0; j < fieldsets.length; j++) {
    fieldsets[j].disabled = false;
  }
  for (var l = 0; l < mapFilters.length; l++) {
    mapFilters[l].disabled = false;
  }
  addressInput.value = (mainPin.offsetLeft + 32) + ', ' + (mainPin.offsetTop + 87);
  adForm.classList.remove('ad-form--disabled');
  mainPin.removeEventListener('mouseup', onMainPinActiveteSite);

  onformRoomChange();
};

mainPin.addEventListener('mouseup', onMainPinActiveteSite);

var formTitle = adForm.querySelector('#title');

formTitle.addEventListener('input', function () {
  if (formTitle.value.length < 30) {
    formTitle.setCustomValidity('Имя должно состоять минимум из 30 символов. Введено: ' + formTitle.value.length);
    formTitle.style.border = '2px solid red';
  } else if (formTitle.value.length > 100) {
    formTitle.setCustomValidity('Имя не должно превышать 100 символов. Введено: ' + formTitle.value.length);
    formTitle.style.border = '2px solid red';
  } else {
    formTitle.setCustomValidity('');
    formTitle.style.border = '';
  }
});

var formType = adForm.querySelector('#type');
var formPrice = adForm.querySelector('#price');

var onformTypeChange = function () {
  formPrice.setCustomValidity('');
  formPrice.style.border = '';
  switch (formType.value) {
    case 'flat':
      formPrice.min = 1000;
      if (formPrice < formPrice.min) {
        formPrice.setCustomValidity('Для типа жилья ' + formType['1'].textContent + ' цена должна быть не ниже ' + formPrice.min + '.');
        formPrice.style.border = '2px solid red';
      }
    break;
    case 'house':
      formPrice.min = 5000;
      if (formPrice < formPrice.min) {
        formPrice.setCustomValidity('Для типа жилья ' + formType['2'].textContent + ' цена должна быть не ниже ' + formPrice.min + '.');
        formPrice.style.border = '2px solid red';
      }
    break;
    case 'palace':
      formPrice.min = 10000;
      if (formPrice < formPrice.min) {
        formPrice.setCustomValidity('Для типа жилья ' + formType['3'].textContent + ' цена должна быть не ниже ' + formPrice.min + '.');
        formPrice.style.border = '2px solid red';
      }
    break;
    case 'bungalo':
      formPrice.min = 0;
      if (formPrice < formPrice.min) {
        formPrice.setCustomValidity('Для типа жилья ' + formType['0'].textContent + ' цена должна быть не ниже ' + formPrice.min + '.');
        formPrice.style.border = '2px solid red';
      }
    break;
  }
};

formType.addEventListener('input', onformTypeChange);
formPrice.addEventListener('input', onformTypeChange);

var timein = adForm.querySelector('#timein');
var timeout = adForm.querySelector('#timeout');
var formTimes = [timein, timeout];

var onformTimesChange = function (target) {
  var targetElement = formTimes.indexOf(target);
  var anotherElement;
  if (targetElement === 0) {
    anotherElement = 1;
  } else {
    anotherElement = 0;
  }

  if (formTimes[targetElement].value === '12:00') {
    formTimes[anotherElement].value = '12:00';
  } else if (formTimes[targetElement].value === '13:00') {
    formTimes[anotherElement].value = '13:00';
  } else if (formTimes[targetElement].value === '14:00') {
    formTimes[anotherElement].value = '14:00';
  }
};

timein.addEventListener('change', function (evt) {
  var target = eval(evt.target.name);
  onformTimesChange(target);
});

timeout.addEventListener('change', function (evt) {
  var target = eval(evt.target.name);
  onformTimesChange(target);
});

var formRoom = adForm.querySelector('#room_number');
var formCapacity = adForm.querySelector('#capacity');

var onformRoomChange = function () {
  switch (formRoom.value) {
    case '100':
      for (var i = 0; i < formCapacity.children.length - 1; i++) {
        formCapacity.children[i].disabled = true;
      }
      formCapacity.children[3].disabled = false;
      formCapacity.children[3].selected = true;
    break;
    case '1':
      for (var i = 0; i < formCapacity.children.length; i++) {
        formCapacity.children[i].disabled = true;
      }
      formCapacity.children[2].disabled = false;
      formCapacity.children[2].selected = true;
    break;
    case '2':
      for (var i = 0; i < formCapacity.children.length; i++) {
        formCapacity.children[i].disabled = true;
      }
      formCapacity.children[1].disabled = false;
      formCapacity.children[2].disabled = false;
      formCapacity.children[1].selected = true;
    break;
    case '3':
      for (var i = 0; i < formCapacity.children.length; i++) {
        formCapacity.children[i].disabled = false;
      }
      formCapacity.children[3].disabled = true;
      formCapacity.children[0].selected = true;
    break;
  }
};

formRoom.addEventListener('change', function () {
  onformRoomChange();
});

adForm.addEventListener('invalid', function (evt) {
  if (evt.target.localName === 'input') {
    evt.target.style.border = '2px solid red';
  }
}, true);
