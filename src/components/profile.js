import {
  modalProfile, validationSettings, modalAvatar,
  avatarForm, nameProfile, nameInput, profProfile,
  jobInput, avatarInput, avatarSaveform, profileform,
  profileSaveButtom
} from './variables';
import { hideInputError } from './validate';
import { closePopup } from './modal';
import { editInfoProfile, editAvatarProfile } from './api';
import { disabledSaveButton, renderProfileLoading } from './utils';
//----------------------------------Редактирование имени и информации о себе----------------------------------

export function handleProfileFormSubmit() {
  nameInput.textContent = nameProfile.value;
  jobInput.textContent = profProfile.value;
  renderProfileLoading(true, profileform);
  editInfoProfile(nameProfile, profProfile)
    .catch(err => console.error(err))
    .finally(() => {
      renderProfileLoading(false, profileform);
      disabledSaveButton(profileSaveButtom);
      closePopup(modalProfile);
    });
}

export function editAvatarPic() {
  const avatarLink = avatarInput.value;
  editAvatarProfile(avatarLink)
    .catch(err => console.error(err))
    .finally(() => {
      renderProfileLoading(false, avatarForm);
      disabledSaveButton(avatarSaveform);
      closePopup(modalAvatar);
    });
};

export function hideErorrs(popup) {
  const formElement = popup.querySelector(validationSettings.formSelector);
  const inputList = formElement.querySelectorAll(validationSettings.inputSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings);
  });
};
