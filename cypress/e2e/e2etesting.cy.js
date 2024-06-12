describe("Investment Calculator", () => {
  it("should load the webpage", () => {
    cy.visit("http://localhost:5173/investment-calc");
    cy.contains("Investment Calculator");
  });
});
