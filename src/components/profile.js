import { modalProfile, nameProfile, profProfile, nameInput, jobInput, profileSaveButtom, validationSettings } from './utils';
import { hideInputError } from './validate';
import { closePopup } from './modal';
import { editInfoProfile, getInfoProfile } from './api';
//----------------------------------Редактирование имени и информации о себе----------------------------------


export function fillProfileInputs(qwery) {
  const promise = qwery();
  promise
  .then ((data) => {
    nameInput.textContent = data.name;
    jobInput.textContent = data.about;
    profileSaveButtom.classList.add(validationSettings.inactiveButtonClass);
    profileSaveButtom.disabled = true;
  })

}

export function handleProfileFormSubmit() {
  const nameEdit = nameProfile.value;
  const aboutEdit = profProfile.value;
  editInfoProfile(nameEdit, aboutEdit);
  fillProfileInputs(getInfoProfile)
  closePopup(modalProfile);
}

export function hideErorrs(popup) {
  const formElement = popup.querySelector(validationSettings.formSelector);
  const inputList = formElement.querySelectorAll(validationSettings.inputSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings);
  });
};
