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
/* bigPicture.classList.remove('hidden');*/

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

function getHiddenSocialComment() {
  var socialComentCount = document.querySelector('.social__comment-count');
  socialComentCount.classList.add('hidden');
}
function getHiddenCommentsLoader() {
  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');
}

function getModalOpen() {
  var modal = document.querySelector('body');
  modal.classList.add('modal-open');
}
function getModalClose() {
  var modal = document.querySelector('body');
  modal.classList.remove('modal-open');
}

getHiddenSocialComment();
getHiddenCommentsLoader();
/* getModalOpen();*/

/* MODULE 4 -- TASK 2 (временно)-------------------------------------------- */
var imgUploadForm = document.querySelector('.img-upload__overlay');
var imgButtonCancel = document.querySelector('.img-upload__cancel');
var imgUploadInput = document.querySelector('.img-upload__input');
var uploadForm = document.querySelector('.img-uploadForm');
var imgUploadLabel = document.querySelector('.img-upload__label');
var ESC_KEY = 'Escape';

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    uploadFormClose();
  }
};

function uploadFormOpen() {
  imgUploadForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  getModalOpen();
}

function uploadFormClose() {
  imgUploadForm.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  getModalClose();
}

function eventDefault(evt) {
  evt.preventDefault();
}

imgUploadLabel.addEventListener('click', function (evt) {
  eventDefault(evt);
  uploadFormOpen();
});

imgButtonCancel.addEventListener('click', function () {
  uploadFormClose();
});

/* Масштаб*/
var smallScaleBtn = document.querySelector('.scale__control--smaller');
var biggerScaleBtn = document.querySelector('.scale__control--bigger');
var scaleControlInput = document.querySelector('.scale__control--value');
var imgUpload = document.querySelector('.img-upload__preview');
/* var STEP_SCALE = '25'; */
var STEP_VALUES = ['25', '50', '75', '100'];
var stepValue = 3;
scaleControlInput.value = '100%';

function smallScale() {
  if (scaleControlInput.value === '25%') {
    scaleControlInput.value = '25%';
  } else {
    stepValue--;
    scaleControlInput.value = STEP_VALUES[stepValue] + '%';
    imgUpload.style.transform = 'scale(0.' + STEP_VALUES[stepValue] + ')';
  }
}
function biggerScale() {
  if (scaleControlInput.value === '100%') {
    scaleControlInput.value = '100%';
  } else {
    stepValue++;
    scaleControlInput.value = STEP_VALUES[stepValue] + '%';
    if (STEP_VALUES[stepValue] === '100') {
      imgUpload.style.transform = 'scale(1.0)';
    } else {
      imgUpload.style.transform = 'scale(0.' + STEP_VALUES[stepValue] + ')';
    }
  }
}

smallScaleBtn.addEventListener('click', function () {
  smallScale();
});
biggerScaleBtn.addEventListener('click', function () {
  biggerScale();
});
/* Эфекты*/
var effectsList = document.querySelector('.effects__list');
effectsList.addEventListener('click', function (evt) {
  console.log(evt.target.nextElementSibling);
  /*console.log(evt.target.classList[1]);*/
});
