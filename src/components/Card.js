export class Card {
  constructor(data, cardSelector, imagePopUpHandler) {
    this._title = data.title;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.imagePopUpHandler = imagePopUpHandler;
  }
  _getTemplate() {
    this.cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    return this.cardElement;
  }

  generateCard() {
    this.cardElement = this._getTemplate();
    this.cardElement.querySelector(".card__image").src = this._link;
    this.cardElement.querySelector(".card__image").alt = this._title;
    this.cardElement.querySelector(".card__title").textContent = this._title;
    this._setEventListeners();
    return this.cardElement;
  }

  _setEventListeners() {
    this.cardElement
      .querySelector(".card__heart-button")
      .addEventListener("click", () => {
        this.cardElement
          .querySelector(".card__heart-button")
          .classList.toggle("card__heart-button_active");
      });
    this.cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this.cardElement.remove();
      });
    this.cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this.imagePopUpHandler();
      });
  }
}
