'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SCALE_STEP = 25;

  var scaleValue = document.querySelector('.scale__control--value');
  var imgPreview = document.querySelector('.img-upload__preview');

  var changeScale = function (newScale) {
    scaleValue.value = newScale + '%';
    imgPreview.style.transform = 'scale(' + newScale / 100 + ')';
  };

  window.scale = {
    initializeScale: function () {
      changeScale(MAX_SCALE);
    },
    onScaleSmaller: function () {
      var scale = parseInt(scaleValue.value.replace('%', ''), 10);
      if (scale > MIN_SCALE) {
        scale -= SCALE_STEP;
        changeScale(scale);
      }
    },
    onScaleBigger: function () {
      var scale = parseInt(scaleValue.value.replace('%', ''), 10);
      if (scale < MAX_SCALE) {
        scale += SCALE_STEP;
        changeScale(scale);
      }
    }
  };
})();
