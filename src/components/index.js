import '../pages/index.css';
import 'core-js/es/symbol';
import { enableValidation } from './validate';
import { openPopup, closePopup } from './modal';
import {
  modalProfile, modalCard, profileform,
  editButton, addButton, cardsContainer,
  cardForm, popups, cardSaveButtom,
  validationSettings, modalAvatar,
  editAvatarButton, avatarForm
} from './utils';
import { createCard, addCard } from './card.js';
import {
  handleProfileFormSubmit, hideErorrs,
  fillProfileInputs, editAvatarPic
}
  from './profile';
import { getInitialCards, addNewCards, getInfoProfile } from './api';

//--------------------------закрытие модальных окон-------------------------------

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})

//---------Загрузка информации о пользователе с сервера-------------
let userId;
//Получение данных о пользователе
fillProfileInputs(getInfoProfile);
console.log(getInfoProfile())

getInfoProfile()
  .then(data => {
    userId = data._id;
  })
  .catch(err => console.error(err));

//--------------------------Открытие профиля-------------------------------
editButton.addEventListener('click', () => {
  hideErorrs(modalProfile);
  openPopup(modalProfile);
});

//--------------------------Редактирование профиля-------------------------
profileform.addEventListener('submit', function (evt) {
  evt.preventDefault();
  handleProfileFormSubmit();
});

//--------------------------Открытие формы для смены аватара ---------------
editAvatarButton.addEventListener('click', () => {
  hideErorrs(modalAvatar);
  openPopup(modalAvatar);
});

//--------------------------Редактирование аватара---------------------------

avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  editAvatarPic();
});

//---------Загрузка информации о карточках с сервера--------------------------
getInitialCards()
  .then((cards) => {
    cards.forEach(card => {
      const initialCards = createCard(card.name, card.link, card._id);
      const cardRemoveButton = initialCards.querySelector('.card__remove');
      if (card.owner._id !== userId) {
        cardRemoveButton.remove();
      };
      addCard(cardsContainer, initialCards);
    })
  })
  .catch(err => console.error(err));
console.log(getInitialCards());

//--------------------------Открытие карточек-------------------------------
addButton.addEventListener('click', () => {
  openPopup(modalCard);
});

//--------------------------Создание карточки-------------------------------
cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardName = cardForm.name.value;
  const cardPic = cardForm.link.value;
  addNewCards(cardName, cardPic)
    .then((card) => {
      addCard(cardsContainer, createCard(cardName, cardPic, card._id));
    })
    .catch(err => console.error(err));
  cardForm.reset();
  cardSaveButtom.classList.add(validationSettings.inactiveButtonClass);
  cardSaveButtom.disabled = true;
  closePopup(modalCard);
});

//--------------------------Валидация-------------------------------

enableValidation(validationSettings);




