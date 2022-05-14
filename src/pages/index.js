import '../pages/index.css';
import 'core-js/es/symbol';

import { api, } from "../components/Api";

import UserInfo from '../components/UserInfo';
import Section from "../components/Section"
import Card from "../components/Сard"
import PopupWithForm from "../components/PopupWithForm.js"

import {
  addButton, editAvatarButton, editButton,
  modalProfile, modalCard, modalAvatar,
  nameProfile, profProfile, profileform,
  avatarForm,
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
//==================Получение данных профиля и карточек с апи======
Promise.all([api.getInfoProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user = userData;
    userInfo.addUserInfo(user.name, user.about);
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
        userInfo.addUserInfo(user.name, user.about);
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

//==================Создание карточек========================
function renderCard(item) {
  const newCard = new Card(item, { selector: '#cards__template' }, api).generateCard();
  return newCard;
}

//==============Слушатели=====================================
addButton.addEventListener('click', () => {
  modalCard.open();
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
