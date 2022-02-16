const content = document.querySelector('.content');
const modalProfile = document.querySelector('.popup__profile');
const closeButton = document.querySelectorAll('.popup__button_type_close');
const editButton = content.querySelector('.profile__button_type_edit');
const addButton = content.querySelector('.profile__button_type_add');
const modalCard = document.querySelector('.popup__card');

//-------------------------------------------------------------------
const nameProfile = document.querySelector('#name');
const profProfile = document.querySelector('#about');
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__subtitle');

//----------------------------------1. Работа модальных окон----------------------------------
const formElement = document.querySelector('#edit_profile');
const saveButton = document.querySelector('.popup__profile .popup__button_type_save');

//Открытие и закрытие модального окна
function openModal(event) {
  if (event.target.matches('.profile__button_type_edit')) {
    modalProfile.classList.add('popup_opened');
  }
  else if (event.target.matches('.profile__button_type_add')) {
    modalCard.classList.add('popup_opened');
  }
  else if (event.target.matches('.popup__profile .popup__button_type_close')) {
    modalProfile.classList.remove('popup_opened');
    nameProfile.value = nameInput.textContent;
    profProfile.value = jobInput.textContent;
  }

  else if (event.target.matches('.popup__card .popup__button_type_close')) {
    modalCard.classList.remove('popup_opened');
  }
  else if (event.target.matches('.popup__profile .popup__button_type_save')) {
    modalProfile.classList.remove('popup_opened');
  }

  else if (event.target.matches('.popup__card .popup__button_type_save')) {
    modalCard.classList.remove('popup_opened');
  }
  //добавить еще одно закрытие после создания модльного окна добавения карточек картинок
}

editButton.addEventListener('click', openModal);
closeButton.forEach(btn => btn.addEventListener('click', openModal));

//----------------------------------Редактирование имени и информации о себе----------------------------------

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = nameProfile.value;
  jobInput.textContent = profProfile.value;
}
saveButton.addEventListener('click', openModal);
formElement.addEventListener('submit', formSubmitHandler);

//----------------------------------2. Шесть карточек «из коробки»----------------------------------
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
  }
];

const cardsContainer = content.querySelector('.cards__container');
const cardTemplate = document.querySelector('#cards__template').content;
const createButton = document.querySelector('.popup__card .popup__button_type_save');

addButton.addEventListener('click', openModal);

initialCards.forEach(card => {
  addCard(card.name, card.link);
});

function addCard(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardName;
  cardElement.querySelector('.card__pic').src = cardLink;
  cardElement.querySelector('.card__pic').alt = cardName;

  cardsContainer.prepend(cardElement);
}

createButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  const cardName = document.querySelector('#name_pic').value;
  const cardLink = document.querySelector('#link_pic').value;

  addCard(cardName, cardLink);
});


//----------------------------------3. Форма добавления карточки----------------------------------



//----------------------------------4. Добавление карточки--------------------------------


//----------------------------------5. Лайк карточки----------------------------------



//----------------------------------6. Удаление карточки----------------------------------



//----------------------------------7. Открытие попапа с картинкой----------------------------------



//----------------------------------8. Плавное открытие и закрытие попапов----------------------------------
