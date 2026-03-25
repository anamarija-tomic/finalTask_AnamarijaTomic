class CheckoutStepTwoPage {
  async waitForPageLoad() {
    await $("[data-test='checkout-summary-container']").waitForDisplayed();
  }

  get finishButton() {
    return $("[data-test='finish']");
  }

  async finishCheckout() {
    await $("[data-test='finish']").click();
  }

  async getItemNames() {
    const items = await $$("[data-test='inventory-item-name']");
    const names = [];
    for (const item of items) {
      names.push(await item.getText());
    }
    return names;
  }
}

module.exports = CheckoutStepTwoPage;
