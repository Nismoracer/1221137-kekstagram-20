'use strict';
(function () {
  var COMMENTS_NUMBER = 5;
  var bigPhoto = document.querySelector('.big-picture');
  var commentsShown = bigPhoto.querySelector('.comments-shown');
  var addComments = bigPhoto.querySelector('.social__comments-loader');
  var commentsList = bigPhoto.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment')
    .content
    .querySelector('.social__comment');

  var currentComments = [];
  var lastCommentIndex;

  var createElement = function (comment) {
    var currentComment = commentTemplate.cloneNode(true);
    currentComment.querySelector('.social__picture').src = comment.avatar;
    currentComment.querySelector('.social__picture').alt = comment.name;
    currentComment.querySelector('.social__text').textContent = comment.message;
    return currentComment;
  };

  var renderComments = function (commentsArray) {
    var fragment = document.createDocumentFragment();

    var i = lastCommentIndex;
    var iMax = lastCommentIndex + COMMENTS_NUMBER;
    for (i; i < iMax; i++) {
      if (i < commentsArray.length) {
        fragment.appendChild(createElement(commentsArray[i]));
        if (i === commentsArray.length - 1) {
          addComments.classList.add('hidden');
        }
      } else {
        addComments.classList.add('hidden');
        break;
      }
    }
    lastCommentIndex = i;
    commentsShown.textContent = i;
    commentsList.appendChild(fragment);
  };

  window.preview = {
    renderBigPhoto: function (photoName) {
      for (var i = 0; i < window.transmit.receivedPhotos.length; i++) {
        if (photoName.endsWith(window.transmit.receivedPhotos[i].url)) {
          var currentElement = window.transmit.receivedPhotos[i];
          break;
        }
      }
      var currentImage = bigPhoto.querySelector('.big-picture__img img');
      var header = bigPhoto.querySelector('.social__caption');
      var likes = bigPhoto.querySelector('.likes-count');
      var commentsTotal = bigPhoto.querySelector('.comments-count');
      currentImage.src = currentElement.url;
      header.textContent = currentElement.description;
      likes.textContent = currentElement.likes;
      commentsTotal.textContent = currentElement.comments.length;
      commentsList.innerHTML = '';
      currentComments = currentElement.comments;
      lastCommentIndex = 0;
      addComments.classList.remove('hidden');
      renderComments(currentComments);
    },
    onUploadCommentsClick: function () {
      if (currentComments.length > 0) {
        renderComments(currentComments, lastCommentIndex);
      }
    }
  };
})();
