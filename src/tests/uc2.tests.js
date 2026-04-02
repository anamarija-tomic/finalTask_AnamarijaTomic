const { pages } = require('../po');
const users = require('../data/users');

const ERROR_MESSAGE = 'Epic sadface: Sorry, this user has been locked out.';

const allure = require('@wdio/allure-reporter').default;

describe('UC-2 Data Driven Login', () => {
  Object.values(users).forEach((user) => {
    const title = user.shouldPass
      ? `should login with ${user.username}`
      : `should fail login with ${user.username}`;

    it(title, async () => {
      await allure.step('Open login page', async () => {
        await pages('login').open();
      });

      await allure.step(
        `Attempt login with user: ${user.username}`,
        async () => {
          await pages('login').login(user.username, user.password);
        },
      );

      if (user.shouldPass) {
        await allure.step(
          'Verify successful login and redirection',
          async () => {
            await pages('inventory').waitForPageLoad();
            await expect(await browser.getUrl()).toContain(
              pages('inventory').pageUrl,
            );
          },
        );
      } else {
        await allure.step('Verify error message is displayed', async () => {
          await expect(pages('login').errorMessage).toBeDisplayed();
          await expect(pages('login').errorMessage).toHaveText(ERROR_MESSAGE);
        });
      }
    });
  });
});
