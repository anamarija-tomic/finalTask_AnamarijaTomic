class CheckoutStepOnePage {
  get firstNameInput() {
    return $("[data-test='firstName']");
  }

  get lastNameInput() {
    return $("[data-test='lastName']");
  }

  get postalCodeInput() {
    return $("[data-test='postalCode']");
  }

  get continueButton() {
    return $("[data-test='continue']");
  }

  get formContainer() {
    return $("[data-test='checkout-info-container']");
  }

  async waitForPageLoad() {
    await this.formContainer.waitForDisplayed();
  }

  async fillForm({ firstName, lastName, postalCode }) {
    await this.firstNameInput.setValue(firstName);
    await this.lastNameInput.setValue(lastName);
    await this.postalCodeInput.setValue(postalCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }
}

module.exports = CheckoutStepOnePage;
