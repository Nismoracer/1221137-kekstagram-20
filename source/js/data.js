'use strict';
(function () {
  var MAX_RANDOM_PHOTOS = 10;

  var getRandomElement = function (array) {
    var randomElementIndex = Math.floor(Math.random() * array.length);
    return array[randomElementIndex];
  };

  window.data = {
    sortFromPopularToNot: function (cb) {
      if (window.transmit.receivedPhotos.length === 0) {
        return;
      }
      var receivedPhotosCopy = window.transmit.receivedPhotos.slice();

      receivedPhotosCopy.sort(function (first, second) {
        if (first.comments.length < first.comments.length) {
          return 1;
        } else if (first.comments.length > second.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });
      cb(receivedPhotosCopy);
    },
    chooseRandomPhotos: function (cb) {
      var uniquePhotos = [];
      var i = 0;
      while (i < 10) {
        var randomPhoto = getRandomElement(window.transmit.receivedPhotos);
        if (uniquePhotos.indexOf(randomPhoto) === -1) {
          uniquePhotos.push(randomPhoto);
          i++;
        }
      }
      cb(uniquePhotos);
    }
  };
})();
