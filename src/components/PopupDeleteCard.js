import Popup from './Popup';

export default class PopupDeleteCard extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    console.log(this._selector)
  }

  setEventListeners() {
    super.setEventListeners();
    this._element.querySelector('#deletePopupButton').addEventListener('mousedown', this._handleFormSubmit());
  }


  close() {
    super.close();
  }
}
