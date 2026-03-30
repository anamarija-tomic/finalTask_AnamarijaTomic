# Final Task - Anamarija Tomić

## Task Description

**End-to-End Flow**  
Focus: Happy path execution and checkout logic.  
Launch URL: [https://www.saucedemo.com/](https://www.saucedemo.com/)

### UC-1 Checkout Flow

- Login with `standard_user`.
- Add a specific product to the cart (parametrize the product name, e.g., "Sauce Labs Backpack").
- Navigate to the Cart and validate the item is present.
- Proceed to Checkout.
- Fill in the Information form (First Name, Last Name, Zip).
- Complete the checkout and validate the success message:  
  `"Thank you for your order!"`.

### UC-2 Data Driven Login

- Use a data provider to test login with:
  1. `standard_user` (Should pass)
  2. `locked_out_user` (Should fail with specific error message)

## Technical Requirements

- **Tool:** WebDriverIO
- **Browsers:** Chrome, Edge (run in parallel)
- **Pattern:** Page Object Model (POM)
- **Locators:** CSS Selectors
- **Reporting:** Generate an Allure Report (or similar HTML report) for the test run.
- **Documentation:** Add a README.md explaining how to run the tests and generate the report.

## Project Structure

```plaintext
finalTask_AnamarijaTomic/
├─ src/
│  ├─ configs/
│  │  └─ wdio.conf.js
│  ├─ data/
│  │  └─ users.js
│  ├─ helpers
│  │  └─ textHelpers.js
│  ├─ po/
│  │  └─ pages/
│  │     ├─ cart.page.js
│  │     ├─ checkout-complete.page.js
│  │     ├─ checkout-step-one.page.js
│  │     ├─ checkout-step-two.page.js
│  │     ├─ index.js
│  │     ├─ inventory.page.js
│  │     └─ login.page.js
│  └─ tests/
│     ├─ uc1.tests.js
│     └─ uc2.tests.js
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ package.json
└─ README.md
```

## How to Run Tests

1. Install dependencies:
   `npm install`

2. Run tests in parallel on all configured browsers:
   `npm test`

3. Generate and open Allure report:
   `npm run report`

4. Run tests and automatically generate Allure report:
   `npm run test:report`

## Additional Notes

- The original requirement was to test a single product. The first UC-1 test uses a data-driven approach to add one product from the list per iteration, verifying it in the cart and completing checkout.
- An additional UC-1 test adds all products from the defined list in a single execution, verifies each item in the cart, and completes checkout, providing extra coverage beyond the original single-product requirement.
- User data for checkout and login is defined in the `users.js` file, which provides a centralized place for credentials and form inputs, making the tests more maintainable.
- UC-1 tests clear localStorage and sessionStorage before execution to ensure each test starts with a clean state.
- Detailed logging of each execution step is provided via Allure steps to improve test traceability.
