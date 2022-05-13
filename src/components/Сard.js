
export default class Card {
  constructor(card, selector) {
    this._image = card.link;
    this._name = card.name;
    this._selector = selector;
  }
  _getTemplate() {
    return document
      .querySelector('#cards__template')
      .content.querySelector('.card')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    const image = this._element.querySelector('.card__pic');
    image.src = this._image;
    image.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
}

