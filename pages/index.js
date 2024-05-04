import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

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
//////////////////////////  objects  //////////////////////////
const config = {
  form: ".modal__form",
  input: ".modal__text-input",
  submitBtn: ".modal__button-save",
};

const userInfoObj = {
  name: ".profile__name",
  about: ".profile__subtitle",
};

//////////////////////////  elements  //////////////////////////
const cardGalleryEL = document.querySelector(".gallery");

//////////////////////////  forms  //////////////////////////
const profileForm = document.querySelector(".modal__form_profile");
const newPlaceForm = document.querySelector(".modal__form_new-place");
//////////////////////////  inputs  //////////////////////////
const inputName = document.querySelector(".modal__text-input_type_name");
const inputSubtitle = document.querySelector(
  ".modal__text-input_type_subtitle"
);
const cardTitleInput = document.querySelector(".modal__text-input_type_title");
const cardImageInput = document.querySelector(".modal__text-input_type_image");
//////////////////////////  buttons  //////////////////////////
const profileEditBtn = document.querySelector(".profile__edit-button");
const addNewImageBtn = document.querySelector(".profile__add-button");

//////////////////////////  validators  //////////////////////////
const profileValidator = new FormValidator(config, profileForm);
const newPlaceValidator = new FormValidator(config, newPlaceForm);
//////////////////////////  classes  //////////////////////////
const popupWithImage = new PopupWithImage(".modal_picture");
const popupNewCardForm = new PopupWithForm(
  ".modal_new-place",
  handleFormCardSubmit
);
const popupEditProfileForm = new PopupWithForm(
  ".modal_profile-edit",
  handleProfileEditSubmit
);
const initialGallerySection = new Section(
  { items: initialCards, renderer: cardRenderer },
  cardGalleryEL
);
const user = new UserInfo(userInfoObj);

//////////////////////////  functions  //////////////////////////
// profileValidator.enableValidation();
// newPlaceValidator.enableValidation();

profileEditBtn.addEventListener("click", function () {
  const userProfile = user.getUserInfo();
  inputName.value = userProfile.name;
  inputSubtitle.value = userProfile.about;
  addButtonClickHandler(popupEditProfileForm);
  profileValidator.toggleButtonState();
  profileValidator.resetValidation();
});
addNewImageBtn.addEventListener("click", function () {
  addButtonClickHandler(popupNewCardForm);
  newPlaceValidator.toggleButtonState();
});

function imageClickHandler(data) {
  popupWithImage.open(data);
  popupWithImage.setEventListeners();
}

function addButtonClickHandler(popup) {
  popup.open();
}

function handleFormCardSubmit() {
  const cardData = {};
  cardData.title = cardTitleInput.value;
  cardData.link = cardImageInput.value;
  console.log(cardData);
  const additionalGallerySection = new Section({
    items: cardData,
    renderer: cardRenderer,
  });
  additionalGallerySection.addItem();
}

function handleProfileEditSubmit(data) {
  user.setUserInfo({ name: data.name, about: data.about });
}

function cardRenderer(data) {
  const card = new Card(data, "#card__template", () => {
    imageClickHandler(data);
  });

  const finalCard = card.generateCard();
  cardGalleryEL.prepend(finalCard);
}
//////////////////////////  on load  //////////////////////////
profileValidator.enableValidation();
newPlaceValidator.enableValidation();
initialGallerySection.renderItems();
