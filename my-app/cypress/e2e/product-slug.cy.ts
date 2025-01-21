describe('Product Slug Page', () => {
  const slug = "classic-black-straight-leg-jeans"; // Replace with the actual product slug

  beforeEach(() => {
    // Visit the product slug page
    cy.visit(`/products/${slug}`);
  });

  it('should display product details', () => {
    // Verify if the product name is visible
    cy.get('.text-2xl.font-bold').should('be.visible'); // Product name
    // Verify if the product description is visible
    cy.get('.text-sm.md\\:text-lg').should('be.visible'); // Product description
    // Verify if the product image is visible
    cy.get('.h-auto.max-w-full.rounded-lg.border-2.border').should('be.visible'); // Product image
  });

  it('should display Add to Cart button', () => {
    // Verify if the "Add to Cart" button is visible
    cy.get('.p-4.w-full.md\\:w-\\[170px\\].bg-gradient-to-r.from-teal-600.to-purple-700.rounded-full.text-white.font-bold')
      .contains('Add to Cart')
      .should('be.visible');
  });

  it('should display Wishlist button', () => {
    // Verify if the "Wishlist" button is visible
    cy.get('.p-4.w-full.md\\:w-\\[170px\\].bg-gradient-to-r.from-teal-600.to-purple-700.rounded-full.text-white.font-bold')
      .contains('Wishlist')
      .should('be.visible');
  });

  it('should add product to the cart and show success notification', () => {
    // Intercept the notification success message
    cy.intercept('POST', '/api/cart', {
      statusCode: 200,
      body: { success: true },
    });

    // Click on the "Add to Cart" button
    cy.get('.p-4.w-full.md\\:w-\\[170px\\].bg-gradient-to-r.from-teal-600.to-purple-700.rounded-full.text-white.font-bold')
      .contains('Add to Cart')
      .click();

    // Verify the success notification
    cy.get('.notification').should('contain', 'added to your cart');
  });

  it('should add product to the wishlist and show success notification', () => {
    // Intercept the notification success message
    cy.intercept('POST', '/api/wishlist', {
      statusCode: 200,
      body: { success: true },
    });

    // Click on the "Wishlist" button
    cy.get('.p-4.w-full.md\\:w-\\[170px\\].bg-gradient-to-r.from-teal-600.to-purple-700.rounded-full.text-white.font-bold')
      .contains('Wishlist')
      .click();

    // Verify the success notification
    cy.get('.notification').should('contain', 'added to your wishlist');
  });

  describe('Product Details Page', () => {
    // Intercept the API request before the test runs
    beforeEach(() => {
      cy.intercept('GET', '**/data/query/production?query=*', {
        statusCode: 200,
        body: {
          result: [], // Simulate no product found
        },
      }).as('fetchProduct');
    });
  
    it('should display an error message for an invalid product slug', () => {
      // Trigger the visit to the invalid product slug page
      cy.visit('/products/invalid-slug', { failOnStatusCode: false });
  
      // Wait for the intercepted request to complete
      cy.wait('@fetchProduct', { timeout: 10000 });
  
      // Assert that the "Product not found" message is displayed
      cy.get('[data-cy="product-not-found"]')
        .should('exist')
        .and('contain', 'Product not found');
    });
  });
  
  
  
  
});
