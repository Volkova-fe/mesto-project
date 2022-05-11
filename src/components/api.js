import 'core-js/es/symbol';
import 'core-js/es/object';
import { API_URL, token } from '../utils/variables';

export const config = {
  baseUrl: `${API_URL}`,
  headers: {
    authorization: `${token}`,
    'Content-Type': 'application/json'
  }
};

export const responseCheck = res => {
  if (res.ok) {
    return res.json() // then
  } else {
    return Promise.reject(`Ошибка: code ${res.status}`) // catch
  }
}

export const responseCheckWithNoData = res => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: code ${res.status}`) // catch
  }
}
//------------------------------------------------------------------
//Получить начальные данные о пользователе
export const getInfoProfile = () => {
  return fetch(`${API_URL}/users/me`, {
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(responseCheck)
};

//Отредактировать данные о пользователе
export const editInfoProfile = (nameProfile, profProfile) => {
  return fetch(`${API_URL}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: nameProfile.value,
      about: profProfile.value
    }),
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
};

//Отредактировать аватар пользователя
export const editAvatarProfile = (avatarLink) => {
  return fetch(`${API_URL}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatarLink
    }),
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
};

//Получить начальные карточки
export const getInitialCards = () => {
  return fetch(`${API_URL}/cards`, {
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(responseCheck)
};

//Добавить новую карточку
export const addNewCards = (name, link) => {
  return fetch(`${API_URL}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name, link
    }),
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
};

//Удалить карточку
export const deleteCard = (cardid) => {
  return fetch(`${API_URL}/cards/${cardid}`, {
    method: 'DELETE',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
};

//Добавить лайка карточке
export const addLikeCard = (cardid) => {
  return fetch(`${API_URL}/cards/likes/${cardid}`, {
    method: 'PUT',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
};

//удалить лайк карточке
export const deleteLikeCard = (cardid) => {
  return fetch(`${API_URL}/cards/likes/${cardid}`, {
    method: 'DELETE',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
};
