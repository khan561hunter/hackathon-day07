describe("Login Form E2E Test", () => {
  const baseUrl = "http://localhost:3000"; // Replace with your app URL

  beforeEach(() => {
    cy.visit(`${baseUrl}/User`);  // Corrected URL to `/User`
  });

  it("should render the login form", () => {
    cy.get("#login-form").should("be.visible");
    cy.get("#email").should("exist");
    cy.get("#password").should("exist");
    cy.get("#login-button").should("exist").and("be.disabled");
  });

  it("should enable the login button when fields are filled", () => {
    cy.get("#email").type("user@example.com");
    cy.get("#password").type("securepassword");
    cy.get("#login-button").should("not.be.disabled");
  });

  it("should show an error for invalid login credentials", () => {
    cy.get("#email").type("invalid@example.com");
    cy.get("#password").type("wrongpassword");
    cy.get("#login-button").click();
  
    // Intercept the API request and mock the response
    cy.intercept("POST", {
      statusCode: 401,
      body: { error: "Invalid credentials" },
    }).as("loginRequest");
  
    // Wait for the intercepted request to be made
    cy.wait("@loginRequest");
  
    // Check if the error message is shown in the DOM
    cy.get(".error-message").should("be.visible").and("contain", "Invalid credentials");
  });
  

  it("should log in successfully with valid credentials", () => {
    cy.get("#email").type(Cypress.env("VALID_EMAIL") || "user@example.com");
    cy.get("#password").type(Cypress.env("VALID_PASSWORD") || "securepassword");
    cy.get("#login-button").click();

    // Assert redirection to the dashboard
    cy.url().should("eq",`${baseUrl}/dashboard`);  // Correct the URL to `/dashboard`
    cy.contains("Welcome back").should("be.visible");
  });
});
