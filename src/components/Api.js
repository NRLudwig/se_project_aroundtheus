export default class Api {
  constructor(baseUrl, token, functionObj) {
    this.baseUrl = baseUrl;
    this.token = token;
    this.funcObj = functionObj;
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
        return Promise.reject(`Error: ${res.stauts}`);
      })
      .then((res) => {
        this.funcObj.setUserInfo(res);
      })
      .catch((err) => {
        console.error(err);
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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        console.log(res);
        this.funcObj.renderSavingProfileForm();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getInitaialCards() {
    fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        res.forEach((item) => {
          this.funcObj.cardRequest(item);
        });
      })
      .catch((err) => {
        console.error(err);
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
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        console.log(res);
        this.funcObj.cardRequest(res);
        this.funcObj.renderSavingNewCardForm();
      })
      .catch((err) => {
        console.log("this is postCard catch");
        console.error(err);
      });
  }

  deleteCard(data) {
    fetch(`${this.baseUrl}/cards/${data._id}`, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then(console.log(`${data.name} id-${data._id} has been deleted`))
      .catch((err) => {
        console.error(err);
      });
  }

  likeCard(data) {
    if (data.isLiked) {
      fetch(`${this.baseUrl}/cards/${data._id}/likes`, {
        method: "DELETE",
        headers: {
          authorization: this.token,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      fetch(`${this.baseUrl}/cards/${data._id}/likes`, {
        method: "PUT",
        headers: {
          authorization: this.token,
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
          console.error(err);
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
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        this.funcObj.setAvatar({ url: res.avatar });
        this.funcObj.renderSavingAvatarForm();
      })
      .catch((err) => {
        console.log(err);
        console.error(err);
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
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((res) => {
        this.funcObj.setAvatar({ url: res.avatar });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getServerData() {
    this.getUserData();
    this.getAvatar();
    this.getInitaialCards();
  }
}
