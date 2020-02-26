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


var renderCard = function (card, index) {
  var pictureNode = pictureTemplate.cloneNode(true);

  pictureNode.querySelector(PICTURE_COMMENTS).textContent = card.comments.length;
  pictureNode.querySelector(PICTURE_IMG).src = card.url;
  pictureNode.querySelector(PICTURE_LIKES).textContent = card.likes;
  pictureNode.querySelector('.picture').dataset.index = index;
  return pictureNode;
};

var generateFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var index = 0; index < cards.length; index++) {
    fragment.appendChild(renderCard(cards[index], index));
  }

  pictureContainer.appendChild(fragment);
};
generateFragment();

/* MODULE 3 -- TASK 3 (временно)-------------------------------------------- */
var bigPicture = document.querySelector('.big-picture');

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

// renderBigCard(cards[0], bigPicture); // получает обьект(карту) и оверлей, подставляет в оверлей данные из карты
// renderComment(cards[0]); // получает обьект карту и берет кол-во коментов из обьекта и вставляет случайнные комменты в разметку

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

getHiddenSocialComment(); // скрывает счетчик комментариев
getHiddenCommentsLoader(); // скрывает меню "показать больше комментариев"

/* MODULE 4 -- TASK 2 (временно)-------------------------------------------- */
var imgUploadForm = document.querySelector('.img-upload__overlay');
var imgButtonCancel = document.querySelector('.img-upload__cancel');
var imgUploadInput = document.querySelector('.img-upload__input');
var ESC_KEY = 'Escape';

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    if (evt.target !== hashtagInput && evt.target !== commentInput) {
      uploadFormClose();
    }
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

imgUploadInput.addEventListener('change', function () {
  uploadFormOpen();
});

imgButtonCancel.addEventListener('click', function () {
  uploadFormClose();
});

/* Масштаб*/
var smallScaleBtn = document.querySelector('.scale__control--smaller');
var biggerScaleBtn = document.querySelector('.scale__control--bigger');
var scaleControlInput = document.querySelector('.scale__control--value');
var imgUploadDiv = document.querySelector('.img-upload__preview');
var STEP_VALUES = ['25', '50', '75', '100'];
var stepValue = 3;
scaleControlInput.value = '100%';

function smallScale() {
  if (scaleControlInput.value === '25%') {
    scaleControlInput.value = '25%';
  } else {
    stepValue--;
    scaleControlInput.value = STEP_VALUES[stepValue] + '%';
    imgUploadDiv.style.transform = 'scale(0.' + STEP_VALUES[stepValue] + ')';
  }
}
function biggerScale() {
  if (scaleControlInput.value === '100%') {
    scaleControlInput.value = '100%';
  } else {
    stepValue++;
    scaleControlInput.value = STEP_VALUES[stepValue] + '%';
    if (STEP_VALUES[stepValue] === '100') {
      imgUploadDiv.style.transform = 'scale(1.0)';
    } else {
      imgUploadDiv.style.transform = 'scale(0.' + STEP_VALUES[stepValue] + ')';
    }
  }
}

smallScaleBtn.addEventListener('click', function () {
  smallScale();
});
biggerScaleBtn.addEventListener('click', function () {
  biggerScale();
});
/* effects--------------------*/
var effectsList = document.querySelector('.effects__list');
var imgUpload = document.querySelector('.img-upload__preview').querySelector('img');
// var levelPin = document.querySelector('.effect-level__pin');
var levelLine = document.querySelector('.effect-level__line');
var effectsNoneBtn = document.querySelector('.effects__preview--none');
var effectLevelSlider = document.querySelector('.effect-level');

var object = {
  'effect-none': 'effects-preview--none',
  'effect-chrome': 'effects-preview--chrome',
  'effect-sepia': 'effects-preview--sepia',
  'effect-marvin': 'effects-preview--marvin',
  'effect-phobos': 'effects-preview--phobos',
  'effect-heat': 'effects-preview--heat'
};

effectLevelSlider.classList.add('hidden');

effectsList.addEventListener('click', function (evt) {
  if (evt.target.type === 'radio') {

    if (!imgUpload.className) {
      imgUpload.classList.add(object[evt.target.id]);
    }
    if (imgUpload.className !== evt.target.id) {
      imgUpload.className = '';
      imgUpload.classList.add(object[evt.target.id]);
    }
    if (imgUpload.className === object['effect-none']) {
      effectLevelSlider.classList.add('hidden');
    } else {
      effectLevelSlider.classList.remove('hidden');
    }

    if (imgUpload.className === object['effect-chrome']) {
      imgUpload.style.filter = 'grayscale(1)';
    }
    if (imgUpload.className === object['effect-sepia']) {
      imgUpload.style.filter = 'sepia(1)';
    }
    if (imgUpload.className === object['effect-marvin']) {
      imgUpload.style.filter = 'invert(100%)';
    }
    if (imgUpload.className === object['effect-phobos']) {
      imgUpload.style.filter = 'blur(3px)';
    }
    if (imgUpload.className === object['effect-heat']) {
      imgUpload.style.filter = 'brightness(3)';
    }
  }
});

