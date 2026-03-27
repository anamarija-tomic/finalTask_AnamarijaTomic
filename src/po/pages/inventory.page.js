class InventoryPage {
  get inventoryContainer() {
    return $("[data-test='inventory-container']");
  }

  get cartBadge() {
    return $("[data-test='shopping-cart-badge']");
  }

  get cartLink() {
    return $("[data-test='shopping-cart-link']");
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

  async waitForPageLoad() {
    await this.inventoryContainer.waitForDisplayed();
  }

  async addProductToCart(productName) {
    await this.getAddToCartButton(productName).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = InventoryPage;
