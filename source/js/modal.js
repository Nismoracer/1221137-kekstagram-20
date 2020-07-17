'use strict';

(function () {

  var body = document.querySelector('body');
  var uploadWindow = document.querySelector('.img-upload');
  var form = uploadWindow.querySelector('.img-upload__form');
  var filtersWindow = uploadWindow.querySelector('.img-upload__overlay');
  var uploadWindowClose = uploadWindow.querySelector('#upload-cancel');
  var hashTags = uploadWindow.querySelector('.text__hashtags');
  var commentsField = uploadWindow.querySelector('.text__description');
  var valueHandle = uploadWindow.querySelector('.effect-level__pin');
  var effectsList = uploadWindow.querySelector('.effects__list');
  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.img-upload__start input[type=file]');
  var preview = document.querySelector('.img-upload__preview img');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var successfullUpload = function () {
    closeFilters();
    window.popup.successUpload();
  };

  var errorUpload = function () {
    closeFilters();
    window.popup.errorUpload();
  };

  var onFormSubmit = function (evt) {
    window.transmit.exchange(successfullUpload, errorUpload, 'send', new FormData(form));
    evt.preventDefault();
  };

  window.modal = {
    openFilters: function () {
      filtersWindow.classList.remove('hidden');
      body.classList.add('modal-open');
      document.addEventListener('keydown', onFiltersEscPress);
      uploadWindowClose.addEventListener('click', closeFilters);
      commentsField.addEventListener('input', window.validation.onCommentsInvalidInput);
      hashTags.addEventListener('input', window.validation.onHashTagsInvalidInput);
      valueHandle.addEventListener('mousedown', window.effects.onValueMove);
      window.effects.initializeEffects();
      effectsList.addEventListener('change', window.effects.onEffectsPress);
      window.scale.initializeScale();
      scaleSmaller.addEventListener('click', window.scale.onScaleSmaller);
      scaleBigger.addEventListener('click', window.scale.onScaleBigger);
      form.addEventListener('submit', onFormSubmit);
    }
  };

  var onFiltersEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      if (commentsField !== document.activeElement && hashTags !== document.activeElement) {
        closeFilters();
      }
    }
  };

  var closeFilters = function () {
    filtersWindow.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onFiltersEscPress);
    uploadWindowClose.removeEventListener('click', closeFilters);
    commentsField.removeEventListener('input', window.validation.onCommentsInvalidInput);
    hashTags.removeEventListener('input', window.validation.onHashTagsInvalidInput);
    valueHandle.removeEventListener('mousedown', window.effects.onValueMove);
    effectsList.removeEventListener('change', window.effects.onEffectsPress);
    scaleSmaller.removeEventListener('click', window.scale.onScaleSmaller);
    scaleBigger.removeEventListener('click', window.scale.onScaleBigger);
    form.removeEventListener('submit', onFormSubmit);
    form.reset();
  };

})();
