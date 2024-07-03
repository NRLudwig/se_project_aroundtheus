import Popup from "./Popup.js";
export default class PopupDeleteConformation extends Popup {
  constructor(popUpSelector, confirmCallback) {
    super(popUpSelector);
    this.confirmCallback = confirmCallback;
    this.deleteHandler = this.deleteHandler.bind(this);
    this.confimBtn = this._popUpElement.querySelector(
      ".modal__button-save_delete"
    );
  }

  setDeleteSubmitListener(data) {
    this.data = data;
    super.setEventListeners();
    this.confimBtn.addEventListener("click", this.deleteHandler);
  }

  deleteHandler() {
    this.confirmCallback(this.data);
    this.close();
  }
}
