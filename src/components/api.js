import 'core-js/es/symbol';
import 'core-js/es/object';

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  };

  _checkResponse = res => {
    if (res.ok) {
      return res.json() // then
    } else {
      return Promise.reject(`Ошибка: code ${res.status}`) // catch
    }
  };

  //Получить начальные данные о пользователе
  getInfoProfile = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
  };

  //Отредактировать данные о пользователе
  editInfoProfile = (name, about) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about,
      }),
      headers: this._headers,
    })
      .then(this._checkResponse)
  };

  //Отредактировать аватар пользователя
  editAvatarProfile = (link) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: link,
      }),
      headers: this._headers,
    })
      .then(this._checkResponse)
  };

  //Получить начальные карточки
  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
  };

  //Добавить новую карточку
  addNewCards = (data) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
      headers: this._headers,
    })
      .then(this._checkResponse)
  };

  //Удалить карточку
  deleteCard = (cardid) => {
    return fetch(`${this._baseUrl}/cards/${cardid}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse)
  };

  //Добавить лайка карточке
  addLikeCard = (cardid) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardid}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._checkResponse)
  };

  //удалить лайк карточке
  deleteLikeCard = (cardid) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardid}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkResponse)
  };
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: '7c830fbc-53f4-4c63-a7ce-3acd53d5bb5b',
    'Content-Type': 'application/json'
  }
});
