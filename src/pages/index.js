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

/* const avatarValidator = new FormValidator(options, avatarForm);
const profileValidator = new FormValidator(options, profileform);
const addCardValidator = new FormValidator(options, cardForm); */

const formValidators = {}

// Включение валидации
const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector))
  formList.forEach((formItem) => {
    const validator = new FormValidator(formItem, options)
    // получаем данные из атрибута `name` у формы
    const formName = formItem.getAttribute('name')

    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(options);


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
        userInfo.setUserInfo(user.avatar);
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
    userInfo.setUserInfo(user.name, user.about, user.avatar);
    /* userInfo.addUserAvatar(user.avatar); */
    cardList.renderItems(cards);

  })
  .catch((err) => {
    console.log(err);
  });

//==================Создание карточек========================
function renderCard(item) {
  const newCard = new Card({ selector: '#cards__template' }, item, api, user, handleCardClick,
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

/* avatarValidator.enableValidation();
profileValidator.enableValidation();
addCardValidator.enableValidation(); */

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
  const { name, about } = userInfo.getUserInfo()
  nameProfile.value = name;
  profProfile.value = about;
  popupFormProfileEdit.open();
  profileValidator.resetFormValidation();
});

popupFormProfileEdit.setEventListeners();
popupFormAvatarEdit.setEventListeners();
popupWithImage.setEventListeners();
popupFormNewCard.setEventListeners();
popupDeleteCard.setEventListeners();



/*Можно лучше

Если будет интересно, можно универсально создать экземпляры валидаторов всех форм, поместив их все в один объект, а потом брать из него валидатор по атрибуту name, который задан для формы. Это очень универсально и для любого кол-ва форм подходит.

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(config);
И теперь можно использовать валидаторы для деактивации кнопки и тд

formValidators[ profileForm.getAttribute('name') ].resetValidation()

// или можно использовать строку (ведь Вы знаете, какой атрибут `name` у каждой формы)
formValidators['profile-form'].resetValidation()*/
