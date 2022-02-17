const content = document.querySelector('.content');
const modalProfile = document.querySelector('.popup__profile');
const modalCard = document.querySelector('.popup__card');
const modalPic = document.querySelector('.popup__pic');
const closeButton = document.querySelectorAll('.popup__button_type_close');
const saveButton = document.querySelector('.popup__profile .popup__button_type_save');
//-------------------------------------------------------------------
const profileform = document.getElementById('edit_profile');
const nameProfile = document.getElementById('name');
const profProfile = document.getElementById('about');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__subtitle');
const editButton = content.querySelector('.profile__button_type_edit');
const addButton = content.querySelector('.profile__button_type_add');
const modal = document.querySelector('.popup');
//-------------------------------------------------------------------
const cardsContainer = content.querySelector('.cards__container');
const cardTemplate = document.querySelector('#cards__template').content;
const createButton = document.querySelector('.popup__card .popup__button_type_save');
const removeButton = content.querySelector('.card__remove');
const cardImage = document.querySelector('.card__pic');
const cardForm = document.getElementById('add_card');

//---------------------------------- Шесть карточек «из коробки»----------------------------------
const initialCards = [
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



//----------------------------------Открытие и закрытие модального окна----------------------------------
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//----------------------------------Редактирование имени и информации о себе----------------------------------
function valueForm() {
  nameProfile.value = nameInput.textContent;
  profProfile.value = jobInput.textContent;
}

function clearForm(idForm) {
  idForm.reset();
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = nameProfile.value;
  jobInput.textContent = profProfile.value;
  closePopup(modalProfile);
}

//---------------------------------- Добавление карточки--------------------------------

//Создание карточки
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__pic').src = link;
  cardElement.querySelector('.card__pic').alt = name;
  // лайк карточки
  cardElement.querySelector('.card__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__button_state_active');
  });
  //Удаление карточки
  cardElement.querySelector('.card__remove').addEventListener('click', function () {
    const cards = document.querySelector('.card');
    cards.remove();
  });

  return cardElement;
}

function addCard(container, cardElement) {
  container.prepend(cardElement);
}

function showCard(popupName, popupLink) {
  modalPic.querySelector('.popup__title').textContent = popupName;
  modalPic.querySelector('.popup__image').src = popupLink;
  modalPic.querySelector('.popup__image').alt = popupName;

  cardImage.querySelector('.card__pic').addEventListener('click', (evt) => {
    evt.preventDefault();
    showCard(card.name, card.link); //Открытие попапа с картинкой
    openPopup(modalPic);
  });

}

//--------------------------Открытие и закрытие профиля-------------------------------
editButton.addEventListener('click', () => {
  valueForm();
  openPopup(modalProfile);
});
closeButton.forEach(btn => btn.addEventListener('click', () => closePopup(modalProfile)
));
//--------------------------Редактирование профиля-------------------------------
profileform.addEventListener('submit', formSubmitHandler);

//--------------------------Добавление 6 карточек на сайт-------------------------------
initialCards.forEach(card => {
  addCard(cardsContainer, createCard(card.name, card.link));
});

//--------------------------Открытие и закрытие карточек-------------------------------
addButton.addEventListener('click', () => openPopup(modalCard));
closeButton.forEach(btn => btn.addEventListener('click', () => {
  clearForm(cardForm);
  closePopup(modalCard);
}));
//--------------------------Создание карточки-------------------------------
cardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  addCard(cardsContainer, createCard(card.name, card.link));
  clearForm(cardForm);
  closePopup(modalCard);
});
