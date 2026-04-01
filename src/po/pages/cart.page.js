const { getTexts } = require('../../helpers/textHelpers');
class CartPage {
  get checkoutButton() {
    return $("[data-test='checkout']");
  }

  get cartContainer() {
    return $("[data-test='cart-contents-container']");
  }

  get cartItems() {
    return $$("[data-test='inventory-item-name']");
  }

  async waitForPageLoad() {
    await this.cartContainer.waitForDisplayed();
  }

  async getCartItemsNames() {
    return getTexts(await this.cartItems);
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = CartPage;
