describe("Investment Calculator", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/investment-calc/");
  });

  context("Buttons Click", () => {
    it("should have all expected buttons present", () => {
      cy.get('[data-cy="clear-button"]').should("exist").click();
      cy.get('[data-cy="calculate-button"]').should("exist").click();
    });
  });

  context("Form Clears on Clear Button click", () => {
    it("should clear form on button click", () => {
      cy.get('[data-cy="field0"]').type("1000");
      cy.get('[data-cy="field1"]').type("1000");
      cy.get('[data-cy="field2"]').type("5");
      cy.get('[data-cy="field3"]').type("10");
      cy.get('[data-cy="clear-button"]').click();
      cy.get('[data-cy="field0"]').should("have.value", "");
      cy.get('[data-cy="field1"]').should("have.value", "");
      cy.get('[data-cy="field2"]').should("have.value", "");
      cy.get('[data-cy="field3"]').should("have.value", "");
    });
    it("should clear form on button click and clear table", () => {
      cy.get('[data-cy="field0"]').type("1000");
      cy.get('[data-cy="field1"]').type("1000");
      cy.get('[data-cy="field2"]').type("5");
      cy.get('[data-cy="field3"]').type("10");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="assistance-text"]').should("not.exist");
      cy.get('[data-cy="results-table"]')
        .should("exist")
        .find("tr")
        .should("have.length", 11);
      cy.get('[data-cy="clear-button"]').click();
      cy.get('[data-cy="field0"]').should("have.value", "");
      cy.get('[data-cy="field1"]').should("have.value", "");
      cy.get('[data-cy="field2"]').should("have.value", "");
      cy.get('[data-cy="field3"]').should("have.value", "");
      cy.get('[data-cy="assistance-text"]').should("exist");
      cy.get('[data-cy="results-table"]').should("not.exist");
    });
  });

  context("Populated Form Recalculates", () => {
    it("should recalc even though the table is currently populated", () => {
      cy.get('[data-cy="field0"]').type("1000");
      cy.get('[data-cy="field1"]').type("1000");
      cy.get('[data-cy="field2"]').type("5");
      cy.get('[data-cy="field3"]').type("10");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="assistance-text"]').should("not.exist");
      cy.get('[data-cy="results-table"]')
        .should("exist")
        .find("tr")
        .should("have.length", 11);
      cy.get('[data-cy="field3"]').clear().type("15");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="assistance-text"]').should("not.exist");
      cy.get('[data-cy="results-table"]')
        .should("exist")
        .find("tr")
        .should("have.length", 16);
    });
  });
});
