const { LoginPage, InventoryPage } = require('../po/pages');
const users = require('../data/users');

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();

const allure = require('@wdio/allure-reporter').default;

describe('UC-2 Data Driven Login', () => {
  Object.values(users).forEach((user) => {
    const title = user.shouldPass
      ? `should login with ${user.username}`
      : `should fail login with ${user.username}`;

    it(title, async () => {
      // Given user is on the login page
      await allure.step('Open login page', async () => {
        await loginPage.open();
      });

      // When user attempts to login with provided credentials
      await allure.step(
        `Attempt login with user: ${user.username}`,
        async () => {
          await loginPage.login(user.username, user.password);
        },
      );

      // Then user should see expected result based on credentials
      if (user.shouldPass) {
        await allure.step(
          'Verify successful login and redirection',
          async () => {
            await inventoryPage.waitForPageLoad();

            const url = await browser.getUrl();
            await expect(url).toContain('/inventory.html');
            await expect(inventoryPage.inventoryContainer).toBeDisplayed();
          },
        );
      } else {
        await allure.step('Verify error message is displayed', async () => {
          await expect(loginPage.errorMessage).toBeDisplayed();
          await expect(loginPage.errorMessage).toHaveText(
            'Epic sadface: Sorry, this user has been locked out.',
          );
        });
      }
    });
  });
});
