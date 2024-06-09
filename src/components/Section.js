export default class Section {
  constructor(items, renderer, gallerySelector) {
    this._gallery = gallerySelector;
    this._items = items;
    this.renderer = renderer;
  }

  renderItems() {
    console.log(this._items);
    this._items.forEach((item) => {
      this.renderer(this._gallery, item);
      console.log(item);
    });
  }

  renderItem(item) {
    this._gallery.prepend(item);
  }
}
