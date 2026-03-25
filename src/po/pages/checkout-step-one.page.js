class CheckoutStepOnePage {
  async waitForPageLoad() {
    await $("[data-test='checkout-info-container']").waitForDisplayed();
  }

  async fillForm(firstName, lastName, zip) {
    await $("[data-test='firstName']").setValue(firstName);
    await $("[data-test='lastName']").setValue(lastName);
    await $("[data-test='postalCode']").setValue(zip);
  }
get firstNameInput() {
    return $("[data-test='firstName']");
  }

  get lastNameInput() {
    return $("[data-test='lastName']");
  }

  get postalCodeInput() {
    return $("[data-test='postalCode']");
  }

  async continueCheckout() {
    await $("[data-test='continue']").click();
  }
}

module.exports = CheckoutStepOnePage;