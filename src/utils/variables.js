export const content = document.querySelector('.content');
export const popups = document.querySelectorAll('.popup');
//---------------------------------------------------------------------
export const modalProfile = document.querySelector('.popup__profile');
export const modalCard = document.querySelector('.popup__card');
export const modalPic = document.querySelector('.popup__pic');
export const modalAvatar = document.querySelector('.popup__avatar');
export const closeButtonPic = document.querySelector('#close_popupPic');
//-------------------------------------------------------------------
export const profileform = document.querySelector('#edit_profile');
export const nameProfile = document.querySelector('#name');
export const profProfile = document.querySelector('#about');
export const nameInput = document.querySelector('.profile__title');
export const jobInput = document.querySelector('.profile__subtitle');
export const editButton = content.querySelector('.profile__button_type_edit');
export const addButton = content.querySelector('.profile__button_type_add');
export const closeButtonProfile = document.querySelector('#close_popupProfile');
export const profileSaveButtom = profileform.querySelector('#profile-button-save');
//-------------------------------------------------------------------
export const avatarForm = document.querySelector('#edit_avatar');
export const editAvatarButton = content.querySelector('.profile__avatar-edit');
export const profileAvatar = document.querySelector('.profile__avatar');
export const avatarSaveform = avatarForm.querySelector('#avatar-button-save');
export const avatarInput = document.querySelector('#link-avatar_pic');

//-------------------------------------------------------------------
export const cardsContainer = content.querySelector('.cards__container');
export const cardTemplate = document.querySelector('#cards__template').content;
export const cardForm = document.querySelector('#add_card');
export const cardSaveButtom = cardForm.querySelector('#card-button-save');
export const cardLikeButtom = document.querySelector('#like_card');
export const closeButtonCard = document.querySelector('#close_popupCard');
export const imageModalPic = modalPic.querySelector('.popup__image');
export const titleModalPic = modalPic.querySelector('.popup__title');

//------------------------------------------------------------------

export const validationSettings = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});

