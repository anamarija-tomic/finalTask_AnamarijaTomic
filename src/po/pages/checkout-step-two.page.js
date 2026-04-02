const { getTexts } = require('../../helpers/textHelpers');
const BasePage = require('./base.page');

class CheckoutStepTwoPage extends BasePage {
  constructor() {
    super('/checkout-step-two.html');
  }

  get container() {
    return $("[data-test='checkout-summary-container']");
  }

  get finishButton() {
    return $("[data-test='finish']");
  }

  get itemNames() {
    return $$("[data-test='inventory-item-name']");
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getItemNames() {
    return getTexts(await this.itemNames);
  }
}

module.exports = CheckoutStepTwoPage;
