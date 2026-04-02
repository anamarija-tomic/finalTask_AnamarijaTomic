const BasePage = require('./base.page');

class InventoryPage extends BasePage {
  constructor() {
    super('/inventory.html');
  }

  get container() {
    return $("[data-test='inventory-container']");
  }

  formatProductName(name) {
    return name.toLowerCase().replace(/ /g, '-');
  }

  getAddToCartButton(productName) {
    const dataTest = `add-to-cart-${this.formatProductName(productName)}`;
    return $(`[data-test='${dataTest}']`);
  }

  getRemoveButton(productName) {
    const dataTest = `remove-${this.formatProductName(productName)}`;
    return $(`[data-test='${dataTest}']`);
  }

  async addProductToCart(productName) {
    await this.getAddToCartButton(productName).click();
  }
}

module.exports = InventoryPage;
