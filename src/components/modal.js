
//----------------------------------Открытие и закрытие модального окна----------------------------------
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
  document.addEventListener('click', mouseOverlayHandler);
};

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
  document.removeEventListener('click', mouseOverlayHandler);
};
//-----------------------Открытие и закрытие попап при нажатии Esc----------

export function keyHandler(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  };
};

//-----------------------Открытие и закрытие попап при на overlay----------

export function mouseOverlayHandler(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup')) {
    closePopup(openedPopup);
  };
};

