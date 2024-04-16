export class FormValidator {
  constructor(configObj, formElement) {
    this.configObj = configObj;
    this.formElement = formElement;
  }
  _setEventListeners() {
    const inputList = Array.from(
      this.formElement.querySelectorAll(this.configObj.input)
    );
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this.showInputError();
    } else {
      this.hideInputError();
    }
  }

  toggleButtonState() {
    const btn = this.formElement.querySelector(this.configObj.submitBtn);
    const inputArray = Array.from(
      this.formElement.querySelectorAll(this.configObj.input)
    );
    if (
      inputArray.every((input) => {
        return input.validity.valid;
      })
    ) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
    }
  }

  showInputError() {
    const inputsArray = Array.from(
      this.formElement.querySelectorAll(this.configObj.input)
    );
    inputsArray.forEach(function (input) {
      const errorElement = document.querySelector(`.${input.id}_error`);
      errorElement.textContent = input.validationMessage;
    });
  }
  hideInputError() {
    const inputsArray = Array.from(
      this.formElement.querySelectorAll(this.configObj.input)
    );
    inputsArray.forEach(function (input) {
      const errorElement = document.querySelector(`.${input.id}_error`);
      if (input.validity.valid) {
        errorElement.textContent = "";
      }
    });
  }

  enableValidation() {
    this.formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
