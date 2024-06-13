import { testData } from "../fixtures/test-data";

describe("Check the app is correctly calculating", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/investment-calc-with-cypress/");
  });

  for (let x = 0; x < testData.length; x++) {
    it("Test Case #" + (x+1), () => {
      cy.get('[data-cy="field0"]').type(testData[x].current);
      cy.get('[data-cy="field1"]').type(testData[x].yearly);
      cy.get('[data-cy="field2"]').type(testData[x].interest);
      cy.get('[data-cy="field3"]').type(testData[x].years);
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="assistance-text"]').should("not.exist");
      cy.get('[data-cy="results-table"]')
        .should("exist")
        .find("tr")
        .should("have.length", (testData[x].years)+1)
        cy.get('[data-cy="results-table"]').find("tr").eq(testData[x].years).find('td').eq(1).should("have.text", "£"+testData[x].end);
    });
  }
});
