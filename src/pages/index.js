import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "./index.css";
import {
  cardGalleryEL,
  profileForm,
  newPlaceForm,
  inputName,
  inputSubtitle,
  profileEditBtn,
  addNewImageBtn,
  initialCards,
  config,
  userInfoObj,
} from "../utils/constants.js";
const user = new UserInfo(userInfoObj);
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
const gallerySection = new Section(
  { items: initialCards, renderer: cardRenderer },
  cardGalleryEL
);

//////////////////////////  functions  //////////////////////////
function openNewCardPopup(popup) {
  popup.open();
}

function handleFormCardSubmit(data) {
  // debugger;
  cardRenderer(data);
}

function cardRenderer(data) {
  // debugger;
  gallerySection.addItem(creatCard(data));
}

function creatCard(data) {
  const card = new Card(data, "#card__template", () => {
    imageClickHandler(data);
  });
  return card.generateCard();
}

function imageClickHandler(data) {
  popupWithImage.open(data);
}

function handleProfileEditSubmit(data) {
  user.setUserInfo({ name: data.name, about: data.about });
}

//////////////////////////  on load  //////////////////////////
profileValidator.enableValidation();
newPlaceValidator.enableValidation();
gallerySection.renderItems();
// popupWithImage.setEventListeners();
profileEditBtn.addEventListener("click", function () {
  const userProfile = user.getUserInfo();
  inputName.value = userProfile.name;
  inputSubtitle.value = userProfile.about;
  openNewCardPopup(popupEditProfileForm);
  profileValidator.toggleButtonState();
  profileValidator.resetValidation();
});

addNewImageBtn.addEventListener("click", () => {
  openNewCardPopup(popupNewCardForm);
  newPlaceValidator.toggleButtonState();
});
