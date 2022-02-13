const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.cards__container');
const addButton = content.querySelector('.profile__button_type_add');
const modal = document.querySelector('.popup');
const closeButton = document.querySelectorAll('.popup__button_type_close');
const editButton = document.querySelector('.profile__button_type_edit');

//----------------------------------1. Работа модальных окон----------------------------------

//Открытие и закрытие модального окна
function openModal(event) {
  if (event.target.matches('.profile__button_type_edit')) {
    modal.classList.add('popup_opened');
  }
  else if (event.target.matches('.profile__button_type_add')) {
    modal.classList.add('popup_opened');
  }
  else if (event.target.matches('.popup .popup__button_type_close')) {
    modal.classList.remove('popup_opened');
  }
  //добавить еще одно закрытие после создания модльного окна добавения карточек картинок
}

editButton.addEventListener('click', openModal);
closeButton.forEach(btn => btn.addEventListener('click', openModal));

//----------------------------------Поля формы----------------------------------

let nameProfile = document.getElementById('name').value = 'Жак-Ив Кусто' ;
let profProfile = document.getElementById('about').value = 'Исследователь океана' ;

//----------------------------------Редактирование имени и информации о себе----------------------------------



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
//----------------------------------3. Форма добавления карточки----------------------------------



//----------------------------------4. Добавление карточки----------------------------------

addButton.addEventListener('click', function () {
  const link = document.querySelector('.card__pic');
  const name = document.querySelector('.card__title');

  addButton(link.value, name.value);

  link.value = '';
  name.value = '';
});

//----------------------------------5. Лайк карточки----------------------------------

function addCard(linkValue, nameValue) {
  const cardsTemplate = document.querySelector('cards').content;
  const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__pic').textContent = linkValue;
  cardElement.querySelector('.card__title').textContent = nameValue;

  cardElement.querySelector('.card__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__button_state_active');
  });
  cardsContainer.append(cardElement);
}

//----------------------------------6. Удаление карточки----------------------------------



//----------------------------------7. Открытие попапа с картинкой----------------------------------



//----------------------------------8. Плавное открытие и закрытие попапов----------------------------------
