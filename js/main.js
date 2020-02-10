'use strict';

var NAMES = ['Иван', 'Максим', 'Костя', 'Андрей', 'Алексей'];
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Первое описание', 'Второе описание', 'Третье описание', 'Четвертое описание', 'Пятое описание'];

var NUMBER_CARDS = 25;
var MINLIKES = 15;
var MAXLIKES = 200;

var cards = [];

var PICTUREID = '#picture';
var PICTURESCLASS = '.pictures';
var PICTURE_COMMENTS = '.picture__comments';
var PICTURE_IMG = '.picture__img';
var PICTURE_LIKES = '.picture__likes';

var pictureContainer = document.querySelector(PICTURESCLASS);
var pictureTemplate = document.querySelector(PICTUREID).content;

function randomInt(minInt, maxInt) {
  var min = Math.ceil(minInt);
  var max = Math.floor(maxInt);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getArrayRandElement(arr) {
  var rand = Math.floor((randomInt(MINLIKES, MAXLIKES) / MAXLIKES) * arr.length);
  return arr[rand];
}

function createArrComments() {
  var generationComment = function () {
    var comment = {
      avatar: 'img/avatar-' + randomInt(1, 6) + '.svg',
      comments: getArrayRandElement(MESSAGES),
      name: getArrayRandElement(NAMES)
    };
    return comment;
  };
  var arr = [];
  for (var i = 0; i < randomInt(1, 6); i++) {
    arr.push(generationComment());
  }
  return arr;
}

var generationCard = function () {
  var card = {
    url: 'photos/' + randomInt(1, 6) + '.jpg',
    likes: randomInt(MINLIKES, MAXLIKES),
    description: getArrayRandElement(DESCRIPTION),
    comments: createArrComments()
  };

  return card;
};


for (var i = 0; i < NUMBER_CARDS; i++) {
  cards.push(generationCard());
}


var renderCard = function (card) {
  var pictureNode = pictureTemplate.cloneNode(true);

  pictureNode.querySelector(PICTURE_COMMENTS).textContent = card.comments.length;
  pictureNode.querySelector(PICTURE_IMG).src = card.url;
  pictureNode.querySelector(PICTURE_LIKES).textContent = card.likes;

  return pictureNode;
};

var generateFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var index = 0; index < cards.length; index++) {
    fragment.appendChild(renderCard(cards[index]));
  }

  pictureContainer.appendChild(fragment);
};
generateFragment();
