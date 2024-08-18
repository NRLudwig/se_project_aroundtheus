import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popUpSelector) {
    super(popUpSelector);
    this.imageElement = this._popUpElement.querySelector(
      ".modal-picture__image"
    );
    this.titleElement = this._popUpElement.querySelector(
      ".modal-picture__title"
    );
  }

  open(data) {
    this.imageElement.src = data.link;
    this.imageElement.alt = data.name;
    this.titleElement.textContent = data.name;

    super.open();
  }
}
