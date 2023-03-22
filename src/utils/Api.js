class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse = res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  _request(url, options) {
    return fetch(url, options)
    .then(this._checkResponse)
  }

  getInitialProfile() {
    return this._request(`${this._baseUrl}/users/me`, {headers: this._headers})
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {headers: this._headers})
  }

  editProfileInfo({name, about}) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
  }

  editAvatar(avatarLink) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatarLink)
    })
  }

  postNewCard(cardInfo) {
    return this._request(`${this._baseUrl}/cards`,{
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardInfo.name,
        link: cardInfo.link
      })
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  toggleLike(cardId, method) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers,
    })
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '3f5d2b4a-7874-41d6-a2f5-b674954a74cc',
    'Content-Type': 'application/json'
  }
})
