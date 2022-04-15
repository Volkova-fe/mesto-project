import { modalPic, cardTemplate } from './utils';
import { openPopup } from './modal';

//---------------------------------- Добавление карточки--------------------------------
//Создание карточки
export function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__pic').src = link;
  cardElement.querySelector('.card__pic').alt = name;

  // лайк карточки
  cardElement.querySelector('.card__button').addEventListener('click', likeActive);
  //Удаление карточки
  cardElement.querySelector('.card__remove').addEventListener('click', removeCard);

  //открытие попап для новых карточек
  cardElement.querySelector('.card__pic').addEventListener('click', function () {
    showCard(name, link);
    openPopup(modalPic);
  });

  return cardElement;
}

// лайк карточки
export function likeActive(evt) {
  evt.target.classList.toggle('card__button_state_active');
}

//Удаление карточки
export function removeCard() {
  const cards = document.querySelector('.card');
  cards.remove();
}

//--------------------------добавление в контейнер карточек-------------------------------
export function addCard(container, cardElement) {
  container.prepend(cardElement);
}

//-----------------------Открытие и закрытие попап с карточой---------------------------
export const cardImage = document.querySelectorAll('.card__pic');
export function showCard(popupName, popupLink) {
  openPopup(modalPic);
  modalPic.querySelector('.popup__title').textContent = popupName;
  modalPic.querySelector('.popup__image').src = popupLink;
  modalPic.querySelector('.popup__image').alt = popupName;
}


