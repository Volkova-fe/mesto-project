import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._item = document.querySelector(this._selector);
    this.handleFormSubmit = handleFormSubmit;
  }
  setEventListeners() {
    super.setEventListeners();
    this._item.querySelector('.popup__delete').addEventListener('mousedown', this.handleFormSubmit);
  }
  open(card, id) {
    this._card = card;
    this._id = id;
    super.open();
    this.setEventListeners();
  }
  close() {
    super.close();
  }
}
