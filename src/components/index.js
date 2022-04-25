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
  jobInput, profileAvatar
} from './variables';
import { createCard, addCard } from './card.js';
import {
  handleProfileFormSubmit, hideErorrs,
  editAvatarPic
}
  from './profile';
import { getInitialCards, addNewCards, getInfoProfile, responseCheck } from './api';
import { disabledSaveButton, renderCardLoading } from './utils';

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

//---------Загрузка информации о пользователе и карточках с сервера-------------
let userId;
/*Вам нужно объединить запрос данных профиля и получения карточек в один общий
запрос с помощью Promise.all, иначе может возникнуть проблема, что _id пользователя
еще не получили, а карточки уже пришли, и будут некорректно отображаться лайки и
кнопки удаления на собственных карточках.*/

Promise.all([getInfoProfile(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    nameInput.textContent = userData.name;
    jobInput.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    profileAvatar.alt = `Аватар ${userData.name}`;
    cards.forEach(card => {
      const initialCards = createCard(card.name, card.link, card._id, card.likes.length, card.likes.some(item => item._id === userId));
      const cardRemoveButton = initialCards.querySelector('.card__remove');
      if (card.owner._id !== userId) {
        cardRemoveButton.remove();
      };
      addCard(cardsContainer, initialCards);
    })
  })
  .catch(err => {console.error(err)});

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
    .then(responseCheck)
    .then((card) => {
      addCard(cardsContainer, createCard(cardName, cardPic, card._id, 0, false));
      cardForm.reset();
      disabledSaveButton(cardSaveButtom)
      closePopup(modalCard);
    })
    .catch(err => console.error(err))
    .finally(() => {
      renderCardLoading(false, cardForm);
    });
});

//--------------------------Валидация-------------------------------

enableValidation(validationSettings);




