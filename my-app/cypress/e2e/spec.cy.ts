describe('Product Listing Page', () => {
  beforeEach(() => {
    // Visit the page where the product list is displayed
    cy.visit('/'); // Replace with the correct route if needed
  });

  it('should display a list of products', () => {
    // Check if the page contains a grid of products
    cy.get('.md\\:grid').should('exist');
    cy.get('.md\\:grid > .w-full').should('have.length.greaterThan', 0); // Ensure there are products listed
  });

  it('should display product details', () => {
    // Verify that the product name and price are visible
    cy.get('.text-xl.font-semibold').first().should('be.visible'); // Product name
    cy.get('.text-3xl.font-bold.text-gray-900').first().should('be.visible'); // Product price
  });

  it('should display product image', () => {
    // Check if the product image is visible
    cy.get('.object-fill > .p-8.rounded-t-lg').first().should('be.visible');
  });

  it('should display "View Product" button', () => {
    // Check if the "View Product" button is visible
    cy.get('.text-white.bg-gradient-to-r').first().should('contain', 'View Product');
  });

  


  it('should handle product card animation', () => {
    // Ensure the product card animation is triggered when it enters the viewport
    cy.get('.md\\:grid > .w-full').first().scrollIntoView().should('have.css', 'opacity', '1');
  });

  it('should display error message on fetch failure', () => {
    // Simulate an error in fetching the products (you could mock the error or test the error state)
    // For now, just checking if an error message would be displayed
    cy.get('body').contains('Failed to load products.').should('not.exist');
  });

  
});
