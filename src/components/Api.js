export default class Api {
  constructor(baseUrl, token, callBack) {
    this.baseUrl = baseUrl;
    this.token = token;
    this.callBack = callBack;
  }

  getUserData() {
    fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        this.callBack(res);
      });
  }

  updateUserData(data) {
    fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }

  getInitaialCards() {
    fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }
}
