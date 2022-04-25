import {
  modalProfile, validationSettings, modalAvatar,
  avatarForm, nameProfile, nameInput, profProfile,
  jobInput, avatarInput, avatarSaveform, profileform,
  profileSaveButtom, profileAvatar
} from './variables';
import { hideInputError } from './validate';
import { closePopup } from './modal';
import { editInfoProfile, editAvatarProfile, responseCheck } from './api';
import { disabledSaveButton, renderProfileLoading } from './utils';
//----------------------------------Редактирование имени и информации о себе----------------------------------

export function handleProfileFormSubmit() {
  renderProfileLoading(true, profileform);
  editInfoProfile(nameProfile, profProfile)
    .then(responseCheck)
    .then(res => {
      nameInput.textContent = res.name;
      jobInput.textContent = res.about;
      disabledSaveButton(profileSaveButtom);
      closePopup(modalProfile);
    })
    .catch(err => console.error(err))
    .finally(() => {
      renderProfileLoading(false, profileform);
    });
}

export function editAvatarPic() {
  const avatarLink = avatarInput.value;
  renderProfileLoading(true, avatarForm);
  editAvatarProfile(avatarLink)
  .then(responseCheck)
  .then(res => {
    profileAvatar.src = res.avatar;
    disabledSaveButton(avatarSaveform);
    avatarForm.reset();
    closePopup(modalAvatar);
  })
    .catch(err => console.error(err))
    .finally(() => {
      renderProfileLoading(false, avatarForm);
    });
};

export function hideErorrs(popup) {
  const formElement = popup.querySelector(validationSettings.formSelector);
  const inputList = formElement.querySelectorAll(validationSettings.inputSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings);
  });
};

/*  nameInput.textContent = nameProfile.value;
Любые изменения в DOM нужно делать только при удачном
ответе от сервера в блоке then, иначе при ошибке сервера
на сайте изменится информация, что введет пользователя в
заблуждение, что все прошло удачно.
*/

/*   disabledSaveButton(profileSaveButtom);
Деактивировать кнопку лучше тоже после удачного ответа от сервера в блоке then
НАДО ИСПРАВИТЬ
Отметить как не выполненный*/

/*    closePopup(modalProfile);
Закрывать попапы нужно только после удачного ответа от сервера в блоке then,
иначе пользователь не поймет, что произошла ошибка, к тому же инпуты могут очиститься,
и придется опять печатать данные для отправки (а формы иногда бывают по 10-15 инпутов).
 А еще не будет видно изменение текста кнопки сабмита, если его делаете.
НАДО ИСПРАВИТЬ
*/
