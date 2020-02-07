'use strict';

/* var NAMES = ['Иван', 'Максим', 'Костя', 'Андрей', 'Алексей'];*/
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NUMBER_CARDS = 25;
var MINLIKES = 15;
var MAXLIKES = 200;

var cards = [];

var pictureContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

function randomInt(minInt, maxInt) {
  var min = Math.ceil(minInt);
  var max = Math.floor(maxInt);
  return Math.floor(Math.random() * (max - min)) + min;
}

function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

var generationCard = function () {
  var card = {
    avatar: 'img/avatar-' + randomInt(1, 6) + '.svg',
    likes: randomInt(MINLIKES, MAXLIKES),
    comments: arrayRandElement(MESSAGES),
  };
  /* 1) Абсолюнто не ясно, где брать описание фото, поэтому его нет*/
  /* 2) И каким образом адреса картинок не должны повторяться если нужно 25 обьектов а картинок 6 ?*/
  /* Возможно 2ая часть задания прояснит ситуацию, пулл забирал*/
  return card;
};


for (var i = 0; i < NUMBER_CARDS; i++) {
  cards.push(generationCard());
}

var renderCard = function (object) {
  var pictureNode = pictureTemplate.cloneNode(true);

  pictureNode.querySelector('.picture__comments').textContent = object.comments;
  pictureNode.querySelector('.picture__img').src = object.avatar;
  pictureNode.querySelector('.picture__likes').textContent = object.likes;
  return pictureNode;
};


var fragment = document.createDocumentFragment();
for (var a = 0; a < cards.length; a++) {
  fragment.appendChild(renderCard(cards[a]));
}
pictureContainer.appendChild(fragment);
