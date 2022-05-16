
export default class Card {
  constructor(card, selector, api, user, handleCardClick) {
    this._image = card.link;
    this._name = card.name;
    this._selector = selector;
    this._likes = card.likes;
    this._api = api;
    this._id = card._id;
    this._userID = user._id;
    this._handleCardClick = handleCardClick;

  }
  //клонирование темплейта
  _getTemplate() {
    return document
      .querySelector('#cards__template')
      .content.querySelector('.card')
      .cloneNode(true);
  }
  //создание карточки
  generateCard() {
    this._element = this._getTemplate();
    const image = this._element.querySelector('.card__pic');
    image.src = this._image;
    image.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._likeCounter = this._element.querySelector('.card__count-likes');
    if (this._likes.length > 0) this._likeCounter.textContent = this._likes.length
    else this._likeCounter.textContent = '0';
    this._checkLike(this._likes);
    this._setEventListener();

    return this._element;
  }
  //слушатели
  _setEventListener() {
    this._element.querySelector('#like_card').addEventListener('click', () => {
      this._likeSwitch();
    });
    this._element.querySelector('.card__pic').addEventListener('click', () => {
      this._handleCardClick(this._name, this._image);
    });
  }
  //лайк
  _likeSwitch() {
    const likeButton = this._element.querySelector('#like_card');
    if (likeButton.classList.contains('card__button_state_active')) {
      this._api
        .deleteLikeCard(this._id)
        .then((data) => {
          this._likeCounter.textContent = data.likes.length;
          likeButton.classList.remove('card__button_state_active');
        })
        .catch((err) => console.log(err));
    } else {
      this._api
        .addLikeCard(this._id)
        .then((data) => {
          this._likeCounter.textContent = data.likes.length;
          likeButton.classList.add('card__button_state_active');
        })
        .catch((err) => console.log(err));
    }
  }

  _checkLike(likes) {
    this.likeButton = this._element.querySelector('#like_card');
    const myLike = (element) => element._id === this._userID;
    if (likes.some(myLike)) { this.likeButton.classList.add('card__button_state_active') }
  }
}
