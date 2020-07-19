'use strict';

(function () {

  var filtersSection = document.querySelector('.img-filters');
  var uploadSection = document.querySelector('.img-upload');
  var thumbnails = document.querySelector('.pictures');
  var bigPhoto = document.querySelector('.big-picture');
  var addComments = bigPhoto.querySelector('.social__comments-loader');
  var closePicture = bigPhoto.querySelector('.big-picture__cancel');
  var body = document.querySelector('body');
  var defaultFilter = document.querySelector('#filter-default');
  var randomFilter = document.querySelector('#filter-random');
  var discussedFilter = document.querySelector('#filter-discussed');

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
    addComments.removeEventListener('click', window.preview.onUploadCommentsClick);
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
      addComments.addEventListener('click', window.preview.onUploadCommentsClick);
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

  var switchActiveFilter = function (isActive) {
    switch (isActive) {
      case 'default':
        defaultFilter.classList.add('img-filters__button--active');
        randomFilter.classList.remove('img-filters__button--active');
        discussedFilter.classList.remove('img-filters__button--active');
        break;
      case 'random':
        defaultFilter.classList.remove('img-filters__button--active');
        randomFilter.classList.add('img-filters__button--active');
        discussedFilter.classList.remove('img-filters__button--active');
        break;
      case 'discussed':
        defaultFilter.classList.remove('img-filters__button--active');
        randomFilter.classList.remove('img-filters__button--active');
        discussedFilter.classList.add('img-filters__button--active');
        break;
    }
  };

  var onDefaultFilterClick = window.util.debounce(function () {
    switchActiveFilter('default');
    renderPhotosList(window.transmit.receivedPhotos);
  });

  var onRandomFilterClick = window.util.debounce(function () {
    switchActiveFilter('random');
    window.data.chooseRandomPhotos(renderPhotosList);
  });

  var onDiscussedFilterClick = window.util.debounce(function () {
    switchActiveFilter('discussed');
    window.data.sortFromPopularToNot(renderPhotosList);
  });

  var renderPhotosList = function (photos) {
    var similarListElement = document.querySelector('.pictures');

    while (similarListElement.lastChild !== uploadSection) {
      similarListElement.removeChild(similarListElement.lastChild);
    }

    var fragment = document.createDocumentFragment();

    photos.forEach(function (it) {
      fragment.appendChild(renderPhotoElement(it));
    });
    similarListElement.appendChild(fragment);
  };


  window.transmit.exchange(function (xhrElements) {
    renderPhotosList(xhrElements);
    filtersSection.classList.remove('img-filters--inactive');
    defaultFilter.addEventListener('click', onDefaultFilterClick);
    randomFilter.addEventListener('click', onRandomFilterClick);
    discussedFilter.addEventListener('click', onDiscussedFilterClick);
  }, window.popup.errorUpload, 'receive');

  uploadWindowOpen.addEventListener('change', window.modal.onUploadPhotoPress);
  thumbnails.addEventListener('click', onThumbnailClick);

})();
