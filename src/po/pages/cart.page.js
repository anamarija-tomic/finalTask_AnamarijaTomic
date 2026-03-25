class CartPage {
  async waitForPageLoad() {
    await $("[data-test='cart-contents-container']").waitForDisplayed();
  }

  async getCartItemsNames() {
    const items = await $$("[data-test='inventory-item-name']");
    const names = [];
    for (const item of items) {
      names.push(await item.getText());
    }
    return names;
  }

  get checkoutButton() {
    return $("[data-test='checkout']");
  }

  async goToCheckout() {
    await $("[data-test='checkout']").click();
  }
}

module.exports = CartPage;
