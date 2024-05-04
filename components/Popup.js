export default class Popup {
  constructor(popUpSelector) {
    this._popUpElement = document.querySelector(popUpSelector);
    this.closeButton = this._popUpElement.querySelector(".modal__button-close");
  }

  open() {
    this._popUpElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popUpElement.classList.remove("modal_opened");
    this._popUpElement.removeEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("modal__button-close")) {
        this.close();
      }
    });
  }

  setEventListeners() {
    this.closeButton.addEventListener("click", () => {
      this.close();
    });
    document.addEventListener("keydown", (evt) => {
      const code = evt.code;
      if (code === "Escape") {
        this.close();
      }
    });
    this._popUpElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("modal__button-close")) {
        this.close();
      }
    });
  }
}
