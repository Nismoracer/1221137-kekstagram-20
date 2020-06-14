'use strict';

var USERS_QUANTITY = 25;
var LIKES_MAX = 200;
var LIKES_MIN = 15;
var COMMENTS_MAX = 5;

var ARRAY_NAMES = ['Жорик', 'Оскар', 'Ольга', 'Кристина',
  'Влад', 'Геннадий', 'Моника', 'Игнат'];

var ARRAY_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var similarListElement = document.querySelector('.pictures');

var similarElementTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var usersPhotos = [];

var radomizeEverything = function (maxValue) {
  var randomNumber = Math.floor((Math.random() * maxValue));
  if (randomNumber === 0) {
    randomNumber++;
  }
  return randomNumber;
};

var addComment = function () {
  var avatarNum = radomizeEverything(5);
  var comment = {
    avatar: '',
    message: '',
    name: ''
  };
  comment.avatar = 'img/avatar-' + avatarNum.toString() + '.svg';
  comment.message = ARRAY_COMMENTS[radomizeEverything(ARRAY_COMMENTS.length)];
  comment.name = ARRAY_NAMES[radomizeEverything(ARRAY_NAMES.length)];
  return comment;
};

var fillProfile = function () {
  var commentsNum = radomizeEverything(COMMENTS_MAX);
  var currentPhoto = {
    url: '',
    description: '',
    likes: '',
    comments: []
  };

  currentPhoto.description = 'Случайная фотография';
  currentPhoto.likes = (LIKES_MIN + radomizeEverything(LIKES_MAX - LIKES_MIN)).toString();
  for (var i = 0; i < commentsNum; i++) {
    currentPhoto.comments[i] = addComment();
  }
  return currentPhoto;
};

for (var i = 1; i <= USERS_QUANTITY; i++) {
  usersPhotos[i] = fillProfile();
  usersPhotos[i].url = 'photos/' + i.toString() + '.jpg';
}

var renderPhotosList = function (photo) {
  var currentPhoto = similarElementTemplate.cloneNode(true);
  currentPhoto.querySelector('.picture__img').src = photo.url;
  currentPhoto.querySelector('.picture__comments').textContent = photo.comments.length.toString();
  currentPhoto.querySelector('.picture__likes').textContent = photo.likes;

  return currentPhoto;
};

var fragment = document.createDocumentFragment();
for (i = 1; i <= USERS_QUANTITY; i++) {
  fragment.appendChild(renderPhotosList(usersPhotos[i]));
}
similarListElement.appendChild(fragment);
