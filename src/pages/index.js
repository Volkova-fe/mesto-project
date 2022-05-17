import '../pages/index.css';
import 'core-js/es/symbol';

import { api, } from '../components/Api';

import UserInfo from '../components/UserInfo';
import Section from '../components/Section'
import Card from '../components/Сard'
import PopupWithForm from '../components/PopupWithForm'
import PopupWithImage from '../components/PopupWithImage'
import FormValidator from '../components/FormValidator'
import PopupDeleteCard from '../components/PopupDeleteCard';

import {
  addButton, editAvatarButton, editButton,
  modalProfile, modalCard, modalAvatar, modalDelete,
  nameProfile, profProfile, profileform,
  avatarForm, modalPic, cardForm, options
} from "../utils/variables";

//===================================================================
let user

const userInfo = new UserInfo({
  nameInput: '.profile__title',
  aboutInput: '.profile__subtitle',
  avatarLink: '.profile__avatar'
});

const cardList = new Section(
  {
    renderer: (item) => renderCard(item),
  },
  '.cards__container'
);

const popupWithImage = new PopupWithImage(modalPic);

const avatarValidator = new FormValidator(options, avatarForm);
const profileValidator = new FormValidator(options, profileform);
const addCardValidator = new FormValidator(options, cardForm);

//==================Редактирование профиля=================
const popupFormProfileEdit = new PopupWithForm(modalProfile,
  function handleFormSubmit(data) {
    popupFormProfileEdit.renderLoading(true);
    api.editInfoProfile(data.name, data.about)
      .then((user) => {
        userInfo.setUserInfo(user.name, user.about);
        popupFormProfileEdit.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        popupFormProfileEdit.renderLoading(false);
      })
  }, profileform);

//==================Редактирование аватара=================
const popupFormAvatarEdit = new PopupWithForm(modalAvatar,
  function handleFormSubmit(data) {
    popupFormAvatarEdit.renderLoading(true);
    api.editAvatarProfile(data.link)
      .then((user) => {
        userInfo.addUserAvatar(user.avatar);
        popupFormAvatarEdit.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        popupFormAvatarEdit.renderLoading(false);
      })
  }, avatarForm);

//==============Добавление новой карточки===================

const popupFormNewCard = new PopupWithForm(modalCard,
  function handleFormSubmit(data) {
    popupFormNewCard.renderLoading(true);
    api.addNewCards(data)
      .then((cards) => {
        cardList.addItem(renderCard(cards));;
        popupFormNewCard.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        popupFormNewCard.renderLoading(false);
      })
  }, cardForm);

//==================Удаление карточки=================

const popupDeleteCard = new PopupDeleteCard(modalDelete,
  function handleFormSubmit() {
    api.deleteCard(popupDeleteCard._id)
      .then(() => {
        popupDeleteCard.card.remove();
        popupDeleteCard.close();
      })
      .catch((err) => console.log(err))
  });

//==================Получение данных профиля и карточек с апи======
Promise.all([api.getInfoProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user = userData;
    userInfo.setUserInfo(user.name, user.about);
    userInfo.addUserAvatar(user.avatar);
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

//==================Создание карточек========================
function renderCard(item) {
  const newCard = new Card(item, { selector: '#cards__template' }, api, user, handleCardClick,
    handleCardDelete).generateCard();
  return newCard;
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleCardDelete(id, card) {
  popupDeleteCard.open(id, card);
}

//=====================Валидация========================

avatarValidator.enableValidation();
profileValidator.enableValidation();
addCardValidator.enableValidation();

//==============Слушатели=====================================
addButton.addEventListener('click', () => {
  popupFormNewCard.open();
  addCardValidator.resetFormValidation();
});

editAvatarButton.addEventListener('click', () => {
  popupFormAvatarEdit.open();
  avatarValidator.resetFormValidation();
});

editButton.addEventListener('click', () => {
  nameProfile.value = userInfo.getUserInfo().name;
  profProfile.value = userInfo.getUserInfo().about;
  popupFormProfileEdit.open();
  profileValidator.resetFormValidation();
});

popupFormProfileEdit.setEventListeners();
popupFormAvatarEdit.setEventListeners();
popupWithImage.setEventListeners();
popupFormNewCard.setEventListeners();
popupDeleteCard.setEventListeners();
