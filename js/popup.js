'use strict';

(function () {
  var main = document.querySelector('main');
  var addedPopup;

  var closePopup = function () {
    document.removeEventListener('click', onOutborderClick);
    document.removeEventListener('keydown', onPopupEscPress);
    main.removeChild(addedPopup);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  var onOutborderClick = function (evt) {
    if (evt.target === addedPopup) {
      closePopup();
    }
  };

  window.popup = {

    successUpload: function () {
      var successTemplate = document.querySelector('#success')
        .content
        .querySelector('.success');
      var popupWindow = successTemplate.cloneNode(true);
      addedPopup = main.appendChild(popupWindow);
      var successButton = addedPopup.querySelector('.success__button');
      document.addEventListener('keydown', onPopupEscPress);
      document.addEventListener('click', onOutborderClick);
      successButton.addEventListener('click', function () {
        main.removeChild(addedPopup);
      });
    },

    errorUpload: function (message, button) {
      var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
      var popupWindow = errorTemplate.cloneNode(true);
      addedPopup = main.appendChild(popupWindow);
      var errorMessage = document.querySelector('.error__title');
      var errorButton = addedPopup.querySelector('.error__button');
      if (message !== undefined) {
        errorMessage.textContent = message;
        errorButton.textContent = button;
      }
      document.addEventListener('keydown', function (evt) {
        onPopupEscPress(evt, addedPopup);
      });
      document.addEventListener('click', onOutborderClick);
      errorButton.addEventListener('click', function () {
        main.removeChild(addedPopup);
      });
    }
  };
})();
