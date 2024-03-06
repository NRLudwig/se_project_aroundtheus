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
const cardGalleryEL = document.querySelector(".gallery");
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
// input elements
const inputName = document.querySelector(".modal__text-input_type_name");
const inputSubtitle = document.querySelector(
  ".modal__text-input_type_subtitle"
);
const profileName = document.querySelector(".profile__name");
const profileSubtitle = document.querySelector(".profile__subtitle");
const cardTitleInput = document.querySelector(".modal__text-input_type_title");
const cardImageInput = document.querySelector(".modal__text-input_type_image");
// button elements
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileCloseBtn = document.querySelector(
  ".modal__button-close_profile-edit"
);
const profileModalSaveBtn = document.querySelector(
  ".modal__button-save_profile-edit"
);
const addNewImageBtn = document.querySelector(".profile__add-button");
const addNewImageCloseBtn = document.querySelector(
  ".modal__button-close_new-place"
);
const addNewImageSaveBtn = document.querySelector(
  ".modal__button-save_new-place"
);
// modal elements
const newPlaceModal = document.querySelector(".modal_new-place");
const profileEditModal = document.querySelector(".modal_profile-edit");
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
  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.title);
  heartBtn.addEventListener("click", function () {
    heartBtn.classList.toggle("card__heart-button_active");
  });
  deleteCardBtn.addEventListener("click", function () {
    cardElement.remove();
  });
  cardTitleEl.textContent = cardData.title;
  return cardElement;
}
function addNewCard() {
  let newCard = {};
  (newCard.title = cardTitleInput.value),
    (newCard.link = cardImageInput.value),
    initialCards.push(newCard);

  const newCardElement = getCardElement(newCard);
  cardGalleryEL.prepend(newCardElement);
}

function fillNewPlaceInfo() {
  cardTitleInput.value = cardTitleInput.textContent;
  cardImageInput.value = cardImageInput.textContent;
}
// events
profileEditBtn.addEventListener("click", function () {
  openModal(profileEditModal);
  fillProfileForm();
});
profileCloseBtn.addEventListener("click", function () {
  closeModal(profileEditModal);
});
profileModalSaveBtn.addEventListener("click", function (event) {
  event.preventDefault();
  updateProfileInfo();
});
addNewImageBtn.addEventListener("click", function () {
  openModal(newPlaceModal);
  fillNewPlaceInfo();
});
addNewImageCloseBtn.addEventListener("click", function () {
  closeModal(newPlaceModal);
});
addNewImageSaveBtn.addEventListener("click", function (event) {
  event.preventDefault();
  addNewCard();
  closeModal(newPlaceModal);
});
// loops
initialCards.forEach((cardData) => {
  const newCardElement = getCardElement(cardData);
  cardGalleryEL.prepend(newCardElement);
});
