import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidation.js";

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
//config object
const config = {
  form: ".modal__form",
  input: ".modal__text-input",
  submitBtn: ".modal__button-save",
};

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
// button elements
const profileEditBtn = document.querySelector(".profile__edit-button");
const addNewImageBtn = document.querySelector(".profile__add-button");
// modal elements
const newPlaceModal = document.querySelector(".modal_new-place");
const profileEditModal = document.querySelector(".modal_profile-edit");
const modalPicture = document.querySelector(".modal_picture");
// validators
const profileValidator = new FormValidator(config, profileForm);
const newPlaceValidator = new FormValidator(config, newPlaceForm);
// functions
profileValidator.enableValidation();
newPlaceValidator.enableValidation();
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
  cardData.title = cardTitleInput.value;
  cardData.link = cardImageInput.value;
  createCard(cardData);
}

function closeModalWithEsc(e) {
  const key = e.code;
  if (key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  }
}

function createCard(data) {
  const cardFinal = getCard(data);
  cardGalleryEL.prepend(cardFinal);
}
function getCard(data) {
  const card = new Card(data, "#card__template", imageModalHandler);
  const cardFinal = card.generateCard();
  return cardFinal;
}

function imageModalHandler(cardElement, imageElement) {
  modalPictureImageEl.src = imageElement.src;
  modalPictureImageEl.atl = cardElement.textContent;
  modalPictureTitleEl.textContent = cardElement.textContent;
  openModal(modalPicture);
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
  profileValidator.toggleButtonState();
  // profileValidator.hideInputError();
});
addNewImageBtn.addEventListener("click", function () {
  openModal(newPlaceModal);
  newPlaceValidator.toggleButtonState();
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

initialCards.forEach(createCard);
