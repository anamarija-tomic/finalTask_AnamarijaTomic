class CheckoutCompletePage {
  async waitForPageLoad() {
    await $("[data-test='checkout-complete-container']").waitForDisplayed();
  }

  get successMessage() {
    return $("[data-test='complete-header']");
  }
}

module.exports = CheckoutCompletePage;
