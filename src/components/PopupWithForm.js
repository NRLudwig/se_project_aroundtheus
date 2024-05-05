import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popUpSelector, formSubmitHandler) {
    super(popUpSelector);
    this._formInputs =
      this._popUpElement.querySelectorAll(".modal__text-input");
    this.formElement = this._popUpElement.querySelector(".modal__form");
    this.formSubmitHandler = formSubmitHandler;
  }

  close() {
    this.formElement.reset();
    super.close();
  }

  _getInputValues() {
    this._inputData = {};
    this._formInputs.forEach((input) => {
      this._inputData[input.name] = input.value;
    });
    return this._inputData;
  }

  setEventListeners() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputData = this._getInputValues();
      this.formSubmitHandler(inputData);
      this.close();
    });
    super.setEventListeners();
  }
}
