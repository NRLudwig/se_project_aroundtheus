export class Card {
  constructor(data, cardSelector, imagePopUpHandler) {
    this._title = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.imagePopUpHandler = imagePopUpHandler;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector("#card__template")
      .content.firstElementChild.cloneNode(true);
    return cardElement;
  }

  generateCard() {
    const cardElement = this._getTemplate();
    cardElement.querySelector(".card__image").src = this._link;
    cardElement.querySelector(".card__image").alt = this._title;
    cardElement.querySelector(".card__title").textContent = this._title;
    this._setEventListeners(cardElement);
    this.imagePopUpHandler(cardElement);
    return cardElement;
  }

  _setEventListeners(cardElement) {
    cardElement
      .querySelector(".card__heart-button")
      .addEventListener("click", () => {
        cardElement
          .querySelector(".card__heart-button")
          .classList.toggle("card__heart-button_active");
      });
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", function () {
        cardElement.remove();
      });
  }
}
