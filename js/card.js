'use strict';

(function () {

  var template = document.querySelector('template');

  // отрисовка карточки
  window.createFragment = function (advertisement) {

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
    closeButton.addEventListener('click', window.map.closePopup);

    document.querySelector('.map').insertBefore(fragment, document.querySelector('.map__filters-container'));
  };

})();
