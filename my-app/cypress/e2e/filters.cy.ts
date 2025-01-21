describe('Product Filters', () => {
 
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

 
  
  
  
});
