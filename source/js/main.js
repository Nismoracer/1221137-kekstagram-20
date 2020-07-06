'use strict';

(function () {

  var similarListElement = document.querySelector('.pictures');

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

  var renderPhotosList = function (photosArray) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photosArray.length; i++) {
      fragment.appendChild(renderPhotoElement(photosArray[i]));
    }
    similarListElement.appendChild(fragment);
  };

  window.transmit(renderPhotosList, window.popup.errorUpload, 'receive');

  uploadWindowOpen.addEventListener('change', window.modal.openFilters);

})();
