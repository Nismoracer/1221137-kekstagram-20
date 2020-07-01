'use strict';

(function () {
  var scaleValue = document.querySelector('.scale__control--value');
  var imgPreview = document.querySelector('.img-upload__preview');

  var changeScale = function (newScale) {
    scaleValue.value = newScale + '%';
    imgPreview.style.transform = 'scale(' + newScale / 100 + ')';
  };

  window.scale = {
    initializeScale: function () {
      changeScale(100);
    },
    onScaleSmaller: function () {
      var scale = parseInt(scaleValue.value.replace('%', ''), 10);
      if (scale > 25) {
        scale -= 25;
        changeScale(scale);
      }
    },
    onScaleBigger: function () {
      var scale = parseInt(scaleValue.value.replace('%', ''), 10);
      if (scale < 100) {
        scale += 25;
        changeScale(scale);
      }
    }
  };
})();
