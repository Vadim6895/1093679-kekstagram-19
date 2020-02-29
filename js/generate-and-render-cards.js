'use strict';

(function () {
  var NAMES = ['Иван', 'Максим', 'Костя', 'Андрей', 'Алексей'];
  var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var DESCRIPTION = ['Первое описание', 'Второе описание', 'Третье описание', 'Четвертое описание', 'Пятое описание'];

  var NUMBER_CARDS = 25;
  var MINLIKES = 15;
  var MAXLIKES = 200;


  var PICTUREID = '#picture';
  var PICTURESCLASS = '.pictures';
  var PICTURE_COMMENTS = '.picture__comments';
  var PICTURE_IMG = '.picture__img';
  var PICTURE_LIKES = '.picture__likes';

  var pictureContainer = document.querySelector(PICTURESCLASS);
  var pictureTemplate = document.querySelector(PICTUREID).content;

  function randomInt(minInt, maxInt) { // случайное число в заданном диапазоне
    var min = Math.ceil(minInt);
    var max = Math.floor(maxInt);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getArrayRandElement(arr) { // случайный элемент в массиве
    var rand = randomInt(0, arr.length);
    return arr[rand];
  }

  function modRandomInt() { // заполнение массива случайными числами в диапазоне 1-25
    var arrInt = [];
    var a;
    var swap;
    for (var i = 0; i < NUMBER_CARDS; i++) {
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


  function createArrComments() { // создает случайное кол-во комментов возвр массив обьектов
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

  var generationCard = function (number) { // создает карточку обьекта (фото, с комментами)
    var card = {
      url: 'photos/' + number + '.jpg',
      likes: randomInt(MINLIKES, MAXLIKES),
      description: getArrayRandElement(DESCRIPTION),
      comments: createArrComments()
    };
    return card;
  };

  var arr = modRandomInt(); //  создает готовый массив из 25 карточек, заполненный случайно
  for (var i = 0; i < NUMBER_CARDS; i++) {
    window.util.cards.push(generationCard(arr[i]));
  }


  var renderCard = function (card, index) { // отвечает за перенос данных в html из JS получает карту и индекс
    var pictureNode = pictureTemplate.cloneNode(true);

    pictureNode.querySelector(PICTURE_COMMENTS).textContent = card.comments.length;
    pictureNode.querySelector(PICTURE_IMG).src = card.url;
    pictureNode.querySelector(PICTURE_LIKES).textContent = card.likes;
    pictureNode.querySelector('.picture').dataset.index = index;
    return pictureNode;
  };

  var generateFragment = function () { // вставляет массив карт в разметку посредством множественного вызова рендера карты
    var fragment = document.createDocumentFragment();
    for (var index = 0; index < window.util.cards.length; index++) {
      fragment.appendChild(renderCard(window.util.cards[index], index));
    }

    pictureContainer.appendChild(fragment);
  };
  generateFragment();
})();
