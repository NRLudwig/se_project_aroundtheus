const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanosie National Prak",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// elements
let profileEditBtn = document.querySelector(".profile__edit-button");
let modalCloseBtn = document.querySelector(".modal__close-button");
let modalSaveBtn = document.querySelector(".modal__save-button");
const cardGalleryEL = document.querySelector(".gallery");
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;

// functions
function openModalHandler() {
  let modal = document.querySelector(".modal");
  modal.classList.add("modal_opened");
  let inputName = document.querySelector(".modal__text-input_type_name");
  let inputSubtitle = document.querySelector(
    ".modal__text-input_type_subtitle"
  );

  let profileName = document.querySelector(".profile__name");
  let profileSubtitle = document.querySelector(".profile__subtitle");

  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
}
function closeModalHandler() {
  let modal = document.querySelector(".modal");
  modal.classList.remove("modal_opened");
}
function updateProfileInfo(event) {
  let inputName = document.querySelector(".modal__text-input_type_name");
  let inputSubtitle = document.querySelector(
    ".modal__text-input_type_subtitle"
  );

  let profileName = document.querySelector(".profile__name");
  let profileSubtitle = document.querySelector(".profile__subtitle");

  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  closeModalHandler();
  event.preventDefault();
}
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.name);
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

// events
profileEditBtn.addEventListener("click", openModalHandler);
modalCloseBtn.addEventListener("click", closeModalHandler);
modalSaveBtn.addEventListener("click", updateProfileInfo);

// loops

initialCards.forEach((cardData) => {
  const newCardElement = getCardElement(cardData);
  cardGalleryEL.prepend(newCardElement);
});
