'use strict';

(function () {

  var photoContainer = document.querySelector('.ad-form__photo-container');

  photoContainer.addEventListener('dragstart', function (evt) {
    var target = evt.target.parentElement;

    evt.dataTransfer.setData('html', target.innerHTML);

    target.classList.add('hiddenElem');
  });

  photoContainer.addEventListener('dragenter', function (evt) {
    var target = evt.target.parentElement;

    if (!target.matches('.ad-form__photo') && !target.matches('.ad-form__upload')) return;

    var oldPlaceholder = photoContainer.querySelector('.placeholder');
    if (oldPlaceholder) {
      photoContainer.removeChild(oldPlaceholder);
    }

    var placeholder = document.createElement('div');
    placeholder.classList.add('placeholder');
    target.insertAdjacentElement('afterEnd', placeholder);
  });

  photoContainer.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    photoContainer.style.outline = '2px dashed #ff6d51';
  });

  photoContainer.addEventListener('dragleave', function () {
    photoContainer.style.outline = '';
  });

  photoContainer.addEventListener('drop', function (evt) {
    photoContainer.style.outline = '';

    var hiddenElement = photoContainer.querySelector('.hiddenElem');
    var placeholder = photoContainer.querySelector('.placeholder');

    photoContainer.removeChild(hiddenElement);

    placeholder.innerHTML = evt.dataTransfer.getData('html');
    placeholder.classList.remove('placeholder');
    placeholder.classList.add('ad-form__photo');
  });

  photoContainer.addEventListener('dragend', function (evt) {
    evt.preventDefault();
    var hiddenElement = photoContainer.querySelector('.hiddenElem');
    var placeholder = photoContainer.querySelector('.placeholder');

    hiddenElement.classList.remove('hiddenElem');
    photoContainer.removeChild(placeholder);
  });

})();
