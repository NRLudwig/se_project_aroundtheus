export class Card {
  constructor(data, cardSelector, functionObject) {
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleLikeButton = functionObject.handleLike;
    this._handleDeleteButton = functionObject.handleDelete;
    this._handleImageClick = functionObject.handleImageClick;
  }
  _getTemplate() {
    this.cardElement = document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
    return this.cardElement;
  }

  generateCard(cardDataObj) {
    this.cardElement = this._getTemplate();
    this.cardElement.querySelector(".card__image").src = this._link;
    this.cardElement.querySelector(".card__image").alt = this._title;
    this.cardElement.querySelector(".card__title").textContent = this._title;
    this._setEventListeners(cardDataObj);
    return this.cardElement;
  }

  _setEventListeners(cardDataObj) {
    if (cardDataObj.isLiked) {
      this.cardElement
        .querySelector(".card__heart-button")
        .classList.add("card__heart-button_active");
    } else {
      this.cardElement
        .querySelector(".card__heart-button")
        .classList.remove("card__heart-button_active");
    }
    this.cardElement
      .querySelector(".card__heart-button")
      .addEventListener("click", () => {
        this.cardElement
          .querySelector(".card__heart-button")
          .classList.toggle("card__heart-button_active");
        this._handleLikeButton(cardDataObj);
      });
    this.cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton(this.cardElement, cardDataObj);
      });
    this.cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(cardDataObj);
      });
  }
}
