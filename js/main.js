'use strict';

(function () {

  var filtersSection = document.querySelector('.img-filters');
  var filtersForm = document.querySelector('.img-filters__form');
  var uploadSection = document.querySelector('.img-upload');
  var thumbnails = document.querySelector('.pictures');
  var bigPhoto = document.querySelector('.big-picture');
  var addComments = bigPhoto.querySelector('.social__comments-loader');
  var closePicture = bigPhoto.querySelector('.big-picture__cancel');
  var body = document.querySelector('body');


  var similarElementTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var uploadWindowOpen = document.querySelector('#upload-file');

  var closeBigPicture = function () {
    bigPhoto.classList.add('hidden');
    body.classList.remove('modal-open');
    closePicture.removeEventListener('click', onPictureCloseClick);
    document.removeEventListener('keydown', onPictureEscPress);
    document.removeEventListener('click', onClickOutside);
    addComments.removeEventListener('click', window.preview.addComments);
  };

  var onPictureCloseClick = function (evt) {
    evt.preventDefault();
    closeBigPicture();
  };

  var onPictureEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  };

  var onClickOutside = function (evt) {
    if (evt.target === bigPhoto) {
      closeBigPicture();
    }
  };

  var onThumbnailClick = function (evt) {
    if (evt.target.classList.contains('picture__img')) {
      bigPhoto.classList.remove('hidden');
      body.classList.add('modal-open');
      window.preview.renderBigPhoto(evt.target.src);
      closePicture.addEventListener('click', onPictureCloseClick);
      document.addEventListener('keydown', onPictureEscPress);
      document.addEventListener('click', onClickOutside);
      addComments.addEventListener('click', window.preview.addComments);
    }
  };

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


  window.transmit.exchange(function (xhrElements) {
    renderPhotosList(xhrElements);
    filtersSection.classList.remove('img-filters--inactive');
    filtersForm.addEventListener('click', function (evt) {
      onFiltersClick(evt);
    });
  }, window.popup.errorUpload, 'receive');

  uploadWindowOpen.addEventListener('change', window.modal.openFilters);
  thumbnails.addEventListener('click', onThumbnailClick);

})();
