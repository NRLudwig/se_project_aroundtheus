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
      .then((res) => {
        res.forEach((item) => {
          this.callBack(item);
        });
      });
  }

  postCard(data) {
    fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.callBack(res);
      });
  }

  deleteCard(data) {
    fetch(`${this.baseUrl}/cards/${data._id}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "content-type": "application/json",
      },
    }).then(console.log(`${data.name} id-${data._id} has been deleted`));
  }

  likeCard(data) {
    if (data.isLiked) {
      fetch(`${this.baseUrl}/cards/${data._id}/likes`, {
        method: "DELETE",
        headers: {
          authorization: this.token,
          "content-type": "application/json",
        },
      });
    } else {
      fetch(`${this.baseUrl}/cards/${data._id}/likes`, {
        method: "PUT",
        headers: {
          authorization: this.token,
          "content-type": "application/json",
        },
      });
    }
  }

  patchAvatar(data) {
    fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.url,
      }),
    });
  }

  getAvatar() {
    fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token,
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        this.callBack({ url: res.avatar });
      });
  }
}
