'use strict';
(function () {
  var MAX_RANDOM_PHOTOS = 10;

  var getRandomElement = function (parameters) {
    var randomElementIndex = Math.floor(Math.random() * parameters.length);
    return parameters[randomElementIndex];
  };

  window.data = {
    sortFromPopularToNot: function () {
      var receivedPhotosCopy = window.transmit.receivedPhotos.slice();
      receivedPhotosCopy.sort(function (first, second) {
        if (first.comments.length < second.comments.length) {
          return 1;
        } else if (first.comments.length > second.comments.length) {
          return -1;
        }
        return 0;
      });
      return receivedPhotosCopy;
    },
    chooseRandomPhotos: function () {
      var uniquePhotos = [];
      var i = 0;
      while (i < MAX_RANDOM_PHOTOS) {
        var randomPhoto = getRandomElement(window.transmit.receivedPhotos);
        if (uniquePhotos.indexOf(randomPhoto) === -1) {
          uniquePhotos.push(randomPhoto);
          i++;
        }
      }
      return uniquePhotos;
    },
    getReceivedPhotos: function () {
      return window.transmit.receivedPhotos;
    }
  };
})();
