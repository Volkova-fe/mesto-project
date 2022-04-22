import 'core-js/es/symbol';
import 'core-js/es/object';

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: '7c830fbc-53f4-4c63-a7ce-3acd53d5bb5b',
    'Content-Type': 'application/json'
  }
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    method: 'GET',
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const addNewCards = (nameCard, linkCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    method: 'POST',
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  })
}

export const removeCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    method: 'DELETE'
  })
}

//=====================Обновления данных профиля и редактирование

export const getInfoProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const editInfoProfile = (editName, editAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: editName,
      about: editAbout
    })
  });
}
