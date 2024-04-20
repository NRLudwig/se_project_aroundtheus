export class FormValidator {
  constructor(configObj, formElement) {
    this.configObj = configObj;
    this.formElement = formElement;
    this.btn = this.formElement.querySelector(this.configObj.submitBtn);
    this.inputList = Array.from(
      this.formElement.querySelectorAll(this.configObj.input)
    );
  }
  _setEventListeners() {
    this.inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this.showInputError(input);
    } else {
      this.hideInputError(input);
    }
  }

  toggleButtonState() {
    if (
      this.inputList.every((input) => {
        input.validity.valid
          ? this.hideInputError(input)
          : (this.btn.disabled = true);
        return input.validity.valid;
      })
    ) {
      this.btn.disabled = false;
    } else {
      this.btn.disabled = true;
    }
  }

  showInputError(input) {
    const errorSpanEle = this.formElement.querySelector(`.${input.id}_error`);
    errorSpanEle.textContent = input.validationMessage;
  }
  hideInputError(input) {
    const errorSpanEle = this.formElement.querySelector(`.${input.id}_error`);
    errorSpanEle.textContent = "";
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
