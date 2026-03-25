class LoginPage {
  get usernameInput() {
    return $("[data-test='username']");
  }

  get passwordInput() {
    return $("[data-test='password']");
  }

  get loginButton() {
    return $("[data-test='login-button']");
  }

  get errorMessage() {
    return $("[data-test='error']");
  }

  async open() {
    await browser.url('/');
  }

  async login(username, password) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }
}

module.exports = LoginPage;
