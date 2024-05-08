//////////////////////////  elements  //////////////////////////
export const cardGalleryEL = document.querySelector(".gallery");
//////////////////////////  forms  //////////////////////////
export const profileForm = document.querySelector(".modal__form_profile");
export const newPlaceForm = document.querySelector(".modal__form_new-place");
//////////////////////////  inputs  //////////////////////////
export const inputName = document.querySelector(".modal__text-input_type_name");
export const inputSubtitle = document.querySelector(
  ".modal__text-input_type_subtitle"
);
//////////////////////////  buttons  //////////////////////////
export const profileEditBtn = document.querySelector(".profile__edit-button");
export const addNewImageBtn = document.querySelector(".profile__add-button");

export const initialCards = [
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
export const config = {
  form: ".modal__form",
  input: ".modal__text-input",
  submitBtn: ".modal__button-save",
};

export const userInfoObj = {
  name: ".profile__name",
  about: ".profile__subtitle",
};
