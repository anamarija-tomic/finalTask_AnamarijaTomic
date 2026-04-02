const BasePage = require('./base.page');

class CheckoutCompletePage extends BasePage {
  constructor() {
    super('/checkout-complete.html');
  }

  get container() {
    return $("[data-test='checkout-complete-container']");
  }

  get successMessage() {
    return $("[data-test='complete-header']");
  }
}

module.exports = CheckoutCompletePage;
