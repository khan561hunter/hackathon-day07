describe('Product Filters', () => {
  const slug = "blue-jeans"
  beforeEach(() => {
    
    // Intercept the correct API request and give it an alias
    cy.intercept('GET', '**/data/query/production*', {
      statusCode: 200, // Mock successful response
      body: {
        result: [
          {
            _id: '1',
            name: 'Black T-Shirt',
            price: 20,
            colors: ['Red', 'Black'],
            imageUrl: 'https://via.placeholder.com/500',
            slug: 'black-t-shirt',
            description: 'A cool black t-shirt',
            discountPercent: 10,
          },
          {
            _id: '2',
            name: 'Blue Jeans',
            price: 40,
            colors: ['Blue', 'Black'],
            imageUrl: 'https://via.placeholder.com/500',
            slug: 'blue-jeans',
            description: 'Comfortable blue jeans',
            discountPercent: 15,
          },
        ],
      },
    }).as('fetchProducts');
    cy.visit('/Products-Listing'); // Adjust this URL if needed
  });

  it('should load products on initial page load', function () {
    // Wait for the products request
    cy.wait('@fetchProducts', { timeout: 15000 }).its('response.statusCode').should('eq', 200);
    // Check if products are displayed
    cy.get('.grid .border').should('have.length', 2); // Check if two products are displayed
    cy.get('.text-xl').first().should('contain', 'Black T-Shirt'); // Verify first product name
  });

  it('should filter products by category', function () {
    // Click on a category filter (e.g., "tshirt")
    cy.get('button').contains('tshirt').click();
    // Wait for the filtered products to be fetched
    cy.wait('@fetchProducts', { timeout: 15000 }).its('response.statusCode').should('eq', 200);

    // Ensure previous products are removed and only filtered ones are shown
    cy.get('.grid .border').should('have.length', 2); // Should show only 1 product for the selected category
    cy.get('.text-xl').first().should('contain', 'Black T-Shirt'); // Check if correct product is displayed
  });

  it('should filter products by color', function () {
    // Click on a color filter (e.g., "Red")
    cy.get('button').contains('Red').click();
    // Wait for the filtered products to be fetched
    cy.wait('@fetchProducts', { timeout: 15000 }).its('response.statusCode').should('eq', 200);

    // Ensure previous products are removed and only filtered ones are shown
    cy.get('.grid .border').should('have.length', 2); // Should show only 1 product for the selected color
    cy.get('.text-xl').first().should('contain', 'Black T-Shirt'); // Check if correct product is displayed
  });

  it('should navigate to the product details page when a product is clicked', function () {
    // Click the first product
    cy.get('.grid .border').first().click();
  
    // Log the URL for debugging
    cy.url().then((url) => {
      console.log('Current URL:', url); // Log the URL
    });
  
    // Wait for the URL to change (wait until it contains /products/slug)
    cy.location('pathname').should('include', '/products/'); // Wait until the pathname includes '/products/'
  
    // Use a more flexible check to match the dynamic slug
    cy.location('pathname').should('match', /\/products\/[\w-]+/);  // Regex to match slug pattern
  });
  
  
  
});
