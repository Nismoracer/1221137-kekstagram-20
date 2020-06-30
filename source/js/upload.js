'use strict';

(function () {

  var body = document.querySelector('body');
  var uploadWindow = document.querySelector('.img-upload');
  var form = uploadWindow.querySelector('.img-upload__form');
  var filtersWindow = uploadWindow.querySelector('.img-upload__overlay');
  var uploadWindowOpen = uploadWindow.querySelector('#upload-file');
  var uploadWindowClose = uploadWindow.querySelector('#upload-cancel');
  var hashTags = uploadWindow.querySelector('.text__hashtags');
  var commentsField = uploadWindow.querySelector('.text__description');
  var valueHandle = uploadWindow.querySelector('.effect-level__pin');
  var effectsList = uploadWindow.querySelector('.effects__list');
  var scaleSmaller = document.querySelector('.scale__control--smaller');
  var scaleBigger = document.querySelector('.scale__control--bigger');

  var onFiltersEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      if (commentsField !== document.activeElement && hashTags !== document.activeElement) {
        closeFilters();
      }
    }
  };

  var onCommentsInvalidInput = function () {
    if (commentsField.value.length > window.Parameters.MAX_COMMENT_LENGTH) {
      commentsField.style.border = '2px solid red';
      commentsField.setCustomValidity('Комментарий должен быть короче ' + window.Parameters.MAX_COMMENT_LENGTH + ' символов');
    } else {
      commentsField.style.border = '2px solid #c3c3c3';
      commentsField.setCustomValidity('');
    }
  };

  var onHashTagsInvalidInput = function () {
    var hashtagErrorMessage = window.validation.checkHashTags(hashTags.value);
    if (hashtagErrorMessage !== '') {
      hashTags.style.border = '2px solid red';
      hashTags.setCustomValidity(hashtagErrorMessage);
    } else {
      hashTags.style.border = '2px solid #c3c3c3';
      hashTags.setCustomValidity('');
    }
  };

  var openFilters = function () {
    filtersWindow.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onFiltersEscPress);
    uploadWindowClose.addEventListener('click', closeFilters);
    commentsField.addEventListener('input', onCommentsInvalidInput);
    hashTags.addEventListener('input', onHashTagsInvalidInput);
    valueHandle.addEventListener('mousedown', window.effects.onValueMove);
    window.effects.initializeEffects();
    effectsList.addEventListener('change', window.effects.onEffectsPress);
    window.scale.initializeScale();
    scaleSmaller.addEventListener('click', window.scale.onScaleSmaller);
    scaleBigger.addEventListener('click', window.scale.onScaleBigger);
  };

  var closeFilters = function () {
    filtersWindow.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onFiltersEscPress);
    uploadWindowClose.removeEventListener('click', closeFilters);
    commentsField.removeEventListener('input', onCommentsInvalidInput);
    hashTags.removeEventListener('input', onHashTagsInvalidInput);
    valueHandle.removeEventListener('mousedown', window.effects.onValueMove);
    effectsList.removeEventListener('change', window.effects.onEffectsPress);
    scaleSmaller.removeEventListener('click', window.scale.onScaleSmaller);
    scaleBigger.removeEventListener('click', window.scale.onScaleBigger);
    form.reset();
  };

  uploadWindowOpen.addEventListener('change', openFilters);

})();
