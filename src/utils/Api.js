class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse = (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

  _request(url, method, body) {
    const options = {
      headers: this._headers,
      credentials: "include",
      method,
    };
    if (body !== undefined) {
      options.body = JSON.stringify(body);
    }
    return fetch(url, options).then(this._checkResponse);
  }

  getInitialProfile() {
    return this._request(`${this._baseUrl}/users/me`, "GET");
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, "GET");
  }

  editProfileInfo({ name, about }) {
    return this._request(`${this._baseUrl}/users/me`, "PATCH", { name, about });
  }

  editAvatar(avatarLink) {
    return this._request(
      `${this._baseUrl}/users/me/avatar`,
      "PATCH",
      avatarLink
    );
  }

  postNewCard(cardInfo) {
    return this._request(`${this._baseUrl}/cards`, "POST", {
      name: cardInfo.name,
      link: cardInfo.link,
    });
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, "DELETE");
  }

  toggleLike(cardId, isLiked) {
    return this._request(
      `${this._baseUrl}/cards/${cardId}/likes`,
      isLiked ? "DELETE" : "PUT"
    );
  }
}

export const api = new Api({
  baseUrl: 'https://api.mesto2023.students.nomoredomains.monster',
  headers: {
    "Content-Type": "application/json",
  }
})
