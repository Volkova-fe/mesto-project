const content = document.querySelector('.content');
const modalProfile = document.querySelector('.popup__profile');
const modalCard = document.querySelector('.popup__card');
const modalPic = document.querySelector('.popup__pic');
const closeButton = document.querySelectorAll('.popup__button_type_close');
const saveButton = document.querySelector('.popup__profile .popup__button_type_save');
//-------------------------------------------------------------------
const formElement = document.querySelector('#edit_profile');
const nameProfile = document.querySelector('#name');
const profProfile = document.querySelector('#about');
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
const popupItem = document.querySelector('.popup__pic');

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
function openPopup(popup){
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//----------------------------------Редактирование имени и информации о себе----------------------------------

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = nameProfile.value;
  jobInput.textContent = profProfile.value;
}

//---------------------------------- Добавление карточки--------------------------------


initialCards.forEach(card => {
  addCard(card.name, card.link);
}); //добавляем шесть карточек на сайт

function showCard(popupName, popupLink) {
  popupItem.querySelector('.popup__title').textContent = popupName;
  popupItem.querySelector('.popup__image').src = popupLink;
  popupItem.querySelector('.popup__image').alt = popupName;
}

function addCard(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardName;
  cardElement.querySelector('.card__pic').src = cardLink;
  cardElement.querySelector('.card__pic').alt = cardName;

  cardElement.querySelector('.card__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__button_state_active'); // лайк карточки
  });

  cardElement.querySelector('.card__pic').addEventListener('click', (evt) => {
    showCard(cardName, cardLink); //Открытие попапа с картинкой
    openPopup(evt);
  });

  cardElement.querySelector('.card__remove').addEventListener('click', function () {
    const cards = document.querySelector('.card');
    cards.remove(); //Удаление карточки
  });

  cardsContainer.prepend(cardElement);
}

function addNewCards (evt) {
  evt.preventDefault();
  const cardName = document.querySelector('#name_pic').value;
  const cardLink = document.querySelector('#link_pic').value;

  addCard(cardName, cardLink);
  document.getElementById('add_card').reset();
}

//Вынесите отдельно функцию создания карточки:
function createCard(name, link) {
const element = .............. //создается DOM элемент карточки
............. //в карточку вставляются данные и навешиваются обработчики
return element; //возвращается созданная карточка
}
//И отдельно функцию добавления карточки в контейнер
function addCard(container, cardElement) { .............. //cardElement добавляется в container }

//Таким образом добавление будет выглядеть так:
addCard(listElement, createCard(card.name, card.link) );




createButton.addEventListener('submit',addNewCards);


formElement.addEventListener('submit', formSubmitHandler);
saveButton.addEventListener('click', ()  => closePopup(modalProfile));
editButton.addEventListener('click', ()  => openPopup(modalProfile));
closeButton.forEach(btn => btn.addEventListener('click', ()  => closePopup(modalProfile)));
addButton.addEventListener('click',  ()  => openPopup(modalCard));
closeButton.forEach(btn => btn.addEventListener('click', ()  => closePopup(modalCard)));
