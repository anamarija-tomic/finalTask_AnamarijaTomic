const { getTexts } = require('../../helpers/textHelpers');
class CheckoutStepTwoPage {
  get finishButton() {
    return $("[data-test='finish']");
  }

  get summaryContainer() {
    return $("[data-test='checkout-summary-container']");
  }

  get itemNames() {
    return $$("[data-test='inventory-item-name']");
  }

  async waitForPageLoad() {
    await this.summaryContainer.waitForDisplayed();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getItemNames() {
    return getTexts(await this.itemNames);
  }
}

module.exports = CheckoutStepTwoPage;
