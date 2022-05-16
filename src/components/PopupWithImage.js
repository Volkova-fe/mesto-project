import Popup from "./Popup";
export default class PopupWithForm extends Popup {
  constructor(selector) {
    super(selector);
    this._picName = document.querySelector('.popup__title');
    this._picLink = document.querySelector('.popup__image');
  }

  open(name, link) {
    this._picLink.src = link;
    this._picName.alt = name;
    this._picName.textContent = name;

    super.open();
  }
}
