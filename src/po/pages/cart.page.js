const { getTexts } = require('../../helpers/textHelpers');
const BasePage = require('./base.page');

class CartPage extends BasePage {
  get container() {
    return $("[data-test='cart-contents-container']");
  }
  get checkoutButton() {
    return $("[data-test='checkout']");
  }

  get cartItems() {
    return $$("[data-test='inventory-item-name']");
  }

  async getCartItemsNames() {
    return getTexts(await this.cartItems);
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = CartPage;
