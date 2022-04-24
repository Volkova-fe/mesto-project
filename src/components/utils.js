import { validationSettings } from './variables';

//--------------------Деактивация кнопки------------------------
export function disabledSaveButton(saveButton) {
  saveButton.classList.add(validationSettings.inactiveButtonClass);
  saveButton.disabled = true;
};

//--------------------Ожидание загрузки для карточек-------------
export function renderCardLoading(isLoading, form) {
  if (isLoading) {
    form.querySelector(
      validationSettings.submitButtonSelector
    ).textContent = 'Сохранение...';
  } else {
    form.querySelector(
      validationSettings.submitButtonSelector
    ).textContent = 'Создать';
  }
}

//----------------------Ожидание загрузки для профиля-------------
export function renderProfileLoading(isLoading, form) {
  if (isLoading) {
    form.querySelector(
      validationSettings.submitButtonSelector
    ).textContent = 'Сохранение...';
  } else {
    form.querySelector(
      validationSettings.submitButtonSelector
    ).textContent = 'Сохранить';
  }
}
