describe("template spec", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    cy.visit("https://semproauch-julia.netlify.app/login");
    cy.get("#email").type("Juliakulia@stud.noroff.no");
    cy.get("#password").type("Juliakulia");
    cy.get(":nth-child(4) > .w-full").click({ force: true });
  });

  it("Make a bidding", () => {
    cy.get('[href="/home"]').click();
    cy.get(":nth-child(1) > .aspect-h-1 > a > .h-full").click();
    cy.get(".inputField").type(3); // might fail if it exists a higher bid
    cy.get(".actionButton").click();
    cy.contains("Juliakulia"); // if it contains the username the bid is registered.
  });

  it("Make a listing and delete it", () => {
    cy.get('[href="/addlisting"]').click();
    cy.get(":nth-child(2) > .border-2 > .bg-white").type("testtitle");
    cy.get(":nth-child(4) > .border-2 > .bg-white").type("test, cyprss, cool");
    cy.get("#about").type("testlisting");
    cy.get("#datetimePicker").type("2024-12-18T00:01");
    cy.get(".my-4 > .appearance-none").type(
      "https://www.cypress.io/cypress_logo_social.png"
    );
    cy.get(":nth-child(3) > .rounded-md").click();
    cy.get('[href="/profile"]').click();
    cy.get(":nth-child(3) > :nth-child(4) > button").click();
  });
});
