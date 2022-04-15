import { modalProfile, nameProfile, profProfile, nameInput, jobInput, profileSaveButtom, validationSettings } from './utils';
import { hideInputError } from './validate';
import { closePopup } from './modal';
//----------------------------------Редактирование имени и информации о себе----------------------------------
export function fillProfileInputs() {
  nameProfile.value = nameInput.textContent;
  profProfile.value = jobInput.textContent;
  profileSaveButtom.classList.add(validationSettings.inactiveButtonClass);
  profileSaveButtom.disabled = true;
}

export function handleProfileFormSubmit() {
  nameInput.textContent = nameProfile.value;
  jobInput.textContent = profProfile.value;
  closePopup(modalProfile);
}

export function hideErorrs(popup) {
  const formElement = popup.querySelector(validationSettings.formSelector);
  const inputList = formElement.querySelectorAll(validationSettings.inputSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings);
  });
};
