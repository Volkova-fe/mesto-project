
export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderItems(cards) {
    cards.forEach(item => {
      this.addItem(this._renderer(item))
    });
  }
}
