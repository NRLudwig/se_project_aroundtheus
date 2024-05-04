export default class UserInfo {
  constructor(userInfoObj) {
    this._nameElement = document.querySelector(userInfoObj.name);
    this._aboutElement = document.querySelector(userInfoObj.about);
    this._userInfoObj = userInfoObj;
  }

  getUserInfo() {
    this._userData = {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
    return this._userData;
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}
