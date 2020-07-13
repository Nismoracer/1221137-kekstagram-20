'use strict';

(function () {

  var filtersSection = document.querySelector('.img-filters');
  var filtersForm = document.querySelector('.img-filters__form');
  var uploadSection = document.querySelector('.img-upload');

  var similarElementTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var uploadWindowOpen = document.querySelector('#upload-file');

  var renderPhotoElement = function (photo) {
    var currentPhoto = similarElementTemplate.cloneNode(true);
    currentPhoto.querySelector('.picture__img').src = photo.url;
    currentPhoto.querySelector('.picture__img').alt = photo.description;
    currentPhoto.querySelector('.picture__comments').textContent = photo.comments.length.toString();
    currentPhoto.querySelector('.picture__likes').textContent = photo.likes;

    return currentPhoto;
  };

  var onFiltersClick = function (evt) {
    var filterButtons = document.querySelectorAll('.img-filters__button');

    for (var i = 0; i < filterButtons.length; i++) {
      if (filterButtons[i].classList.contains('img-filters__button--active')) {
        filterButtons[i].classList.remove('img-filters__button--active');
      }
    }

    evt.target.classList.add('img-filters__button--active');

    switch (evt.target.id) {
      case 'filter-default':
        var cbDefault = window.util.debounce(function () {
          renderPhotosList(window.transmit.receivedPhotos);
        });
        cbDefault(window.transmit.receivedPhotos);
        break;
      case 'filter-random':
        var cbRandom = window.util.debounce(function () {
          window.data.chooseRandomPhotos(renderPhotosList);
        });
        cbRandom(window.transmit.receivedPhotos);
        break;
      case 'filter-discussed':
        var cbPopular = window.util.debounce(function () {
          window.data.sortFromPopularToNot(renderPhotosList);
        });
        cbPopular(renderPhotosList);
        break;
    }
  };

  var renderPhotosList = function (photosArray) {
    var similarListElement = document.querySelector('.pictures');

    while (similarListElement.lastChild !== uploadSection) {
      similarListElement.removeChild(similarListElement.lastChild);
    }

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photosArray.length; i++) {
      fragment.appendChild(renderPhotoElement(photosArray[i]));
    }

    similarListElement.appendChild(fragment);

  };


  window.transmit.exchange(renderPhotosList, window.popup.errorUpload, 'receive');
  filtersSection.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', function (evt) {
    onFiltersClick(evt);
  });

  uploadWindowOpen.addEventListener('change', window.modal.openFilters);

})();
