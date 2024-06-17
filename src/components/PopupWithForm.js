import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popUpSelector, formSubmitHandler) {
    super(popUpSelector);
    this._formInputs =
      this._popUpElement.querySelectorAll(".modal__text-input");
    this.formElement = this._popUpElement.querySelector(".modal__form");
    this.formSubmitHandler = formSubmitHandler;
    this._handleSubmitClick = this._handleSubmitClick.bind(this);
    this._saveButton = this.formElement.querySelector(".modal__button-save");
  }

  _handleSubmitClick(evt) {
    evt.preventDefault();
    this.renderSaving(true);
    const inputData = this._getInputValues();
    this.formSubmitHandler(inputData);
    this.close();
    this.formElement.reset();
  }

  _getInputValues() {
    this._inputData = {};
    this._formInputs.forEach((input) => {
      this._inputData[input.name] = input.value;
    });
    return this._inputData;
  }

  setEventListeners() {
    super.setEventListeners();
    this.formElement.addEventListener("submit", this._handleSubmitClick);
  }

  setDeleteSubmitListener(card, data) {
    super.setEventListeners();
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.formSubmitHandler(card, data);
      this.close();
      this.formElement.reset();
    });
  }

  renderSaving(isSaving) {
    if (isSaving) {
      this._saveButton.textContent = "Saving...";
    } else {
      this._saveButton.textContent = "Save";
    }
  }
}
