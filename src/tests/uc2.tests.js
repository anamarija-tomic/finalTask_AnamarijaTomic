const { LoginPage, InventoryPage } = require('../po/pages');
const users = require('../data/users');

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();

const ERROR_MESSAGE = 'Epic sadface: Sorry, this user has been locked out.';

const allure = require('@wdio/allure-reporter').default;

describe('UC-2 Data Driven Login', () => {
  Object.values(users).forEach((user) => {
    const title = user.shouldPass
      ? `should login with ${user.username}`
      : `should fail login with ${user.username}`;

    it(title, async () => {
      await allure.step('Open login page', async () => {
        await loginPage.open();
      });

      await allure.step(
        `Attempt login with user: ${user.username}`,
        async () => {
          await loginPage.login(user.username, user.password);
        },
      );

      if (user.shouldPass) {
        await allure.step(
          'Verify successful login and redirection',
          async () => {
            await inventoryPage.waitForPageLoad();
            await expect(await browser.getUrl()).toContain('/inventory.html');
          },
        );
      } else {
        await allure.step('Verify error message is displayed', async () => {
          await expect(loginPage.errorMessage).toBeDisplayed();
          await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGE);
        });
      }
    });
  });
});
