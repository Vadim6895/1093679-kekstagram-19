'use strict';

var cards = [];

window.renderCards.renderCardsAndComments(cards);// генерирует и сразу вставляет карточки
// window.renderOverlay.renderOverlayCards(); // получает карту и вставляет её в оверлей

window.hiddenComments.getHiddenSocialComment();
window.hiddenComments.getHiddenCommentsLoader();

window.uploadForm.getUploadFormImg();
window.uploadFormScale.addScale();
window.uploadFormEffects.addEffects();
window.uploadFormHashtags.addHashtags();
window.uploadFormSlider.addSlider();

window.OverlayfindCard.getOverlayCard(cards); // отвечает за чистку коментариев, и определяет на какой карте клик
