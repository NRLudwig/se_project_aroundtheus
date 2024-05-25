import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidation.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
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
  serverToken,
} from "../utils/constants.js";

const user = new UserInfo(userInfoObj);
//////////////////////////  validators  //////////////////////////
const profileValidator = new FormValidator(config, profileForm);
const newPlaceValidator = new FormValidator(config, newPlaceForm);
//////////////////////////  classes  ///////////////////////////
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
//////////////////////////  API  //////////////////////////
const apiRequest = new Api(
  "https://around-api.en.tripleten-services.com/v1",
  serverToken,
  apiSetUserInfo
);

apiRequest.getUserData();

function apiSetUserInfo(data) {
  user.setUserInfo(data);
}

//////////////////////////  functions  //////////////////////////
function openPopup(popup) {
  popup.open();
}

function handleFormCardSubmit(data) {
  cardRenderer(data);
}

function cardRenderer(data) {
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
  apiRequest.updateUserData(data);
  user.setUserInfo(data);
}

//////////////////////////  on load  //////////////////////////
profileValidator.enableValidation();
newPlaceValidator.enableValidation();
gallerySection.renderItems();
//////////////////////////  add/set event listeners  //////////////////////////
popupNewCardForm.setEventListeners();
popupWithImage.setEventListeners();
popupEditProfileForm.setEventListeners();

profileEditBtn.addEventListener("click", function () {
  const userProfile = user.getUserInfo();
  inputName.value = userProfile.name;
  inputSubtitle.value = userProfile.about;
  openPopup(popupEditProfileForm);
  profileValidator.resetValidation();
});

addNewImageBtn.addEventListener("click", () => {
  openPopup(popupNewCardForm);
  newPlaceValidator.toggleButtonState();
});

//comment
