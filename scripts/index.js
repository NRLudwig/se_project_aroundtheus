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
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileModalCloseBtn = document.querySelector(
  ".modal__profile-button_close"
);
const profileModalSaveBtn = document.querySelector(
  ".modal__profile-button_save"
);
const cardGalleryEL = document.querySelector(".gallery");
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
const inputName = document.querySelector(".modal__text-input_type_name");
const inputSubtitle = document.querySelector(
  ".modal__text-input_type_subtitle"
);
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
const modal = document.querySelector(".modal");

// functions
function fillProfileFrom() {
  inputName.value = profileName.textContent;
  inputSubtitle.value = profileSubtitle.textContent;
}

function handleOpenModal() {
  fillProfileFrom();
  modal.classList.add("modal_opened");
}
function handleCloseModal() {
  modal.classList.remove("modal_opened");
}
function updateProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileSubtitle.textContent = inputSubtitle.value;
  handleCloseModal();
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
profileEditBtn.addEventListener("click", handleOpenModal);
profileModalCloseBtn.addEventListener("click", handleCloseModal);
profileModalSaveBtn.addEventListener("click", updateProfileInfo);

// loops

initialCards.forEach((cardData) => {
  const newCardElement = getCardElement(cardData);
  cardGalleryEL.prepend(newCardElement);
});
