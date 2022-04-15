export const enableValidation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
});

export const showInputError = (formSelector, inputSelector, errorMessage, enableValidation) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.add(enableValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidation.errorClass);
};

export const hideInputError = (formSelector, inputSelector, enableValidation) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.remove(enableValidation.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(enableValidation.errorClass);
};

export const checkInputValidity = (formSelector, inputSelector, enableValidation) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage, enableValidation);
  } else {
    hideInputError(formSelector, inputSelector, enableValidation);
  }
};

export function setEventListeners(formSelector, enableValidation) {
  const inputList = Array.from(formSelector.querySelectorAll(enableValidation.inputSelector));
  const buttonElement = formSelector.querySelector(enableValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, enableValidation);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('change', function () {
      checkInputValidity(formSelector, inputSelector, enableValidation);
      toggleButtonState(inputList, buttonElement, enableValidation);
    });
  });
};

export function validation(enableValidation) {
  const formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formSelector, enableValidation);
  });
};

export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

export function toggleButtonState(inputList, buttonElement, enableValidation) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(enableValidation.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(enableValidation.inactiveButtonClass);
  }
}

//-------------------------------------------------------------------

export function hideErorrs(popup) {
  const formElement = popup.querySelector('.popup__form');
  const inputList = formElement.querySelectorAll('.popup__input');
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, enableValidation);
  });
};
