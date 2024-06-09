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
  config,
  userInfoObj,
  serverToken,
  avatarForm,
  avatarOverlay,
  imageDeleteForm,
} from "../utils/constants.js";
const handlerFunctions = {
  handleDelete: function handleDelete(card, data) {
    const popupImageDelete = new PopupWithForm(".modal_delete", () => {
      card.remove();
      apiCardRequest.deleteCard(data);
    });
    openPopup(popupImageDelete);
    popupImageDelete.setEventListeners();
  },
  handleLike: function handleLike(data) {
    apiCardRequest.likeCard(data);
  },
  handleImageClick: function handleImageClick(data) {
    popupWithImage.open(data);
  },
};
const user = new UserInfo(userInfoObj);
////////////////////////////////////////////////////////////
///////////////////////   VALIDATORS    ////////////////////
////////////////////////////////////////////////////////////
const profileValidator = new FormValidator(config, profileForm);
const newPlaceValidator = new FormValidator(config, newPlaceForm);
const avatarFormValidator = new FormValidator(config, avatarForm);
const imageDeleteFormValidator = new FormValidator(config, imageDeleteForm);
////////////////////////////////////////////////////////////
///////////////////////   POPUPS    ////////////////////////
////////////////////////////////////////////////////////////
const popupWithImage = new PopupWithImage(".modal_picture");
const popupNewCardForm = new PopupWithForm(
  ".modal_new-place",
  handleFormCardSubmit
);
const popupEditProfileForm = new PopupWithForm(
  ".modal_profile-edit",
  handleProfileEditSubmit
);
const popupAvatarForm = new PopupWithForm(
  ".modal_change-avatar",
  popupAvatarFormCallback
);
////////////////////////////////////////////////////////////
///////////////////////   API    ///////////////////////////
////////////////////////////////////////////////////////////
// profile requests
const apiProfileRequest = new Api(
  "https://around-api.en.tripleten-services.com/v1",
  serverToken,
  apiSetUserInfoCallback
);
apiProfileRequest.getUserData();
// card requests
const apiCardRequest = new Api(
  "https://around-api.en.tripleten-services.com/v1",
  serverToken,
  apiCardRequestCallback
);
// avatar requests
const apiAvatarRequest = new Api(
  "https://around-api.en.tripleten-services.com/v1",
  serverToken,
  apiSetAvatarCallback
);
////////////////////////////////////////////////////////////
///////////////////////   FUNCTIONS    /////////////////////
////////////////////////////////////////////////////////////
function apiSetUserInfoCallback(data) {
  user.setUserInfo(data);
}
function apiCardRequestCallback(data) {
  const gallerySection = new Section(data, cardRenderer, cardGalleryEL);
  cardRenderer(gallerySection, data);
}
function apiSetAvatarCallback(data) {
  user.setUserAvatar(data);
}
function popupAvatarFormCallback(data) {
  apiAvatarRequest.patchAvatar(data);
  user.setUserAvatar(data);
}
function openPopup(popup) {
  popup.open();
}
function handleFormCardSubmit(data) {
  apiCardRequest.postCard(data);
}
function cardRenderer(section, data) {
  const card = creatCard(data);
  section.renderItem(card);
}
function creatCard(data) {
  const card = new Card(data, "#card__template", handlerFunctions);
  return card.generateCard(data);
}
function handleProfileEditSubmit(data) {
  apiProfileRequest.updateUserData(data);
  user.setUserInfo(data);
}
////////////////////////////////////////////////////////////
///////////////////////   ON LOAD   ////////////////////////
////////////////////////////////////////////////////////////
profileValidator.enableValidation();
newPlaceValidator.enableValidation();
avatarFormValidator.enableValidation();
imageDeleteFormValidator.enableValidation();
apiCardRequest.getInitaialCards();
apiAvatarRequest.getAvatar();
////////////////////////////////////////////////////////////
/////////////////   EVENT LISTENERS    /////////////////////
////////////////////////////////////////////////////////////
popupNewCardForm.setEventListeners();
popupWithImage.setEventListeners();
popupEditProfileForm.setEventListeners();
popupAvatarForm.setEventListeners();
avatarOverlay.addEventListener("click", function () {
  openPopup(popupAvatarForm);
  avatarFormValidator.toggleButtonState();
});
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
