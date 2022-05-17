import Popup from './Popup';

export default class PopupDeleteCard extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    document.querySelector('#deletePopupButton').addEventListener('mousedown', handleFormSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
  }


  open(id, card) {
    this._id = id;
    this.card = card;
    super.open();
  }

  close() {
    super.close();
  }
}
