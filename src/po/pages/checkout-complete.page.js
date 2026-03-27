class CheckoutCompletePage {
  get successMessage() {
    return $("[data-test='complete-header']");
  }

  get completeContainer() {
    return $("[data-test='checkout-complete-container']");
  }

  async waitForPageLoad() {
    await this.completeContainer.waitForDisplayed();
  }
}

module.exports = CheckoutCompletePage;
