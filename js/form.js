'use strict';

(function () {

  // валидация
  var adForm = document.querySelector('.ad-form');
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
    switch (formType.value) {
      case 'flat':
        formPrice.min = 1000;
        if (Number(formPrice.value) < Number(formPrice.min)) {
          formPrice.setCustomValidity('Для типа жилья ' + formType['1'].textContent + ' цена должна быть не ниже ' + formPrice.min + '.');
          formPrice.style.border = '2px solid red';
        } else {
          formPrice.setCustomValidity('');
          formPrice.style.border = '';
        }
        break;
      case 'house':
        formPrice.min = 5000;
        if (Number(formPrice.value) < Number(formPrice.min)) {
          formPrice.setCustomValidity('Для типа жилья ' + formType['2'].textContent + ' цена должна быть не ниже ' + formPrice.min + '.');
          formPrice.style.border = '2px solid red';
        } else {
          formPrice.setCustomValidity('');
          formPrice.style.border = '';
        }
        break;
      case 'palace':
        formPrice.min = 10000;
        if (Number(formPrice.value) < Number(formPrice.min)) {
          formPrice.setCustomValidity('Для типа жилья ' + formType['3'].textContent + ' цена должна быть не ниже ' + formPrice.min + '.');
          formPrice.style.border = '2px solid red';
        } else {
          formPrice.setCustomValidity('');
          formPrice.style.border = '';
        }
        break;
      case 'bungalo':
        formPrice.min = 0;
        if (Number(formPrice.value) < Number(formPrice.min)) {
          formPrice.setCustomValidity('Для типа жилья ' + formType['0'].textContent + ' цена должна быть не ниже ' + formPrice.min + '.');
          formPrice.style.border = '2px solid red';
        } else {
          formPrice.setCustomValidity('');
          formPrice.style.border = '';
        }
        break;
    }
  };

  formType.addEventListener('change', onformTypeChange);
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
    // var target = eval(evt.target.name);
    var target = window[evt.target.name];
    onformTimesChange(target);
  });

  timeout.addEventListener('change', function (evt) {
    // var target = eval(evt.target.name);
    var target = window[evt.target.name];
    onformTimesChange(target);
  });

  var formRoom = adForm.querySelector('#room_number');
  var formCapacity = adForm.querySelector('#capacity');

  window.onformRoomChange = function () {
    switch (formRoom.value) {
      case '100':
        for (var m = 0; m < formCapacity.children.length - 1; m++) {
          formCapacity.children[m].disabled = true;
        }
        formCapacity.children[3].disabled = false;
        formCapacity.children[3].selected = true;
        break;
      case '1':
        for (var j = 0; j < formCapacity.children.length; j++) {
          formCapacity.children[j].disabled = true;
        }
        formCapacity.children[2].disabled = false;
        formCapacity.children[2].selected = true;
        break;
      case '2':
        for (var t = 0; t < formCapacity.children.length; t++) {
          formCapacity.children[t].disabled = true;
        }
        formCapacity.children[1].disabled = false;
        formCapacity.children[2].disabled = false;
        formCapacity.children[1].selected = true;
        break;
      case '3':
        for (var l = 0; l < formCapacity.children.length; l++) {
          formCapacity.children[l].disabled = false;
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

  // кнопка очистить
  var reset = adForm.querySelector('.ad-form__reset');

  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  reset.addEventListener('click', function (evt) {
    evt.preventDefault();
    adForm.reset();

    formTitle.style.border = '';
    formPrice.style.border = '';
    formTitle.setCustomValidity('');
    formPrice.setCustomValidity('');
    mainPin.style.left = 570 + 'px';
    mainPin.style.top = 375 + 'px';
    addressInput.value = (570 + 32) + ', ' + (375 + 85);
    window.onformRoomChange();
  });

})();
