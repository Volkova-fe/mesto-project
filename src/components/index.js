import '../pages/index.css';
import 'core-js/es/symbol';
import { enableValidation } from './validate';
import { openPopup, closePopup } from './modal';
import {
  modalProfile, modalCard, profileform,
  editButton, addButton, cardsContainer,
  cardForm, popups, cardSaveButtom,
  validationSettings,
} from './utils';
import { createCard, addCard } from './card.js';
import { fillProfileInputs, handleProfileFormSubmit, hideErorrs } from './profile';
import { getInitialCards, getInfoProfile } from './api';

//--------------------------закрытие модальных окон-------------------------------

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

//--------------------------Открытие профиля-------------------------------
editButton.addEventListener('click', () => {
  fillProfileInputs(getInfoProfile);
  hideErorrs(modalProfile);
  openPopup(modalProfile);
});

//--------------------------Редактирование профиля-------------------------------
profileform.addEventListener('submit', function (evt) {
  evt.preventDefault();
  handleProfileFormSubmit();
});

//--------------------------Открытие карточек-------------------------------
addButton.addEventListener('click', () => {
  openPopup(modalCard);
});

//--------------------------Создание карточки-------------------------------
cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCard(cardsContainer, createCard(cardForm.name.value, cardForm.link.value));
  cardForm.reset();
  cardSaveButtom.classList.add(validationSettings.inactiveButtonClass);
  cardSaveButtom.disabled = true;
  closePopup(modalCard);
});

//--------------------------Валидация-------------------------------

enableValidation(validationSettings);

//==============================Api=================================

//---------Загрузка информации о карточках с сервера-------------
getInitialCards()
  .then((cards) => {
    cards.forEach(card => {
      addCard(cardsContainer,
        createCard(card.name, card.link));
    });
  })
console.log (getInitialCards())

//---------Загрузка информации о пользователе с сервера-------------

fillProfileInputs(getInfoProfile);

console.log (getInfoProfile());
