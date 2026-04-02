class HeaderComponent {
  get cartBadge() {
    return $("[data-test='shopping-cart-badge']");
  }

  get cartLink() {
    return $("[data-test='shopping-cart-link']");
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = HeaderComponent;