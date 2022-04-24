import { modalPic, cardTemplate, imageModalPic, titleModalPic } from './variables';
import { openPopup } from './modal';
import { deleteCard, addLikeCard, deleteLikeCard } from './api';

//---------------------------------- Добавление карточки--------------------------------
//Создание карточки
export function createCard(name, link, cardId, likesCount, isLiked) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const elementPic = cardElement.querySelector('.card__pic');
  const cardRemoveButton = cardElement.querySelector('.card__remove');
  const cardLikeButton = cardElement.querySelector('#like_card');
  const cardLikeCount = cardElement.querySelector('.card__count-likes');


  cardElement.querySelector('.card__title').textContent = name;
  elementPic.src = link;
  elementPic.alt = name;
  cardLikeCount.textContent = likesCount;

  // лайк карточки
  if (isLiked) cardLikeButton.classList.add('card__button_state_active');
  cardLikeButton.addEventListener('click', () => {
    clickLikeButton(cardLikeButton, cardLikeCount, cardId);
  });

  //Удаление карточки
  cardRemoveButton.addEventListener('click', () => {
    deleteCard(cardId);
    cardElement.remove();
  });
  //открытие попап для новых карточек
  elementPic.addEventListener('click', function () {
    showCard(name, link);
    openPopup(modalPic);
  });

  return cardElement;
}


//--------------------------добавление в контейнер карточек-------------------------------
export function addCard(container, cardElement) {
  container.prepend(cardElement);
}

//-----------------------Открытие и закрытие попап с карточкой---------------------------
export function showCard(popupName, popupLink) {
  openPopup(modalPic);
  titleModalPic.textContent = popupName;
  imageModalPic.src = popupLink;
  imageModalPic.alt = popupName;
}

//-----------------------Добавление и удаление лайка карточки---------------------------
export function clickLikeButton(cardLikeButton, cardLikeCount, cardId) {
  if (cardLikeButton.classList.contains('card__button_state_active')) {
    deleteLikeCard(cardId);
    cardLikeCount.textContent--;
  } else {
    addLikeCard(cardId);
    cardLikeCount.textContent++;
  }
  cardLikeButton.classList.toggle('card__button_state_active');
}

