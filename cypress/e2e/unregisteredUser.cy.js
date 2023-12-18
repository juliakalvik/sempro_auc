describe("E2E test without login", () => {
  it("Go to page", () => {
    cy.visit("https://semproauch-julia.netlify.app/");
    cy.get(".inputField").type("dog");
    cy.get(".actionButton").click();
  });
});
