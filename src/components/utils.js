export const content = document.querySelector('.content');
export const popups = document.querySelectorAll('.popup');
//---------------------------------------------------------------------
export const modalProfile = document.querySelector('.popup__profile');
export const modalCard = document.querySelector('.popup__card');
export const modalPic = document.querySelector('.popup__pic');
export const closeButtonPic = document.querySelector('#close_popupPic');
//-------------------------------------------------------------------
export const profileform = document.getElementById('edit_profile');
export const nameProfile = document.getElementById('name');
export const profProfile = document.getElementById('about');
export const nameInput = document.querySelector('.profile__title');
export const jobInput = document.querySelector('.profile__subtitle');
export const editButton = content.querySelector('.profile__button_type_edit');
export const addButton = content.querySelector('.profile__button_type_add');
export const closeButtonProfile = document.querySelector('#close_popupProfile');
export const profileSaveButtom = document.querySelector('#profile-button-save');
//-------------------------------------------------------------------
export const cardsContainer = content.querySelector('.cards__container');
export const cardTemplate = document.querySelector('#cards__template').content;
export const cardForm = document.getElementById('add_card');
export const cardSaveButtom = document.querySelector('#card-button-save');
export const closeButtonCard = document.querySelector('#close_popupCard');
export const imageModalPic = modalPic.querySelector('.popup__image');
export const titleModalPic = modalPic.querySelector('.popup__title');

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];
//-------------------------------------------------------------------
export const validationSettings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});

