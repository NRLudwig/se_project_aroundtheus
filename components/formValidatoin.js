function showInputError(form, input) {
  const errorSpanEle = form.querySelector(`.${input.id}_error`);
  errorSpanEle.textContent = input.validationMessage;
}
function hideInputError(form, input) {
  const errorSpanEle = form.querySelector(`.${input.id}_error`);
  errorSpanEle.textContent = "";
}

function checkInputValidity(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input);
  } else {
    hideInputError(form, input);
  }
}

function toggleButtonState(form, inputsArray) {
  const btn = form.querySelector(config.submitBtn);
  inputsArray.every(function (input) {
    res = input.validity.valid === true;
    return res;
  });
  if (res) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.input));
  inputList.forEach(function (input) {
    input.addEventListener("input", function () {
      checkInputValidity(form, input);
      toggleButtonState(form, inputList);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.form));
  formList.forEach(function (form) {
    form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(form, config);
  });
}

const config = {
  form: ".modal__form",
  input: ".modal__text-input",
  submitBtn: ".modal__button-save",
};

enableValidation(config);
