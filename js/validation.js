'use strict';

(function () {

  var MAX_COMMENT_LENGTH = 10;

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
    var errorsArray = [];
    var inputArray = [];
    var hashTagMask = /^#[a-zA-Z]+/;
    var resultErrorString = '';

    if (inputString === '') {
      return resultErrorString;
    }

    var temporaryString = inputString.replace(/ +/g, ' ').trim();
    inputArray = temporaryString.split(' ');
    if (inputArray.length > 5) {
      errorsArray.push('Количество хештегов не больше 5');
    }
    for (i = 0; i < inputArray.length; i++) {
      if (inputArray[i].length > 20) {
        errorsArray.push('Длина хештега не больше 20 символов');
        break;
      }
    }
    for (i = 0; i < inputArray.length; i++) {
      if (!sameTags) {
        for (j = i + 1; j < inputArray.length; j++) {
          if (inputArray[i] === inputArray[j]) {
            sameTags = true;
            break;
          }
        }
      } else {
        errorsArray.push('Хештеги не должны повторяться');
        break;
      }
    }
    for (i = 0; i < inputArray.length; i++) {
      if (inputArray[i] === '#') {
        errorsArray.push('Хештег не должен быть пустым');
        break;
      } else if (!inputArray[i].match(hashTagMask)) {
        errorsArray.push('Хештег начинается с #, и состоит из англ. букв');
        break;
      } else if (inputArray[i].match(hashTagMask)[0] !== inputArray[i]) {
        errorsArray.push('Хештег начинается с #, и состоит из англ. букв');
        break;
      }
    }

    resultErrorString = errorsArray.join(', ');
    return resultErrorString;
  };

})();
