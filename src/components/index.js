import '../pages/index.css';
import 'core-js/es/symbol';
import { enableValidation } from './validate';
import { openPopup, closePopup } from './modal';
import {
  modalProfile, modalCard, profileform,
  editButton, addButton, cardsContainer,
  cardForm, popups, cardSaveButtom,
  validationSettings, modalAvatar,
  editAvatarButton, avatarForm,
  nameProfile, nameInput, profProfile,
  jobInput, profileAvatar, profileSaveButtom
} from './variables';
import { createCard, addCard } from './card.js';
import {
  handleProfileFormSubmit, hideErorrs,
  editAvatarPic
}
  from './profile';
import { getInitialCards, addNewCards, getInfoProfile } from './api';
import { disabledSaveButton, renderCardLoading, renderProfileLoading } from './utils';

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
getInfoProfile()

//Получение данных о пользователе
getInfoProfile()
  .then(data => {
    userId = data._id;
    nameInput.textContent = data.name;
    jobInput.textContent = data.about;
    profileAvatar.src = data.avatar;
    profileAvatar.alt = `Аватар ${data.name}`;
  })
  .catch(err => console.error(err));

//--------------------------Открытие профиля-------------------------------
editButton.addEventListener('click', () => {
  nameProfile.value = nameInput.textContent;
  profProfile.value = jobInput.textContent;
  hideErorrs(modalProfile);
  openPopup(modalProfile);
});

//--------------------------Редактирование профиля-------------------------
profileform.addEventListener('submit', function (evt) {
  evt.preventDefault();
  handleProfileFormSubmit();
  disabledSaveButton(profileSaveButtom);
});

//--------------------------Открытие формы для смены аватара ---------------
editAvatarButton.addEventListener('click', () => {
  hideErorrs(modalAvatar);
  openPopup(modalAvatar);
});

//--------------------------Редактирование аватара---------------------------

avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderProfileLoading(true, avatarForm);
  editAvatarPic();
  avatarForm.reset();
});

//---------Загрузка информации о карточках с сервера--------------------------
getInitialCards()
  .then((cards) => {
    cards.forEach(card => {
      const initialCards = createCard(card.name, card.link, card._id, card.likes.length, card.likes.some(item => item._id === userId));
      const cardRemoveButton = initialCards.querySelector('.card__remove');
      if (card.owner._id !== userId) {
        cardRemoveButton.remove();
      };
      addCard(cardsContainer, initialCards);
    })
  })
  .catch(err => console.error(err));

//--------------------------Открытие карточек-------------------------------
addButton.addEventListener('click', () => {
  openPopup(modalCard);
});

//--------------------------Создание карточки-------------------------------
cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  renderCardLoading(true, cardForm);
  const cardName = cardForm.name.value;
  const cardPic = cardForm.link.value;
  addNewCards(cardName, cardPic)
    .then((card) => {
      addCard(cardsContainer, createCard(cardName, cardPic, card._id, 0, false));
    })
    .catch(err => console.error(err))
    .finally(() => {
      renderCardLoading(false, cardForm);
      cardForm.reset();
      disabledSaveButton(cardSaveButtom)
      closePopup(modalCard);
    });
});

//--------------------------Валидация-------------------------------

enableValidation(validationSettings);




