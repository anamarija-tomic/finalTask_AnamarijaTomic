class InventoryPage {
  async waitForPageLoad() {
    await $("[data-test='inventory-container']").waitForDisplayed();
  }

  async addProductToCart(productName) {
    const dataTestValue = `add-to-cart-${productName.toLowerCase().replace(/ /g, '-')}`;
    await $(`[data-test='${dataTestValue}']`).click();
  }

  getRemoveButton(productName) {
    const dataTestValue = `remove-${productName.toLowerCase().replace(/ /g, '-')}`;
    return $(`[data-test='${dataTestValue}']`);
  }

  get inventoryContainer() {
    return $("[data-test='inventory-container']");
  }

  get cartBadge() {
    return $("[data-test='shopping-cart-badge']");
  }

  async goToCart() {
    await $("[data-test='shopping-cart-link']").click();
  }
}

module.exports = InventoryPage;
