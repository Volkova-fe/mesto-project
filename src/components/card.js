import { modalPic, cardTemplate, imageModalPic, titleModalPic } from './utils';
import { openPopup } from './modal';

//---------------------------------- Добавление карточки--------------------------------
//Создание карточки
export function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const elementPic = cardElement.querySelector('.card__pic');
  cardElement.querySelector('.card__title').textContent = name;
  elementPic.src = link;
  elementPic.alt = name;

  // лайк карточки
  const cardLikeButton = cardElement.querySelector('.card__button');
  cardLikeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__button_state_active');
  });
  //Удаление карточки
  const cardRemoveButton = cardElement.querySelector('.card__remove');
  cardRemoveButton.addEventListener('click', (evt) => {
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

//-----------------------Открытие и закрытие попап с карточой---------------------------
export function showCard(popupName, popupLink) {
  openPopup(modalPic);
  titleModalPic.textContent = popupName;
  imageModalPic.src = popupLink;
  imageModalPic.alt = popupName;
}


