const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.cards__container');
const addButton = content.querySelector('.profile__button_type_add');

//1. Работа модальных окон

//Открытие и закрытие модального окна
//Поля формы
//Редактирование имени и информации о себе

//2. Шесть карточек «из коробки»
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
//3. Форма добавления карточки
//4. Добавление карточки
addButton.addEventListener('click', function () {
  const link = document.querySelector('.card__pic');
  const name = document.querySelector('.card__title');

  addButton(link.value, name.value);

  link.value = '';
  name.value = '';
});
//5. Лайк карточки
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
//6. Удаление карточки
//7. Открытие попапа с картинкой
//8. Плавное открытие и закрытие попапов
