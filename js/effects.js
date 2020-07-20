'use strict';

(function () {

  var valueHandle = document.querySelector('.effect-level__pin');
  var valueLine = document.querySelector('.effect-level__line');
  var valueBar = document.querySelector('.effect-level__depth');
  var effectBarLevel = document.querySelector('.effect-level__value');

  var effectBar = document.querySelector('.img-upload__effect-level');
  var originalPicture = document.querySelector('#effect-none');

  var previewImg = document.querySelector('.img-upload__preview img');

  var checkedEffectId = '';

  var applyPictureEffect = function (currentEffect) {
    var effectsClasses = [
      'effects__preview--chrome',
      'effects__preview--sepia',
      'effects__preview--marvin',
      'effects__preview--phobos',
      'effects__preview--heat'
    ];

    effectsClasses.forEach(function (it) {
      previewImg.classList.remove(it);
    });

    switch (currentEffect) {
      case 'effect-none':
        previewImg.style.filter = 'none';
        break;
      case 'effect-chrome':
        previewImg.classList.add('effects__preview--chrome');
        previewImg.style.filter = 'grayscale(' + (effectBarLevel.value / 100) + ')';
        break;
      case 'effect-sepia':
        previewImg.classList.add('effects__preview--sepia');
        previewImg.style.filter = 'sepia(' + (effectBarLevel.value / 100) + ')';
        break;
      case 'effect-marvin':
        previewImg.classList.add('effects__preview--marvin');
        previewImg.style.filter = 'invert(' + effectBarLevel.value + '%)';
        break;
      case 'effect-phobos':
        previewImg.classList.add('effects__preview--phobos');
        var blurLevel = effectBarLevel.value / 100 * 3;
        previewImg.style.filter = 'blur(' + blurLevel + 'px)';
        break;
      case 'effect-heat':
        previewImg.classList.add('effects__preview--heat');
        var heatLevel = effectBarLevel.value / 100 * 2 + 1;
        previewImg.style.filter = 'brightness(' + heatLevel + ')';
        break;
    }
  };

  var setEffectVolume = function (volume) {
    valueHandle.style.left = volume + '%';
    valueBar.style.width = volume + '%';
    effectBarLevel.value = volume;
  };

  window.effects = {
    onValueMove: function (evt) {
      var volume;
      evt.preventDefault();

      var leftBorder = valueLine.getBoundingClientRect().left;
      var rightBorder = valueLine.getBoundingClientRect().right;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        volume = Math.round((moveEvt.clientX - leftBorder) / (rightBorder - leftBorder) * 100);
        if (volume < 0) {
          volume = 0;
        } else if (volume > 100) {
          volume = 100;
        }

        setEffectVolume(volume);

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        volume = Math.round((upEvt.clientX - leftBorder) / (rightBorder - leftBorder) * 100);
        if (volume < 0) {
          volume = 0;
        } else if (volume > 100) {
          volume = 100;
        }

        setEffectVolume(volume);
        applyPictureEffect(checkedEffectId);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },

    initialize: function () {
      effectBar.classList.add('hidden');
      originalPicture.checked = true;
      setEffectVolume(0);
      applyPictureEffect('effect-none');
    },

    change: function (evt) {
      if (evt.target.id === 'effect-none') {
        effectBar.classList.add('hidden');
        checkedEffectId = 'effect-none';
      } else {
        effectBar.classList.remove('hidden');
        checkedEffectId = evt.target.id;
      }
      effectBarLevel.value = 100;
      setEffectVolume(effectBarLevel.value);
      applyPictureEffect(checkedEffectId);
    }
  };

})();
