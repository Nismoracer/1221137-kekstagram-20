'use strict';
(function () {
  var URL_RECEIVE = 'https://javascript.pages.academy/kekstagram/data';
  var URL_SEND = 'https://javascript.pages.academy/kekstagram';
  var StatusCode = {
    OK: 200
  };

  window.transmit = function (onSuccess, onError, flag, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        if (flag === 'send') {
          onError();
        } else {
          onError('Ошибка загрузки фотографий', 'Понятно');
        }
      }
    });

    if (flag === 'receive') {
      xhr.open('GET', URL_RECEIVE);
      xhr.send();
    } else if (flag === 'send') {
      xhr.open('POST', URL_SEND);
      xhr.send(data);
    }
  };
})();
