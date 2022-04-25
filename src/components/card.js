import { modalPic, cardTemplate, imageModalPic, titleModalPic } from './variables';
import { openPopup } from './modal';
import { deleteCard, addLikeCard, deleteLikeCard, responseCheck } from './api';

//---------------------------------- Добавление карточки--------------------------------
//Создание карточки
export function createCard(name, link, cardId, likesCount, isLiked) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const elementPic = cardElement.querySelector('.card__pic');
  const cardRemoveButton = cardElement.querySelector('.card__remove');
  const cardLikeButton = cardElement.querySelector('#like_card');
  const cardLikeCount = cardElement.querySelector('.card__count-likes');


  cardElement.querySelector('.card__title').textContent = name;
  elementPic.src = link;
  elementPic.alt = name;
  cardLikeCount.textContent = likesCount;

  // лайк карточки
  if (isLiked) cardLikeButton.classList.add('card__button_state_active');
  cardLikeButton.addEventListener('click', (evt) => {
    clickLikeButton(cardLikeButton, cardLikeCount, cardId);
  });

  //Удаление карточки
  cardRemoveButton.addEventListener('click', () => {
    deleteCard(cardId)
    .then(responseCheckWithNoData => {
      cardElement.remove();
      console.log(responseCheckWithNoData);
    })
    .catch(err => console.error(err));
  });

  //открытие попап для новых карточек
  elementPic.addEventListener('click', function () {
    showCard(name, link);
    openPopup(modalPic);
  });

  return cardElement;
}


//--------------------------добавление в контейнер карточек-------------------------------
export function addCard(container, cardElement) {
  container.prepend(cardElement);
}

//-----------------------Открытие и закрытие попап с карточкой---------------------------
export function showCard(popupName, popupLink) {
  openPopup(modalPic);
  titleModalPic.textContent = popupName;
  imageModalPic.src = popupLink;
  imageModalPic.alt = popupName;
}

//-----------------------Добавление и удаление лайка карточки---------------------------
export function clickLikeButton(cardLikeButton, cardLikeCount, cardId) {
  if (cardLikeButton.classList.contains('card__button_state_active')) {
    deleteLikeCard(cardId)
    .then(responseCheck)
    .then(res => {
      cardLikeCount.textContent = res.likes.length;
      cardLikeButton.classList.remove('card__button_state_active');
    })
    .catch(err => console.error(err))
  } else {
    addLikeCard(cardId)
    .then(responseCheck)
    .then(res => {
      cardLikeCount.textContent = res.likes.length;
      cardLikeButton.classList.add('card__button_state_active');
    })
    .catch(err => console.error(err))
  }
}

/*    deleteCard(cardId);
Практически все вызовы методов api должны выглядеть примерно так:

api.метод()
.then((res) => `res` - это ответ от сервера при успешном запросе, в котором чаще всего вся нужная информация для изменения DOM. Тут делаем все изменения DOM (лайки, удаления, добавления карточки, закрытия попапов и тд     )
    . catch((ошибка) => обязательно ловим возможные ошибки в конце запроса )
    .finally(() => в этом блоке чаще всего изменяют текст кнопки и скрывают эффект загрузки)

Нужно все запросы в проекте делать по этой схеме*/

/*  cardElement.remove();
Любые изменения в DOM нужно делать только при удачном ответе от сервера в блоке then, иначе при ошибке сервера на сайте изменится информация, что введет пользователя в заблуждение, что все прошло удачно.
НАДО ИСПРАВИТЬ
Отметить как выполненный
*/

/*export function clickLikeButton(cardLikeButton, cardLikeCount, cardId) {

  if (cardLikeButton.classList.contains('card__button_state_active')) {

    deleteLikeCard(cardId);

    cardLikeCount.textContent--;
Изменение кол-ва лайков должно быть только с помощью для массива лайков, который приходит с сервера в блоке then. Там целая карточка приходит в ответе с новыми лайками. likesCounter.textContent = res.likes.length
НАДО ИСПРАВИТЬ
Отметить как выполненный
*/

/*  cardLikeButton.classList.toggle('card__button_state_active');
Любые изменения в DOM нужно делать только при удачном ответе от сервера в блоке then, иначе при ошибке сервера на сайте изменится информация, что введет пользователя в заблуждение, что все прошло удачно.
НАДО ИСПРАВИТЬ
Отметить как выполненный*/
