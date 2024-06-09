export default class UserInfo {
  constructor(userInfoObj) {
    this._nameElement = document.querySelector(userInfoObj.name);
    this._aboutElement = document.querySelector(userInfoObj.about);
    this._avatarElement = document.querySelector(userInfoObj.avatar);
  }

  getUserInfo() {
    this._userData = {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
    return this._userData;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._aboutElement.textContent = data.about;
  }

  setUserAvatar(data) {
    this._avatarElement.src = data.url;
  }
}
