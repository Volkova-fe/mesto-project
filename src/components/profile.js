import {
  modalProfile, nameProfile, profProfile,
  nameInput, jobInput, profileSaveButtom,
  validationSettings,
  profileAvatar, avatarInput, avatarSaveform,
  modalAvatar
} from './utils';
import { hideInputError } from './validate';
import { closePopup } from './modal';
import { editInfoProfile, getInfoProfile, editAvatarProfile } from './api';
//----------------------------------Редактирование имени и информации о себе----------------------------------

export function fillProfileInputs() {
  getInfoProfile()
    .then((data) => {
      nameInput.textContent = data.name;
      jobInput.textContent = data.about;
      profileAvatar.src = data.avatar;
      profileAvatar.alt = `Аватар ${data.name}`;
      disabledSaveButton(profileSaveButtom)
    })
}

export function handleProfileFormSubmit() {
  const nameEdit = nameProfile.value;
  const aboutEdit = profProfile.value;
  editInfoProfile(nameEdit, aboutEdit);
  fillProfileInputs();
  closePopup(modalProfile);
}

export function hideErorrs(popup) {
  const formElement = popup.querySelector(validationSettings.formSelector);
  const inputList = formElement.querySelectorAll(validationSettings.inputSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings);
  });
};

export function editAvatarPic() {
  const avatarLink = avatarInput.value;
  editAvatarProfile(avatarLink);
  fillProfileInputs();
  closePopup(modalAvatar);
  disabledSaveButton(avatarSaveform);
};

export function disabledSaveButton(saveButton) {
  saveButton.classList.add(validationSettings.inactiveButtonClass);
  saveButton.disabled = true;
};
