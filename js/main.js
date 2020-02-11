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
  var rand = randomInt(0, arr.length);
  return arr[rand];
}

function modRandomInt() {
  var arrInt = [];
  var a;
  var swap;
  for (var i = 0; i < 25; i++) {
    arrInt[i] = i + 1;
  }

  for (var index = arrInt.length - 1; index > 0; index--) {
    a = Math.floor(Math.random() * (index + 1));
    swap = arrInt[a];
    arrInt[a] = arrInt[index];
    arrInt[index] = swap;
  }
  return arrInt;
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
  var maxComments = randomInt(1, 6);
  for (var i = 0; i < maxComments; i++) {
    arr.push(generationComment());
  }
  return arr;
}

var generationCard = function (number) {
  var card = {
    url: 'photos/' + number + '.jpg',
    likes: randomInt(MINLIKES, MAXLIKES),
    description: getArrayRandElement(DESCRIPTION),
    comments: createArrComments()
  };
  return card;
};

var arr = modRandomInt();
for (var i = 0; i < NUMBER_CARDS; i++) {
  cards.push(generationCard(arr[i]));
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

/* MODULE 3 -- TASK 3 (временно)-------------------------------------------- */
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var renderComment = function (newCard) {
  var commentFragment = document.createDocumentFragment();
  var commentHTML = document.querySelector('.social__comments');

  for (var index = 0; index < newCard.comments.length; index++) {
    var comment = document.createElement('li');
    comment.className = 'social__comment';

    var imgtag = document.createElement('img');
    imgtag.className = 'social__picture';
    imgtag.src = newCard.comments[index].avatar;
    imgtag.alt = newCard.comments[index].name;
    imgtag.width = '35';
    imgtag.height = '35';

    var ptag = document.createElement('p');
    ptag.className = 'social__text';
    ptag.textContent = newCard.comments[index].comments;

    var cardDescription = document.querySelector('.social__caption');
    cardDescription.textContent = newCard.description;

    commentFragment.appendChild(comment).appendChild(imgtag);
    comment.appendChild(ptag);
    commentHTML.appendChild(commentFragment);
  }
};

var renderBigCard = function (newCard, picture) {
  bigPicture = picture;
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = newCard.url;
  bigPicture.querySelector('.likes-count').textContent = newCard.likes;
  bigPicture.querySelector('.comments-count').textContent = newCard.comments.length;

};


renderBigCard(cards[0], bigPicture);
renderComment(cards[0]);

var socialComentCount = document.querySelector('.social__comment-count');
socialComentCount.classList.add('hidden');

var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

var modal = document.querySelector('body');
modal.classList.add('modal-open');
