
export default class Card {
  constructor({selector}, card, api, user, handleCardClick, handleCardDelete) {
    this._selector = selector;
    this._image = card.link;
    this._name = card.name;
    this._likes = card.likes;;

    this._api = api;
    this._id = card._id;
    this._userID = user._id;
    this._owner = card.owner._id;

    this._handleCardDelete = handleCardDelete;
    this._handleCardClick = handleCardClick;

  }

  //клонирование темплейта
  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  //создание карточки
  generateCard() {
    this._element = this._getTemplate();
    const image = this._element.querySelector('.card__pic');
    this.likeButton = this._element.querySelector('#like_card');

    image.src = this._image;
    image.alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;
    this._likeCounter = this._element.querySelector('.card__count-likes');

    if (this._likes.length > 0) this._likeCounter.textContent = this._likes.length
    else this._likeCounter.textContent = '0';

    this._checkLike(this._likes);
    this._setEventListener();

    if (this._owner !== this._userID) {
      this._element.querySelector('.card__remove').classList.add('card__remove_hidden');
    }

    return this._element;
  }

  //слушатели
  _setEventListener() {
    this._element.querySelector('#like_card').addEventListener('click', () => {
      this._toggleLike();
    });
    this._element.querySelector('.card__pic').addEventListener('click', () => {
      this._handleCardClick(this._name, this._image);
    });
    this._element.querySelector('.card__remove').addEventListener("click", () => {
      this._handleCardDelete(this._id, this._element);
    });
  }
  //лайк
  _toggleLike() {

    if (this.likeButton.classList.contains('card__button_state_active')) {
      this._api
        .deleteLikeCard(this._id)
        .then((data) => {
          this._likeCounter.textContent = data.likes.length;
          this.likeButton.classList.remove('card__button_state_active');
        })
        .catch((err) => console.log(err));
    } else {
      this._api
        .addLikeCard(this._id)
        .then((data) => {
          this._likeCounter.textContent = data.likes.length;
          this.likeButton.classList.add('card__button_state_active');
        })
        .catch((err) => console.log(err));
    }
  }

  _checkLike(likes) {
    const myLike = (element) => element._id === this._userID;
    if (likes.some(myLike)) { this.likeButton.classList.add('card__button_state_active') }
  }
}

/*Чтобы иметь доступ ко всем методам класса в index.js, можно передать this в вызов функции:

        this._likeButton.addEventListener('click', () => {
            this._handleLike(this);
        });
И теперь в index.js в функции можно использовать этот аргумент для вызова методов класса:

function handleLike(card) {
        api.likeCard(card.getId())
            .then((res) => {
                card.updateLikes(res)
            })
            .catch((err) => {
                console.log(err);
            });
}
Тоже самое и с удалениями и тд.*/
