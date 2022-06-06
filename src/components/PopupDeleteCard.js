import Popup from './Popup';

export default class PopupDeleteCard extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    document.querySelector('#deletePopupButton').addEventListener('mousedown', this._handleFormSubmit);
  }

  open(id, card) {
    this._id = id;
    this.card = card;
    super.open();
  }
}
