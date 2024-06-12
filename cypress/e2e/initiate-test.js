describe("Investment Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/investment-calc/");
  });

  context("Page Load", () => {
    it("should load the webpage", () => {
      cy.contains("Investment Calculator");
    });
  });

  context("Field Labels Correct", () => {
    it("should have all expected field labels present", () => {
      cy.get('[data-cy="label0"]')
        .should("exist")
        .contains("CURRENT SAVINGS (£)");
      cy.get('[data-cy="label1"]')
        .should("exist")
        .contains("YEARLY SAVINGS (£)");
      cy.get('[data-cy="label2"]')
        .should("exist")
        .contains("EXPECTED INTEREST RATE (%) PER YEAR");
      cy.get('[data-cy="label3"]')
        .should("exist")
        .contains("INVESTMENT PERIOD (YEARS)");
    });
  });

  context("Fields Exist", () => {
    it("should have all expected fields present", () => {
      cy.get('[data-cy="field0"]').should("exist");
      cy.get('[data-cy="field1"]').should("exist");
      cy.get('[data-cy="field2"]').should("exist");
      cy.get('[data-cy="field3"]').should("exist");
    });
  });

  context("Buttons Exist", () => {
    it("should have all expected buttons present", () => {
      cy.get('[data-cy="clear-button"]').should("exist");
      cy.get('[data-cy="calculate-button"]').should("exist");
    });
  });
  context("Assistance Text Present", () => {
    it("On load or clear the Assistance text should be present", () => {
      cy.get('[data-cy="assistance-text"]').should("exist");
    });
  });
});
