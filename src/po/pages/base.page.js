class BasePage {
  get container() {
    return null;
  }

  async waitForPageLoad() {
    await this.container.waitForDisplayed();
  }
}

module.exports = BasePage;