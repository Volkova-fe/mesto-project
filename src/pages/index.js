import '../pages/index.css';
import 'core-js/es/symbol';

import { api, } from '../components/Api';

import UserInfo from '../components/UserInfo';
import Section from '../components/Section'
import Card from '../components/Сard'
import PopupWithForm from '../components/PopupWithForm'
import PopupWithImage from '../components/PopupWithImage'
import FormValidator from '../components/FormValidator'

import {
  addButton, editAvatarButton, editButton,
  modalProfile, modalCard, modalAvatar,
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


const popupWithImage = new PopupWithImage(modalPic)

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

//==================Создание карточек========================
function renderCard(item) {
  const newCard = new Card(item, { selector: '#cards__template' }, api, user, handleCardClick).generateCard();
  return newCard;
}

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

//=====================Валидация========================


const avatarValidator = new FormValidator(options, avatarForm);
avatarValidator._validation();
const profileValidator = new FormValidator(options, profileform);
profileValidator._validation();
const addCardValidator = new FormValidator(options, cardForm);
addCardValidator._validation();


//==============Слушатели=====================================
addButton.addEventListener('click', () => {
  popupFormNewCard.open();
});

editAvatarButton.addEventListener('click', () => {
  popupFormAvatarEdit.open();
});

editButton.addEventListener('click', () => {
  nameProfile.value = userInfo.getUserInfo().name;
  profProfile.value = userInfo.getUserInfo().about;
  popupFormProfileEdit.open();
});


popupFormProfileEdit.setEventListeners();
popupFormAvatarEdit.setEventListeners();
popupWithImage.setEventListeners();
popupFormNewCard.setEventListeners();
