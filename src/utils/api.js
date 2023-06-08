const configApi = {
  url: 'https://nomoreparties.co/v1/cohort-64/',
  headers: {
    'content-type': 'application/json',
    authorization: 'fedbf8d8-f685-4219-bcb3-9f8a312759fb'
  }
};

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkError(res) {
    if (res.ok) { return res.json(); }
    else {
      return Promise.reject(`ПРОИЗОШЛА ОШИБКА: ${res.status} `)

    }
  }

  _renamerUserInputApi({ inputName, inputMission }) {
    const data = {};
    data.name = inputName;
    data.about = inputMission;
    return data;
  }

  _renamerAvatarLink({ avatarLink }) {
    const data = {};
    data.avatar = avatarLink;
    return data;
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: this._headers
    })
      .then((res) => {
        return this._checkError(res);
      })
  }
  // patchUserInfo({ inputName, inputMission }) {
  patchUserInfo({ name, about }) {
    // const data = this._renamerUserInputApi({ inputName, inputMission });
    const data = { name, about };
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then((res) => {
        return this._checkError(res);
      })
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: this._headers
    })
      .then((res) => {
        return this._checkError(res);
      })
  }

  setCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then((res) => {
        return this._checkError(res);
      })
  }

  changeLikeCardStatus(likeId, status) {
    if (status) {
      return fetch(`${this._url}cards/${likeId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
        .then((res) => {
          return this._checkError(res);
        })
    } else {
      return fetch(`${this._url}cards/${likeId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then((res) => {
          return this._checkError(res);
        })
    }

  }

  putLikeCard(likeId) {
    return fetch(`${this._url}cards/${likeId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((res) => {
        return this._checkError(res);
      })
  }

  deleteLikeCard(likeId) {
    return fetch(`${this._url}cards/${likeId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        return this._checkError(res);
      })
  }

  patchAvatar(avatarLink) {
    const data = this._renamerAvatarLink(avatarLink);
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then((res) => {
        return this._checkError(res);
      })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        return this._checkError(res);
      })
  }
}

const api = new Api(configApi);

export default api;
