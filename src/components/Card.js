export class Card {
  constructor(data, cardSelector, functionObject) {
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleLikeButton = functionObject.handleLike;
    this._handleDeleteButton = functionObject.handleDelete;
    this._handleImageClick = functionObject.handleImageClick;
    this.cardInfoObj = {};
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
    this.checkLike(cardDataObj);
    this.cardElement
      .querySelector(".card__heart-button")
      .addEventListener("click", () => {
        this._handleLikeButton(this, cardDataObj);
        // console.log(this);
        cardDataObj.isLiked = !cardDataObj.isLiked;
      });

    this.cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this.cardInfoObj.data = cardDataObj;
        this.cardInfoObj.cardElement = this.cardElement;
        this._handleDeleteButton(this.cardInfoObj);
      });

    this.cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(cardDataObj);
      });
  }

  getCard() {
    this.cardInfoObj.data = cardDataObj;
    this.cardInfoObj.cardElement = this.cardElement;
    return this.cardInfoObj;
  }

  checkLike(cardDataObj) {
    if (cardDataObj.isLiked) {
      this.cardElement
        .querySelector(".card__heart-button")
        .classList.add("card__heart-button_active");
    } else {
      this.cardElement
        .querySelector(".card__heart-button")
        .classList.remove("card__heart-button_active");
    }
  }
}
