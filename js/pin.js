'use strict';

(function () {

  var template = document.querySelector('template');
  var mapPins = document.querySelector('.map__pins');

  // создание маркера
  var fillPins = function (advertisement) {

    var pin = template.content.querySelector('.map__pin').cloneNode(true);

    pin.style = 'left: ' + (advertisement.location.x - 25) + 'px; top: ' + (advertisement.location.y - 70) + 'px;';
    pin.querySelector('img').src = advertisement.author.avatar;
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

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var mapFeature = document.querySelectorAll('.map__checkbox');

  var mapFilter = document.querySelector('.map__filters');

  mapFilter.addEventListener('change', function () {

    var pins = mapPins.querySelectorAll('button[type="button"]');
    for (var i = 0; i < pins.length; i++) {
      mapPins.removeChild(pins[i]);
    }

    var stringToPrice = {
      'low': function (price) {
        return price < 10000 ? true : false;
      },
      'middle': function (price) {
        return price >= 10000 && price <= 50000 ? true : false;
      },
      'high': function (price) {
        return price > 50000 ? true : false;
      },
      'any': function () {
        return true;
      }
    };

    var checkedFeature = [].filter.call(mapFeature, function (feature) {
      return feature.checked === true;
    }).map (function (feature) {
      return feature.value;
    });

    var reviewFeature = function (features) {
      var count = 0;
      features.forEach(function (item) {
        checkedFeature.forEach(function (itemCheck) {
          if (item === itemCheck) {
            count ++;
          }
        });
      });
      return count === checkedFeature.length ? true : false;
    };

    var filterArr = window.adverts.filter(function (advert) {
      if ((housingType.value === advert.offer.type || housingType.value === 'any')
        && stringToPrice[housingPrice.value](advert.offer.price)
        && (Number(housingRooms.value) === advert.offer.rooms || housingRooms.value === 'any')
        && (Number(housingGuests.value) === advert.offer.guests || housingGuests.value === 'any')
        && reviewFeature(advert.offer.features)) {
          return advert;
        }
    });
    window.createPins(filterArr);
  });

})();
