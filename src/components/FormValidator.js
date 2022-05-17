export default class FormValidator {
  constructor(options, formItem) {
    this._formItem = formItem;
    this._options = options;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._inputSelector = options.inputSelector;
    this._inputs = Array.from(
      this._formItem.querySelectorAll(this._inputSelector)
    );
    this._submitButtonSelector = options.submitButtonSelector;
    this._buttonClass = this._formItem.querySelector(
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
      this._buttonClass.disabled = true;
      this._buttonClass.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonClass.disabled = false;
      this._buttonClass.classList.remove(this._inactiveButtonClass);
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
    this._buttonClass.classList.add(this._inactiveButtonClass);
    this._inputs.forEach((input) => {
      this._hideInputError(input)
    });
  }

  _validation() {
    this._formItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

}
