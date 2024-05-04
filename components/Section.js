export default class Section {
  constructor({ items, renderer }, gallerySelector) {
    this._gallery = gallerySelector;
    this._items = items;
    this._renderer = renderer;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem() {
    this._renderer(this._items);
  }
}
