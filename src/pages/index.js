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
const user = new UserInfo(userInfoObj);
const handlerFunctions = {
  handleDelete: function handleDelete(card, data) {
    openPopup(popupImageDelete);
    popupImageDelete.setDeleteSubmitListener(card, data);
  },
  handleLike: function handleLike(data) {
    apiCall.likeCard(data);
  },
  handleImageClick: function handleImageClick(data) {
    popupWithImage.open(data);
  },
};
const apiFunctionObj = {
  setUserInfo: function apiSetUserInfoCallback(data) {
    user.setUserInfo(data);
  },
  cardRequest: function apiCardRequestCallback(data) {
    cardRenderer(gallerySection, data);
  },
  setAvatar: function apiSetAvatarCallback(data) {
    user.setUserAvatar(data);
  },
  renderSavingProfileForm: function renderSaving() {
    popupEditProfileForm.renderSaving(false);
  },
  renderSavingAvatarForm: function renderSaving() {
    popupAvatarForm.renderSaving(false);
  },
  renderSavingNewCardForm: function renderSaving() {
    popupNewCardForm.renderSaving(false);
  },
};
////////////////////////////////////////////////////////////
///////////////////////    sections     ////////////////////
////////////////////////////////////////////////////////////
const gallerySection = new Section(cardRenderer, cardGalleryEL);
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
const popupImageDelete = new PopupWithForm(
  ".modal_delete",
  handleDeleteFormSubmit
);
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
  handleAvatarFormSubmit
);
////////////////////////////////////////////////////////////
///////////////////////   API    ///////////////////////////
////////////////////////////////////////////////////////////
const apiCall = new Api(
  "https://around-api.en.tripleten-services.com/v1",
  serverToken,
  apiFunctionObj
);
////////////////////////////////////////////////////////////
///////////////////////   FUNCTIONS    /////////////////////
////////////////////////////////////////////////////////////
function handleDeleteFormSubmit(card, data) {
  card.remove();
  apiCall.deleteCard(data);
}
function handleAvatarFormSubmit(data) {
  apiCall.patchAvatar(data);
  user.setUserAvatar(data);
}
function openPopup(popup) {
  popup.open();
}
function handleFormCardSubmit(data) {
  apiCall.postCard(data);
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
  apiCall.updateUserData(data);
  user.setUserInfo(data);
}
////////////////////////////////////////////////////////////
///////////////////////   ON LOAD   ////////////////////////
////////////////////////////////////////////////////////////
profileValidator.enableValidation();
newPlaceValidator.enableValidation();
avatarFormValidator.enableValidation();
imageDeleteFormValidator.enableValidation();
apiCall.getServerData();
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
