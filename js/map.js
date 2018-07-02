'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      window.map.closePopup();
    }
  };

  window.map = {
    openPopup: function (element) {
      if (document.querySelector('.map__card')) {
        document.querySelector('.map__card').remove();
      }

      window.createFragment(element);

      document.addEventListener('keydown', onPopupEscPress);
    },
    closePopup: function () {
      document.querySelector('.map__card').remove();
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var fieldsets = document.querySelectorAll('fieldset');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].disabled = true;
  }

  var mapFilters = document.querySelectorAll('.map__filter');
  for (var k = 0; k < mapFilters.length; k++) {
    mapFilters[k].disabled = true;
  }

  // движение пина
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  var addressInput = document.querySelector('#address');
  addressInput.value = (mainPin.offsetLeft + 32) + ', ' + (mainPin.offsetTop + 32);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMainPinActiveteSite = function () {
      document.querySelector('.map').classList.remove('map--faded');
      window.createPins(window.renderAdvertisements());
      for (var j = 0; j < fieldsets.length; j++) {
        fieldsets[j].disabled = false;
      }
      for (var l = 0; l < mapFilters.length; l++) {
        mapFilters[l].disabled = false;
      }
      addressInput.value = (mainPin.offsetLeft + 32) + ', ' + (mainPin.offsetTop + 85);
      adForm.classList.remove('ad-form--disabled');
      mainPin.removeEventListener('mouseup', onMainPinActiveteSite);

      window.onformRoomChange();
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinCoords = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      if (pinCoords.y >= (130 - 65) && pinCoords.y <= 630) {
        mainPin.style.left = pinCoords.x + 'px';
        mainPin.style.top = pinCoords.y + 'px';
        addressInput.value = (pinCoords.x + 32) + ', ' + (pinCoords.y + 85);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      mapPins.removeEventListener('mousemove', onMouseMove);
      mapPins.removeEventListener('mouseup', onMouseUp);
    };

    if (document.querySelector('.map').classList.contains('map--faded')) {
      onMainPinActiveteSite();
    }

    mapPins.addEventListener('mousemove', onMouseMove);
    mapPins.addEventListener('mouseup', onMouseUp);
  });

})();
