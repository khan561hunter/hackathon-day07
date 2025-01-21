import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '6rck97',
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  

  e2e: {
    baseUrl: 'http://localhost:3000', // Your app URL
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
