export default class Section {
  constructor(renderer, gallerySelector) {
    this._gallery = gallerySelector;
    this.renderer = renderer;
  }

  renderItems(items) {
    items.forEach((item) => {
      this.renderer(item);
    });
  }

  renderItem(item) {
    this._gallery.prepend(item);
  }
}
