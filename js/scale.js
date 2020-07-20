'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;

  var scaleValue = document.querySelector('.scale__control--value');
  var imgPreview = document.querySelector('.img-upload__preview img');

  var changeSize = function (newScale) {
    scaleValue.value = newScale + '%';
    imgPreview.style.transform = 'scale(' + newScale / 100 + ')';
  };

  window.scale = {
    initialize: function () {
      changeSize(MAX_SCALE);
    },
    onMinusButtonClick: function () {
      var scale = parseInt(scaleValue.value.replace('%', ''), 10);
      if (scale > MIN_SCALE) {
        scale -= SCALE_STEP;
        changeSize(scale);
      }
    },
    onPlusButtonClick: function () {
      var scale = parseInt(scaleValue.value.replace('%', ''), 10);
      if (scale < MAX_SCALE) {
        scale += SCALE_STEP;
        changeSize(scale);
      }
    }
  };
})();
