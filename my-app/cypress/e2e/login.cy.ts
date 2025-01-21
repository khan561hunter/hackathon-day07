describe("Login Form E2E Test", () => {
  const baseUrl = "http://localhost:3000"; // Replace with your app URL

  beforeEach(() => {
    cy.visit(`${baseUrl}/User`);
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

    // Simulate an error response and assert error message
    // This requires a backend or mock API setup
    cy.intercept("POST", "/api/login", {
      statusCode: 401,
      body: { error: "Invalid credentials" },
    });

    cy.contains("Invalid credentials").should("be.visible");
  });

  it("should log in successfully with valid credentials", () => {
    cy.get("#email").type(Cypress.env("VALID_EMAIL") || "user@example.com");
    cy.get("#password").type(Cypress.env("VALID_PASSWORD") || "securepassword");
    cy.get("#login-button").click();

    // Assert redirection or success
    cy.url().should("eq", `${baseUrl}/dashboard`);
    cy.contains("Welcome back").should("be.visible");
  });
});
