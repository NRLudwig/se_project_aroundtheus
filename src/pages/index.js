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
  handleDelete: function handleDelete(data) {
    openPopup(popupImageDelete);
    popupImageDelete.setDeleteSubmitListener(data);
  },
  handleLike: function handleLike(cardData) {
    apiCall.likeCard(cardData).then((res) => {
      this.checkLike(res);
    });
  },
  handleImageClick: function handleImageClick(data) {
    popupWithImage.open(data);
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
  serverToken
);
////////////////////////////////////////////////////////////
///////////////////////   FUNCTIONS    /////////////////////
////////////////////////////////////////////////////////////
function handleDeleteFormSubmit(data) {
  apiCall
    .deleteCard(data.data)
    .then(data.cardElement.remove())
    .catch((err) => {
      console.error(err);
    });
}
function handleAvatarFormSubmit(data) {
  apiCall
    .patchAvatar(data)
    .then((data) => {
      user.setUserAvatar(data);
      popupAvatarForm.close();
      avatarForm.reset();
      popupAvatarForm.renderSaving(false);
    })
    .catch((err) => {
      console.error(err);
    });
}
function openPopup(popup) {
  popup.open();
}
function handleFormCardSubmit(data) {
  apiCall
    .postCard(data)
    .then((cardData) => {
      cardRenderer(cardData);
      popupNewCardForm.close();
      newPlaceForm.reset();
      popupNewCardForm.renderSaving(false);
    })
    .catch((err) => {
      console.error(err);
    });
}
function cardRenderer(data) {
  const card = creatCard(data);
  gallerySection.renderItem(card);
}
function creatCard(data) {
  const card = new Card(data, "#card__template", handlerFunctions);
  return card.generateCard(data);
}
function handleProfileEditSubmit(data) {
  apiCall
    .updateUserData(data)
    .then((userData) => {
      user.setUserInfo(userData);
      popupEditProfileForm.close();
      profileForm.reset();
      popupEditProfileForm.renderSaving(false);
    })
    .catch((err) => {
      console.error(err);
    });
}
////////////////////////////////////////////////////////////
///////////////////////   ON LOAD   ////////////////////////
////////////////////////////////////////////////////////////
profileValidator.enableValidation();
newPlaceValidator.enableValidation();
avatarFormValidator.enableValidation();
imageDeleteFormValidator.enableValidation();

Promise.all([apiCall.getInitialCards(), apiCall.getUserData()])
  .then(([cardData, userData]) => {
    user.setUserAvatar(userData);
    user.setUserInfo(userData);
    gallerySection.renderItems(cardData);
  })
  .catch((err) => {
    console.error(err);
  });

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
