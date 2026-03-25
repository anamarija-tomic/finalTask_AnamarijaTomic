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

describe('UC-1 Checkout Flow', () => {
  beforeEach(async () => {
    await allure.step('Open login page and prepare clean state', async () => {
      await loginPage.open();
      await browser.execute(() => localStorage.clear());
      await browser.execute(() => sessionStorage.clear());
    });

    await allure.step(
      'Login as standard user and go to inventory page',
      async () => {
        await loginPage.login(
          users.standard_user.username,
          users.standard_user.password,
        );
        await inventoryPage.waitForPageLoad();
      },
    );
  });

  productsToTest.forEach((productName) => {
    it(`should complete checkout flow with product: ${productName}`, async () => {
      // Given user is logged in

      // When user adds product to cart
      await allure.step(`Add product to cart: ${productName}`, async () => {
        await inventoryPage.addProductToCart(productName);
      });

      // Then cart is updated correctly
      await allure.step(
        'Validate cart state after adding product',
        async () => {
          await expect(
            inventoryPage.getRemoveButton(productName),
          ).toBeDisplayed();

          await expect(inventoryPage.cartBadge).toHaveText('1');
        },
      );

      // When user navigates to cart
      await allure.step('Navigate to cart', async () => {
        await inventoryPage.goToCart();
        await cartPage.waitForPageLoad();
      });

      // Then product is visible in cart
      await allure.step('Validate product exists in cart', async () => {
        const cartItems = await cartPage.getCartItemsNames();

        await expect(cartItems).toContain(productName);
        await expect(cartItems.length).toBe(1);
        await expect(cartPage.checkoutButton).toBeDisplayed();
      });

      // When user proceeds to checkout
      await allure.step('Proceed to checkout (Step 1)', async () => {
        await cartPage.goToCheckout();
        await checkoutStepOnePage.waitForPageLoad();
      });

      // Then checkout form is displayed
      await allure.step('Validate checkout form is displayed', async () => {
        await expect(checkoutStepOnePage.firstNameInput).toBeDisplayed();
        await expect(checkoutStepOnePage.lastNameInput).toBeDisplayed();
        await expect(checkoutStepOnePage.postalCodeInput).toBeDisplayed();
      });

      // When user submits checkout form
      await allure.step('Fill checkout form and continue', async () => {
        const { firstName, lastName, postalCode } =
          users.standard_user.checkout;

        await checkoutStepOnePage.fillForm(firstName, lastName, postalCode);
        await checkoutStepOnePage.continueCheckout();
      });

      // Then user is redirected to checkout overview
      await allure.step(
        'Validate navigation to checkout overview',
        async () => {
          await checkoutStepTwoPage.waitForPageLoad();
        },
      );

      // And correct product is displayed
      await allure.step('Validate product in checkout overview', async () => {
        const overviewItems = await checkoutStepTwoPage.getItemNames();
        await expect(overviewItems).toContain(productName);

        await expect(checkoutStepTwoPage.finishButton).toBeDisplayed();
      });

      // When user finishes checkout
      await allure.step('Finish checkout', async () => {
        await checkoutStepTwoPage.finishCheckout();
      });

      // Then order is completed
      await allure.step('Validate order completion', async () => {
        await checkoutCompletePage.waitForPageLoad();

        await expect(checkoutCompletePage.successMessage).toBeDisplayed();
        await expect(checkoutCompletePage.successMessage).toHaveText(
          'Thank you for your order!',
        );
      });
    });
  });

  it('should complete checkout flow with multiple products', async () => {
    // Given user is logged in

    // When user adds multiple products
    for (let i = 0; i < productsToTest.length; i++) {
      const product = productsToTest[i];

      // When user adds product to cart
      await allure.step(`Add product to cart: ${product}`, async () => {
        await inventoryPage.addProductToCart(product);
      });
      // Then cart is updated correctly
      await allure.step(`Validate cart after adding: ${product}`, async () => {
        await expect(
          inventoryPage.getRemoveButton(product),
        ).toBeDisplayed();

        await expect(inventoryPage.cartBadge).toHaveText(String(i + 1));
      });
    }

    // When user navigates to cart
    await allure.step('Navigate to cart', async () => {
      await inventoryPage.goToCart();
      await cartPage.waitForPageLoad();
    });

    // Then all products are visible
    await allure.step('Validate all products in cart', async () => {
      const cartItems = await cartPage.getCartItemsNames();

      for (const product of productsToTest) {
        await expect(cartItems).toContain(product);
      }

      await expect(cartItems.length).toBe(productsToTest.length);
      await expect(cartPage.checkoutButton).toBeDisplayed();
    });

    // When user proceeds to checkout
    await allure.step('Proceed to checkout (Step 1)', async () => {
      await cartPage.goToCheckout();
      await checkoutStepOnePage.waitForPageLoad();
    });

    // Then checkout form is displayed
    await allure.step('Validate checkout form is displayed', async () => {
      await expect(checkoutStepOnePage.firstNameInput).toBeDisplayed();
      await expect(checkoutStepOnePage.lastNameInput).toBeDisplayed();
      await expect(checkoutStepOnePage.postalCodeInput).toBeDisplayed();
    });

    // When user submits checkout form
    await allure.step('Fill checkout form and continue', async () => {
      const { firstName, lastName, postalCode } = users.standard_user.checkout;

      await checkoutStepOnePage.fillForm(firstName, lastName, postalCode);
      await checkoutStepOnePage.continueCheckout();
    });

    // Then user is redirected to checkout overview
    await allure.step('Validate navigation to checkout overview', async () => {
      await checkoutStepTwoPage.waitForPageLoad();
    });

    // And all products are visible in overview
    await allure.step('Validate products in checkout overview', async () => {
      const overviewItems = await checkoutStepTwoPage.getItemNames();

      await expect(overviewItems).toEqual(
        expect.arrayContaining(productsToTest),
      );

      await expect(checkoutStepTwoPage.finishButton).toBeDisplayed();
    });

    // When user finishes checkout
    await allure.step('Finish checkout', async () => {
      await checkoutStepTwoPage.finishCheckout();
    });

    // Then order is completed
    await allure.step('Validate order completion', async () => {
      await checkoutCompletePage.waitForPageLoad();

      await expect(checkoutCompletePage.successMessage).toBeDisplayed();
      await expect(checkoutCompletePage.successMessage).toHaveText(
        'Thank you for your order!',
      );
    });
  });
});
