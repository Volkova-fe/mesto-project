const showInputError = (formSelector, inputSelector, inputErrorClass) => {
  const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.add('popup__input_type_error');
  errorElement.textContent = inputErrorClass;
  errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formSelector, inputSelector) => {
  const inputErrorClass = formSelector.querySelector(`.${inputSelector.id}-error`);
  inputSelector.classList.remove('popup__input_type_error');
  inputErrorClass.classList.remove('popup__error_visible');
  inputErrorClass.textContent = '';
};

const checkInputValidity = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
  } else {
    hideInputError(formSelector, inputSelector);
  }
};

const setEventListeners = (formSelector) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formSelector.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputSelector) => {
    inputSelector.addEventListener('input', function () {
      checkInputValidity(formSelector, inputSelector);
      toggleButtonState(inputList, inputSelector);
    });
  });
};

function Validation(enableValidation) {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formSelector) => {
    formSelector.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  });
};

function hasInvalidInput(inputSelector) {
  return inputSelector.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}
