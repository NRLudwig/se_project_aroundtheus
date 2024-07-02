export default class Api {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;

    this._headers = {
      authorization: this.token,
      "content-type": "application/json",
    };
  }
  requestData(path, option) {
    return fetch(this.baseUrl + path, {
      method: option,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error ${res.status}`);
    }
  }

  getUserData() {
    return this.requestData("/users/me", "GET");
  }

  updateUserData(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return this.requestData("/cards", "GET");
  }

  postCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(data) {
    return this.requestData(`/cards/${data._id}`, "DELETE");
  }

  likeCard(data) {
    if (!data.isLiked) {
      return this.requestData(`/cards/${data._id}/likes`, "PUT");
    } else {
      return this.requestData(`/cards/${data._id}/likes`, "DELETE");
    }
  }

  patchAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.url,
      }),
    }).then(this._checkResponse);
  }

  getAvatar() {
    return this.requestData("/users/me", "GET");
  }
}
