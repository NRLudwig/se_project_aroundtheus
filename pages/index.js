const initialCards = [
  {
    title: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    title: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    title: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    title: "Vanosie National Prak",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
///////////////////////////////////////////////////////////////////////////////////////////////
//test test test//
//this Card class is a test and substituting for the getCardElement function

class Card {
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
////    end   /////
//test test test//
///////////////////////////////////////////////////////////////////////////////////////////////
// elements
const modals = Array.from(document.querySelectorAll(".modal"));
const cardGalleryEL = document.querySelector(".gallery");
const modalPictureImageEl = document.querySelector(".modal-picture__image");
const modalPictureTitleEl = document.querySelector(".modal-picture__title");
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
// forms
const profileForm = document.querySelector(".modal__form_profile");
const newPlaceForm = document.querySelector(".modal__form_new-place");
// input elements
const inputName = document.querySelector(".modal__text-input_type_name");
const inputSubtitle = document.querySelector(
  ".modal__text-input_type_subtitle"
);
const cardTitleInput = document.querySelector(".modal__text-input_type_title");
const cardImageInput = document.querySelector(".modal__text-input_type_image");
const profileInputsArray = Array.from(
  profileForm.querySelectorAll(".modal__text-input")
);
const newPlaceInputsArray = Array.from(
  newPlaceForm.querySelectorAll(".modal__text-input")
);
// button elements
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileModalSaveBtn = document.querySelector(
  ".modal__button-save_profile-edit"
);
const addNewImageBtn = document.querySelector(".profile__add-button");
const addNewImageSaveBtn = document.querySelector(
  ".modal__button-save_new-place"
);
// modal elements
const newPlaceModal = document.querySelector(".modal_new-place");
const profileEditModal = document.querySelector(".modal_profile-edit");
const modalPicture = document.querySelector(".modal_picture");
// functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalWithEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalWithEsc);
}
function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
}
function updateProfileInfo() {
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closeModal(profileEditModal);
}

function clearNewPlaceInfo() {
  cardImageInput.value = "";
  cardTitleInput.value = "";
}

function addNewCard() {
  const cardData = {};
  const cardTitleInput = document.querySelector(
    ".modal__text-input_type_title"
  );
  const cardImageInput = document.querySelector(
    ".modal__text-input_type_image"
  );
  cardData.title = cardTitleInput.value;
  cardData.link = cardImageInput.value;
  const newCard = new Card(cardData, "#card__template", imageModalHandler);
  const readyCard = newCard.generateCard();
  cardGalleryEL.prepend(readyCard);
}

function closeModalWithEsc(e) {
  const key = e.code;
  if (key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
}

function createCard(data) {
  const card = new Card(data, "#card__template", imageModalHandler);
  const cardFinal = card.generateCard();
  cardGalleryEL.prepend(cardFinal);
}

function imageModalHandler(cardElement) {
  cardElement
    .querySelector(".card__image")
    .addEventListener("click", function () {
      const pictureEle = document.querySelector(".modal-picture__image");
      const pictureTitle = document.querySelector(".modal-picture__title");
      pictureEle.src = this.src;
      pictureEle.atl = this.textContent;
      pictureTitle.textContent = cardElement.textContent;
      openModal(modalPicture);
    });
}
//events
profileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  updateProfileInfo();
});
newPlaceForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addNewCard();
  clearNewPlaceInfo();
  closeModal(newPlaceModal);
});
profileEditBtn.addEventListener("click", function () {
  openModal(profileEditModal);
  fillProfileForm();
  toggleButtonState(profileForm, profileInputsArray);
  profileInputsArray.forEach(function (input) {
    hideInputError(profileForm, input);
  });
});
addNewImageBtn.addEventListener("click", function () {
  openModal(newPlaceModal);
  toggleButtonState(newPlaceForm, newPlaceInputsArray);
});
// loops
modals.forEach(function (modal) {
  modal.addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
    if (evt.target.classList.contains("modal__button-close")) {
      closeModal(modal);
    }
  });
});

initialCards.forEach((data) => {
  createCard(data);
});
