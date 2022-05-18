export default class FormValidator {
  constructor(options, formItem) {
    this._formItem = formItem;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._inputSelector = options.inputSelector;
    this._inputs = Array.from(
      this._formItem.querySelectorAll(this._inputSelector)
    );
    this._submitButtonSelector = options.submitButtonSelector;
    this._submitButton = this._formItem.querySelector(
      this._submitButtonSelector
    );
    this._inactiveButtonClass = options.inactiveButtonClass;
  }

  _showInputError(inputItem, errorMessage) {
    const errorElement = this._formItem.querySelector(`#${inputItem.id}-error`);
    inputItem.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputItem) {
    const errorElement = this._formItem.querySelector(`#${inputItem.id}-error`);
    inputItem.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity = (inputItem) => {
    if (!inputItem.validity.valid) {
      this._showInputError(inputItem, inputItem.validationMessage);
    } else {
      this._hideInputError(inputItem);
    }
  };

  _invalidInput() {
    return this._inputs.some((inputItem) => {
      return !inputItem.validity.valid;
    })
  };

  _toggleButtonState() {
    if (this._invalidInput()) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputs.forEach((inputItem) => {
      inputItem.addEventListener('keyup', () => {
        this._checkInputValidity(inputItem);
        this._toggleButtonState();
      });
    });
  }

  resetFormValidation() {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      this._hideInputError(input)
    });
  }

  enableValidation() {
    this._formItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

}



/*this._buttonClass.classList.add(this._inactiveButtonClass);

это нужно удалить

Вы тут просто делаете кнопку серой, а нужно вызывать _toggleButtonState

Не нужно дублировать код управления кнопкой

  resetFormValidation() {
    this._toggleButtonState();

    this._inputs.forEach((input) => {
_toggleButtonState деактивирует кнопку сабмита без проблем тут*/
