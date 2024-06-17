export default class Section {
  constructor(renderer, gallerySelector) {
    this._gallery = gallerySelector;
    this.renderer = renderer;
  }

  renderItems() {
    console.log(items);
    items.forEach((item) => {
      this.renderer(this._gallery, item);
      console.log(item);
    });
  }

  renderItem(item) {
    this._gallery.prepend(item);
  }
}
