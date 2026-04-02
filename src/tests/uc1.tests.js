const { pages } = require('../po');
const users = require('../data/users');

const allure = require('@wdio/allure-reporter').default;

const productsToTest = [
  'Sauce Labs Backpack',
  'Test.allTheThings() T-Shirt (Red)',
];

const SUCCESS_MESSAGE = 'Thank you for your order!';

describe('UC-1 Checkout Flow', () => {
  beforeEach(async () => {
    await pages('login').open();
    await browser.execute(() => localStorage.clear());
    await browser.execute(() => sessionStorage.clear());

    await allure.step(
      'Login as standard user and go to inventory page',
      async () => {
        await pages('login').login(
          users.standard_user.username,
          users.standard_user.password,
        );
        await pages('inventory').waitForPageLoad();
        await expect(await browser.getUrl()).toContain(
          pages('inventory').pageUrl,
        );
      },
    );
  });

  productsToTest.forEach((productName) => {
    it(`should complete checkout flow with product: ${productName}`, async () => {
      await allure.step(`Add product to cart: ${productName}`, async () => {
        await pages('inventory').addProductToCart(productName);
      });

      await allure.step(
        'Validate cart state after adding product',
        async () => {
          await expect(
            pages('inventory').getRemoveButton(productName),
          ).toBeDisplayed();
          await expect(pages('inventory').header.cartBadge).toHaveText('1');
        },
      );

      await allure.step('Navigate to cart', async () => {
        await pages('inventory').header.goToCart();
        await pages('cart').waitForPageLoad();
        await expect(await browser.getUrl()).toContain(pages('cart').pageUrl);
        await expect(pages('cart').header.cartBadge).toHaveText('1');
      });

      await allure.step('Validate product exists in cart', async () => {
        const cartItems = await pages('cart').getCartItemsNames();
        await expect(cartItems).toContain(productName);
        await expect(cartItems.length).toBe(1);
      });

      await allure.step('Proceed to checkout (Step 1)', async () => {
        await expect(pages('cart').checkoutButton).toBeDisplayed();
        await pages('cart').goToCheckout();
        await pages('checkoutStepOne').waitForPageLoad();
        await expect(await browser.getUrl()).toContain(
          pages('checkoutStepOne').pageUrl,
        );
        await expect(pages('checkoutStepOne').header.cartBadge).toHaveText('1');
      });

      await allure.step('Validate checkout form is displayed', async () => {
        await expect(pages('checkoutStepOne').firstNameInput).toBeDisplayed();
        await expect(pages('checkoutStepOne').lastNameInput).toBeDisplayed();
        await expect(pages('checkoutStepOne').postalCodeInput).toBeDisplayed();
      });

      await allure.step('Fill checkout form and continue', async () => {
        await pages('checkoutStepOne').fillForm(users.standard_user.checkout);
        await pages('checkoutStepOne').continueCheckout();
      });

      await allure.step('Validate product in checkout overview', async () => {
        await pages('checkoutStepTwo').waitForPageLoad();
        await expect(await browser.getUrl()).toContain(
          pages('checkoutStepTwo').pageUrl,
        );
        await expect(pages('checkoutStepTwo').header.cartBadge).toHaveText('1');
        const overviewItems = await pages('checkoutStepTwo').getItemNames();
        await expect(overviewItems).toContain(productName);
      });

      await allure.step('Finish checkout', async () => {
        await expect(pages('checkoutStepTwo').finishButton).toBeDisplayed();
        await pages('checkoutStepTwo').finishCheckout();
      });

      await allure.step('Validate order completion', async () => {
        await pages('checkoutComplete').waitForPageLoad();
        await expect(await browser.getUrl()).toContain(
          pages('checkoutComplete').pageUrl,
        );
        await expect(
          pages('checkoutComplete').header.cartBadge,
        ).not.toBeDisplayed();
        await expect(pages('checkoutComplete').successMessage).toBeDisplayed();
        await expect(pages('checkoutComplete').successMessage).toHaveText(
          SUCCESS_MESSAGE,
        );
      });
    });
  });

  it('should complete checkout flow with multiple products', async () => {
    for (let i = 0; i < productsToTest.length; i++) {
      const product = productsToTest[i];

      await allure.step(`Add product to cart: ${product}`, async () => {
        await pages('inventory').addProductToCart(product);
      });
      await allure.step(`Validate cart after adding: ${product}`, async () => {
        await expect(
          pages('inventory').getRemoveButton(product),
        ).toBeDisplayed();
        await expect(pages('inventory').header.cartBadge).toHaveText(
          String(i + 1),
        );
      });
    }

    await allure.step('Navigate to cart', async () => {
      await pages('inventory').header.goToCart();
      await pages('cart').waitForPageLoad();
      await expect(await browser.getUrl()).toContain(pages('cart').pageUrl);
      await expect(pages('cart').header.cartBadge).toHaveText(
        String(productsToTest.length),
      );
    });

    await allure.step('Validate all products in cart', async () => {
      const cartItems = await pages('cart').getCartItemsNames();
      for (const product of productsToTest) {
        await expect(cartItems).toContain(product);
      }
      await expect(cartItems.length).toBe(productsToTest.length);
    });

    await allure.step('Proceed to checkout (Step 1)', async () => {
      await expect(pages('cart').checkoutButton).toBeDisplayed();
      await pages('cart').goToCheckout();
      await pages('checkoutStepOne').waitForPageLoad();
      await expect(await browser.getUrl()).toContain(
        pages('checkoutStepOne').pageUrl,
      );
      await expect(pages('checkoutStepOne').header.cartBadge).toHaveText(
        String(productsToTest.length),
      );
    });

    await allure.step('Validate checkout form is displayed', async () => {
      await expect(pages('checkoutStepOne').firstNameInput).toBeDisplayed();
      await expect(pages('checkoutStepOne').lastNameInput).toBeDisplayed();
      await expect(pages('checkoutStepOne').postalCodeInput).toBeDisplayed();
    });

    await allure.step('Fill checkout form and continue', async () => {
      await pages('checkoutStepOne').fillForm(users.standard_user.checkout);
      await pages('checkoutStepOne').continueCheckout();
    });

    await allure.step('Validate products in checkout overview', async () => {
      await pages('checkoutStepTwo').waitForPageLoad();
      await expect(await browser.getUrl()).toContain(
        pages('checkoutStepTwo').pageUrl,
      );
      await expect(pages('checkoutStepTwo').header.cartBadge).toHaveText(
        String(productsToTest.length),
      );
      const overviewItems = await pages('checkoutStepTwo').getItemNames();
      await expect(overviewItems).toEqual(
        expect.arrayContaining(productsToTest),
      );
    });

    await allure.step('Finish checkout', async () => {
      await expect(pages('checkoutStepTwo').finishButton).toBeDisplayed();
      await pages('checkoutStepTwo').finishCheckout();
    });

    await allure.step('Validate order completion', async () => {
      await pages('checkoutComplete').waitForPageLoad();
      await expect(await browser.getUrl()).toContain(
        pages('checkoutComplete').pageUrl,
      );
      await expect(
        pages('checkoutComplete').header.cartBadge,
      ).not.toBeDisplayed();
      await expect(pages('checkoutComplete').successMessage).toBeDisplayed();
      await expect(pages('checkoutComplete').successMessage).toHaveText(
        SUCCESS_MESSAGE,
      );
    });
  });
});