effectsNoneBtn.addEventListener('click', function () {
  imgUpload.style = '';
});

levelLine.addEventListener('mouseup', function (evt) {
  var saturation = evt.offsetX / levelLine.offsetWidth * 100;
  var saturationBlur = evt.offsetX / levelLine.offsetWidth * 3;
  var saturationBrightness = (evt.offsetX / levelLine.offsetWidth * 2) + 1;

  if (imgUpload.className === object['effect-chrome']) {
    imgUpload.style.filter = 'grayscale(0.' + Math.floor(saturation) + ')';
  }
  if (imgUpload.className === object['effect-sepia']) {
    imgUpload.style.filter = 'sepia(0.' + Math.floor(saturation) + ')';
  }
  if (imgUpload.className === object['effect-marvin']) {
    imgUpload.style.filter = 'invert(' + Math.round(saturation) + '%)';
  }
  if (imgUpload.className === object['effect-phobos']) {
    imgUpload.style.filter = 'blur(' + saturationBlur + 'px)';
  }
  if (imgUpload.className === object['effect-heat']) {
    imgUpload.style.filter = 'brightness(' + saturationBrightness + ')';
  }
});

/* хэш теги ------------------------------------------*/
var imgUploadSubmitBtn = document.querySelector('.img-upload__submit');
var hashtagInput = document.querySelector('.text__hashtags');
var commentInput = document.querySelector('.text__description');
var regex = /^#[a-zA-Z0-9]+$/;

var isHashTagValid = function (tag) {
  if (tag.length > 20) {
    return false;
  }

  if (regex.test(tag)) {
    return true;
  }

  return false;
};

var cleanTags = function (arrTags) {
  var tagsArr = [];
  for (var k = 0; k < arrTags.length; k++) {
    if (arrTags[k] !== '') {
      tagsArr.push(arrTags[k]);
    }
  }
  return tagsArr;
};

var isAllHashTagsValid = function (str) {
  var tags = str.split(' ');
  var tagsNoSpaces = cleanTags(tags);

  if (tagsNoSpaces.length > 5) {
    return false;
  }
  for (var index = 0; index < tagsNoSpaces.length; index++) {
    for (var a = index + 1; a < tagsNoSpaces.length; a++) {
      if (tagsNoSpaces[index].toLowerCase() === tagsNoSpaces[a].toLowerCase()) {
        return false;
      }
    }
  }

  for (var g = 0; g < tagsNoSpaces.length; g++) {
    if (!isHashTagValid(tagsNoSpaces[g])) {
      return false;
    }
  }
  return true;
};

var isCommentValid = function (comment) {
  var commentArr = comment.split('');
  if (commentArr.length > 140) {
    return false;
  }
  return true;
};


imgUploadSubmitBtn.addEventListener('click', function () {
  if (!isAllHashTagsValid(hashtagInput.value)) {
    hashtagInput.setCustomValidity('Неверный формат тега');
  } else {
    hashtagInput.setCustomValidity('');
  }

  if (!isCommentValid(commentInput.value)) {
    commentInput.setCustomValidity('Длина комментария слишком большая');
  } else {
    commentInput.setCustomValidity('');
  }

});
// MODULE4 --- TASK3 --------------------------------------------//
var picContainer = document.querySelector('.pictures');
var btnCancelBigPic = document.querySelector('.big-picture__cancel');
var bodyContainer = document.querySelector('BODY');

function deleteComments() {
  var socialComments = document.querySelector('.social__comments');
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }
}

picContainer.addEventListener('click', function (evt) {

  if (evt.target.closest('A')) {
    var a = evt.target.closest('A').dataset.index;
    deleteComments();
    renderBigCard(cards[a], bigPicture);
    renderComment(cards[a]);
    openOverlayPicture();
  }
});

btnCancelBigPic.addEventListener('click', function () {
  closeOverlayPicture();
});

var onOverlayEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closeOverlayPicture();
  }
};

function openOverlayPicture() {
  bigPicture.classList.remove('hidden');
  bodyContainer.addEventListener('keydown', onOverlayEscPress);
}

function closeOverlayPicture() {
  bigPicture.classList.add('hidden');
  bodyContainer.removeEventListener('keydown', onOverlayEscPress);
}

// var ENTER_KEY = 'Enter';
/* var onPicContainerEntPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    findJsElement();
    openOverlayPicture();
  }
};*/
// picContainer.addEventListener('keydown', onPicContainerEntPress)
