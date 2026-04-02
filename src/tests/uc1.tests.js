const {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutStepOnePage,
  CheckoutStepTwoPage,
  CheckoutCompletePage,
} = require('../po/pages');
const users = require('../data/users');

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();
const cartPage = new CartPage();
const checkoutStepOnePage = new CheckoutStepOnePage();
const checkoutStepTwoPage = new CheckoutStepTwoPage();
const checkoutCompletePage = new CheckoutCompletePage();

const allure = require('@wdio/allure-reporter').default;

const productsToTest = [
  'Sauce Labs Backpack',
  'Test.allTheThings() T-Shirt (Red)',
];

const SUCCESS_MESSAGE = 'Thank you for your order!';

describe('UC-1 Checkout Flow', () => {
  beforeEach(async () => {
    await loginPage.open();
    await browser.execute(() => localStorage.clear());
    await browser.execute(() => sessionStorage.clear());

    await allure.step(
      'Login as standard user and go to inventory page',
      async () => {
        await loginPage.login(
          users.standard_user.username,
          users.standard_user.password,
        );
        await inventoryPage.waitForPageLoad();
        await expect(await browser.getUrl()).toContain(inventoryPage.pageUrl);
      },
    );
  });

  productsToTest.forEach((productName) => {
    it(`should complete checkout flow with product: ${productName}`, async () => {
      await allure.step(`Add product to cart: ${productName}`, async () => {
        await inventoryPage.addProductToCart(productName);
      });

      await allure.step(
        'Validate cart state after adding product',
        async () => {
          await expect(
            inventoryPage.getRemoveButton(productName),
          ).toBeDisplayed();
          await expect(inventoryPage.header.cartBadge).toHaveText('1');
        },
      );

      await allure.step('Navigate to cart', async () => {
        await inventoryPage.header.goToCart();
        await cartPage.waitForPageLoad();
        await expect(await browser.getUrl()).toContain(cartPage.pageUrl);
        await expect(cartPage.header.cartBadge).toHaveText('1');
      });

      await allure.step('Validate product exists in cart', async () => {
        const cartItems = await cartPage.getCartItemsNames();
        await expect(cartItems).toContain(productName);
        await expect(cartItems.length).toBe(1);
      });

      await allure.step('Proceed to checkout (Step 1)', async () => {
        await expect(cartPage.checkoutButton).toBeDisplayed();
        await cartPage.goToCheckout();
        await checkoutStepOnePage.waitForPageLoad();
        await expect(await browser.getUrl()).toContain(
          checkoutStepOnePage.pageUrl,
        );
        await expect(checkoutStepOnePage.header.cartBadge).toHaveText('1');
      });

      await allure.step('Validate checkout form is displayed', async () => {
        await expect(checkoutStepOnePage.firstNameInput).toBeDisplayed();
        await expect(checkoutStepOnePage.lastNameInput).toBeDisplayed();
        await expect(checkoutStepOnePage.postalCodeInput).toBeDisplayed();
      });

      await allure.step('Fill checkout form and continue', async () => {
        await checkoutStepOnePage.fillForm(users.standard_user.checkout);
        await checkoutStepOnePage.continueCheckout();
      });

      await allure.step('Validate product in checkout overview', async () => {
        await checkoutStepTwoPage.waitForPageLoad();
        await expect(await browser.getUrl()).toContain(
          checkoutStepTwoPage.pageUrl,
        );
        await expect(checkoutStepTwoPage.header.cartBadge).toHaveText('1');
        const overviewItems = await checkoutStepTwoPage.getItemNames();
        await expect(overviewItems).toContain(productName);
      });

      await allure.step('Finish checkout', async () => {
        await expect(checkoutStepTwoPage.finishButton).toBeDisplayed();
        await checkoutStepTwoPage.finishCheckout();
      });

      await allure.step('Validate order completion', async () => {
        await checkoutCompletePage.waitForPageLoad();
        await expect(await browser.getUrl()).toContain(
          checkoutCompletePage.pageUrl,
        );
        await expect(checkoutCompletePage.header.cartBadge).not.toBeDisplayed();
        await expect(checkoutCompletePage.successMessage).toBeDisplayed();
        await expect(checkoutCompletePage.successMessage).toHaveText(
          SUCCESS_MESSAGE,
        );
      });
    });
  });

  it('should complete checkout flow with multiple products', async () => {
    for (let i = 0; i < productsToTest.length; i++) {
      const product = productsToTest[i];

      await allure.step(`Add product to cart: ${product}`, async () => {
        await inventoryPage.addProductToCart(product);
      });
      await allure.step(`Validate cart after adding: ${product}`, async () => {
        await expect(inventoryPage.getRemoveButton(product)).toBeDisplayed();
        await expect(inventoryPage.header.cartBadge).toHaveText(String(i + 1));
      });
    }

    await allure.step('Navigate to cart', async () => {
      await inventoryPage.header.goToCart();
      await cartPage.waitForPageLoad();
      await expect(await browser.getUrl()).toContain(cartPage.pageUrl);
      await expect(cartPage.header.cartBadge).toHaveText(
        String(productsToTest.length),
      );
    });

    await allure.step('Validate all products in cart', async () => {
      const cartItems = await cartPage.getCartItemsNames();
      for (const product of productsToTest) {
        await expect(cartItems).toContain(product);
      }
      await expect(cartItems.length).toBe(productsToTest.length);
    });

    await allure.step('Proceed to checkout (Step 1)', async () => {
      await expect(cartPage.checkoutButton).toBeDisplayed();
      await cartPage.goToCheckout();
      await checkoutStepOnePage.waitForPageLoad();
      await expect(await browser.getUrl()).toContain(
        checkoutStepOnePage.pageUrl,
      );
      await expect(checkoutStepOnePage.header.cartBadge).toHaveText(
        String(productsToTest.length),
      );
    });

    await allure.step('Validate checkout form is displayed', async () => {
      await expect(checkoutStepOnePage.firstNameInput).toBeDisplayed();
      await expect(checkoutStepOnePage.lastNameInput).toBeDisplayed();
      await expect(checkoutStepOnePage.postalCodeInput).toBeDisplayed();
    });

    await allure.step('Fill checkout form and continue', async () => {
      await checkoutStepOnePage.fillForm(users.standard_user.checkout);
      await checkoutStepOnePage.continueCheckout();
    });

    await allure.step('Validate products in checkout overview', async () => {
      await checkoutStepTwoPage.waitForPageLoad();
      await expect(await browser.getUrl()).toContain(
        checkoutStepTwoPage.pageUrl,
      );
      await expect(checkoutStepTwoPage.header.cartBadge).toHaveText(
        String(productsToTest.length),
      );
      const overviewItems = await checkoutStepTwoPage.getItemNames();
      await expect(overviewItems).toEqual(
        expect.arrayContaining(productsToTest),
      );
    });

    await allure.step('Finish checkout', async () => {
      await expect(checkoutStepTwoPage.finishButton).toBeDisplayed();
      await checkoutStepTwoPage.finishCheckout();
    });

    await allure.step('Validate order completion', async () => {
      await checkoutCompletePage.waitForPageLoad();
      await expect(await browser.getUrl()).toContain(
        checkoutCompletePage.pageUrl,
      );
      await expect(checkoutCompletePage.header.cartBadge).not.toBeDisplayed();
      await expect(checkoutCompletePage.successMessage).toBeDisplayed();
      await expect(checkoutCompletePage.successMessage).toHaveText(
        SUCCESS_MESSAGE,
      );
    });
  });
});
