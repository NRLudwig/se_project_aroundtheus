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
        this.toggleButtonState(this.formElement, inputList);
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

  toggleButtonState(form, inputsArray) {
    const btn = form.querySelector(this.configObj.submitBtn);
    if (
      inputsArray.every((input) => {
        return input.validity.valid;
      })
    ) {
      btn.disabled = false;
    } else {
      btn.disabled = true;
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
