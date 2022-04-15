import '../pages/index.css'
import { validation, enableValidation, hideErorrs } from './validate.js';
import { openPopup, closePopup } from './modal';
import {
  modalProfile, modalCard, modalPic, closeButtonPic, profileform,
  editButton, addButton, closeButtonProfile,
  cardsContainer, cardForm, closeButtonCard, initialCards,
} from './utils';
import { createCard, addCard } from './card.js';
import { valueForm, formSubmitHandler } from './profile.js';

//--------------------------Открытие и закрытие профиля-------------------------------
editButton.addEventListener('click', () => {
  valueForm();
  hideErorrs(modalProfile);
  openPopup(modalProfile);
});

closeButtonProfile.addEventListener('click', () => closePopup(modalProfile));

//--------------------------Редактирование профиля-------------------------------
profileform.addEventListener('submit', formSubmitHandler);

//--------------------------Открытие и закрытие карточек-------------------------------
addButton.addEventListener('click', () => {
  openPopup(modalCard);
});

closeButtonCard.addEventListener('click', () => closePopup(modalCard));
//--------------------------Создание карточки-------------------------------
cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCard(cardsContainer, createCard(cardForm.name.value, cardForm.link.value));
  cardForm.reset();
  closePopup(modalCard);
});

//--------------------------Добавление 6 карточек на сайт-------------------------------

initialCards.forEach(card => {
  addCard(cardsContainer, createCard(card.name, card.link));
});
//--------------------------закрытие попап с карточкой-------------------------------
closeButtonPic.addEventListener('click', () => closePopup(modalPic));

//--------------------------Валидация-------------------------------

validation(enableValidation);
