const LoginPage = require('./login.page');
const InventoryPage = require('./inventory.page');
const CartPage = require('./cart.page');
const CheckoutStepOnePage = require('./checkout-step-one.page');
const CheckoutStepTwoPage = require('./checkout-step-two.page');
const CheckoutCompletePage = require('./checkout-complete.page');

const items = {
  login: new LoginPage(),
  inventory: new InventoryPage(),
  cart: new CartPage(),
  checkoutStepOne: new CheckoutStepOnePage(),
  checkoutStepTwo: new CheckoutStepTwoPage(),
  checkoutComplete: new CheckoutCompletePage(),
};

function pages(name) {
  return items[name];
}

module.exports = {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutStepOnePage,
  CheckoutStepTwoPage,
  CheckoutCompletePage,
  pages,
};