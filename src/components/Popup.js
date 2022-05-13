export default class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  open() {
    this._selector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscape);
  }

  close() {
    this._selector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscape);
  }

  _handleEscape = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._selector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        this.close()
      }
    })
  }
}

