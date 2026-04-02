const HeaderComponent = require('../components/common/header.component');

class BasePage {
  constructor(pageUrl) {
    this.header = new HeaderComponent();
    this.pageUrl = pageUrl;
  }

  get container() {
    return null;
  }

  async waitForPageLoad() {
    await this.container.waitForDisplayed();
  }
}

module.exports = BasePage;
