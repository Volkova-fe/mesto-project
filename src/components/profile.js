import { modalProfile, nameProfile, profProfile, nameInput, jobInput } from './utils';
import { closePopup } from './modal';
//----------------------------------Редактирование имени и информации о себе----------------------------------
export function valueForm() {
  nameProfile.value = nameInput.textContent;
  profProfile.value = jobInput.textContent;
}

export function formSubmitHandler(evt) {
  evt.preventDefault();
  nameInput.textContent = nameProfile.value;
  jobInput.textContent = profProfile.value;
  closePopup(modalProfile);
}

