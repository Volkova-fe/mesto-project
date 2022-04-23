import 'core-js/es/symbol';
import 'core-js/es/object';
import { API_URL, token } from './utils';

export const config = {
  baseUrl: `${API_URL}`,
  headers: {
    authorization: `${token}`,
    'Content-Type': 'application/json'
  }
};

const responseCheck = res => {
  if (res.ok) {
    return res.json() // then
  } else {
    return Promise.reject(`Ошибка: code ${res.status}`) // catch
  }
}

const responseCheckWithNoData = res => {
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
export const editInfoProfile = (name, about) => {
  return fetch(`${API_URL}/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
      name, about
    }),
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(responseCheck)
    .catch(err => console.error(err))
};

//Отредактировать данные о пользователе
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
    .then(responseCheck)
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
    .then(responseCheck)
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
  .then(responseCheckWithNoData);
};

//Добавить лайка карточке
export const addLikeCard = (cardid) => {
  return fetch(`${API_URL}/cards/${cardid}`, {
    method: 'PUT',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(responseCheckWithNoData);
};

//удалить лайк карточке
export const deleteLikeCard = (cardid) => {
  return fetch(`${API_URL}/cards/${cardid}`, {
    method: 'DELETE',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(responseCheckWithNoData);
};
