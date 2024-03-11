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

// elements
const formProfileEdit = document.querySelector(".modal__form_profile");
const formNewPlace = document.querySelector(".modal__form_new-place");
const cardGalleryEL = document.querySelector(".gallery");
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
const modalPictureImageEl = document.querySelector(".modal-picture__image");
const modalPictureTitleEl = document.querySelector(".modal-picture__title");
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
// input elements
const inputName = document.querySelector(".modal__text-input_type_name");
const inputSubtitle = document.querySelector(
  ".modal__text-input_type_subtitle"
);
const cardTitleInput = document.querySelector(".modal__text-input_type_title");
const cardImageInput = document.querySelector(".modal__text-input_type_image");
// button elements
const closeBtns = document.querySelectorAll(".modal__button-close");
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
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
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
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const heartBtn = cardElement.querySelector(".card__heart-button");
  const deleteCardBtn = cardElement.querySelector(".card__delete-button");
  cardTitleEl.textContent = cardData.title;
  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.title);
  heartBtn.addEventListener("click", function () {
    heartBtn.classList.toggle("card__heart-button_active");
  });
  deleteCardBtn.addEventListener("click", function () {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", function () {
    openModal(modalPicture);
    modalPictureImageEl.setAttribute("src", cardData.link);
    modalPictureImageEl.setAttribute("alt", cardData.title);
    modalPictureTitleEl.textContent = cardData.title;
  });
  return cardElement;
}
function addNewCard() {
  const newCard = {};
  newCard.title = cardTitleInput.value;
  newCard.link = cardImageInput.value;
  initialCards.push(newCard);

  const newCardElement = getCardElement(newCard);
  cardGalleryEL.prepend(newCardElement);
}
function fillNewPlaceInfo() {
  cardImageInput.value = "";
  cardTitleInput.value = "";
}
//events
formProfileEdit.addEventListener("submit", function (event) {
  event.preventDefault();
});
formNewPlace.addEventListener("submit", function (event) {
  event.preventDefault();
});
profileEditBtn.addEventListener("click", function () {
  openModal(profileEditModal);
  fillProfileForm();
});
profileModalSaveBtn.addEventListener("click", function () {
  updateProfileInfo();
});
addNewImageBtn.addEventListener("click", function () {
  openModal(newPlaceModal);
  fillNewPlaceInfo();
});
addNewImageSaveBtn.addEventListener("click", function () {
  addNewCard();
  closeModal(newPlaceModal);
});
// loops
initialCards.forEach((cardData) => {
  const newCardElement = getCardElement(cardData);
  cardGalleryEL.prepend(newCardElement);
});

closeBtns.forEach((button) => {
  const nearestModal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(nearestModal));
});
