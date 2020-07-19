'use strict';

(function () {

  var MAX_COMMENT_LENGTH = 140;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_HASHTAG_NUMBERS = 5;

  var commentsField = document.querySelector('.text__description');
  var hashTags = document.querySelector('.text__hashtags');

  window.validation = {
    onCommentsInvalidInput: function () {
      if (commentsField.value.length > MAX_COMMENT_LENGTH) {
        commentsField.style.border = '2px solid red';
        commentsField.setCustomValidity('Комментарий должен быть короче ' + MAX_COMMENT_LENGTH + ' символов');
      } else {
        commentsField.style.border = '2px solid #c3c3c3';
        commentsField.setCustomValidity('');
      }
    },

    onHashTagsInvalidInput: function () {
      var hashtagErrorMessage = checkHashTags(hashTags.value);
      if (hashtagErrorMessage !== '') {
        hashTags.style.border = '2px solid red';
        hashTags.setCustomValidity(hashtagErrorMessage);
      } else {
        hashTags.style.border = '2px solid #c3c3c3';
        hashTags.setCustomValidity('');
      }
    }
  };

  var checkHashTags = function (inputString) {
    var i;
    var j;
    var sameTags = false;
    var errors = [];
    var inputHashTags = [];
    var hashTagMask = /^#[a-zA-Z]+/;
    var resultErrorString = '';

    if (inputString === '') {
      return resultErrorString;
    }

    var temporaryString = inputString.replace(/ +/g, ' ').trim();
    inputHashTags = temporaryString.split(' ');
    if (inputHashTags.length > MAX_HASHTAG_NUMBERS) {
      errors.push('Количество хештегов не больше ' + MAX_HASHTAG_NUMBERS);
    }
    for (i = 0; i < inputHashTags.length; i++) {
      if (inputHashTags[i].length > MAX_HASHTAG_LENGTH) {
        errors.push('Длина хештега не больше ' + MAX_HASHTAG_LENGTH + ' символов');
        break;
      }
    }
    for (i = 0; i < inputHashTags.length; i++) {
      if (!sameTags) {
        for (j = i + 1; j < inputHashTags.length; j++) {
          if (inputHashTags[i] === inputHashTags[j]) {
            sameTags = true;
            break;
          }
        }
      } else {
        errors.push('Хештеги не должны повторяться');
        break;
      }
    }
    for (i = 0; i < inputHashTags.length; i++) {
      if (inputHashTags[i] === '#') {
        errors.push('Хештег не должен быть пустым');
        break;
      } else if (!inputHashTags[i].match(hashTagMask)) {
        errors.push('Хештег начинается с #, и состоит из англ. букв');
        break;
      } else if (inputHashTags[i].match(hashTagMask)[0] !== inputHashTags[i]) {
        errors.push('Хештег начинается с #, и состоит из англ. букв');
        break;
      }
    }

    resultErrorString = errors.join(', ');
    return resultErrorString;
  };

})();
