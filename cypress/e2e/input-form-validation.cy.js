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

  context("Current Savings", () => {
    it("Current Savings - Lower Limit", () => {
      cy.get('[data-cy="field0"]').type("0");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field0"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("");
      });
    });
    it("Current Savings - Upper limit", () => {
      cy.get('[data-cy="field0"]').type("1000000000");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field0"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("");
      });
    });
    it("Current Savings - Validate on negative number", () => {
      cy.get('[data-cy="field0"]').type("-1");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field0"]').then(($input) => {
        expect($input[0].validationMessage).to.eq(
          "Value must be greater than or equal to 0."
        );
      });
    });
    it("Current Savings - Validate over upper limit", () => {
      cy.get('[data-cy="field0"]').type("1000000001");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field0"]').then(($input) => {
        expect($input[0].validationMessage).to.eq(
          "Value must be less than or equal to 1000000000."
        );
      });
    });
    it("Current Savings - Validate blank entry", () => {
      cy.get('[data-cy="field0"]').clear();
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field0"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("Please fill in this field.");
      });
    });
    it("Current Savings - Non Numeric Entry", () => {
      cy.get('[data-cy="field0"]')
        .type('abcdef!£$"%^&*()@)')
        .should("have.value", "");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field0"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("Please fill in this field.");
      });
    });
  });

  context("Yearly Savings", () => {
    beforeEach(() => {
      cy.get('[data-cy="field0"]').type("1000");
    });
    it("Yearly Savings - Lower Limit", () => {
      cy.get('[data-cy="field1"]').type("0");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field1"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("");
      });
    });
    it("Yearly Savings - Upper limit", () => {
      cy.get('[data-cy="field1"]').type("1000000000");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field1"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("");
      });
    });
    it("Yearly Savings - Validate on negative number", () => {
      cy.get('[data-cy="field1"]').type("-1");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field1"]').then(($input) => {
        expect($input[0].validationMessage).to.eq(
          "Value must be greater than or equal to 0."
        );
      });
    });
    it("Yearly Savings - Validate over upper limit", () => {
      cy.get('[data-cy="field1"]').type("1000000000.01");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field1"]').then(($input) => {
        expect($input[0].validationMessage).to.eq(
          "Value must be less than or equal to 1000000000."
        );
      });
    });
    it("Yearly Savings - Validate blank entry", () => {
      cy.get('[data-cy="field1"]').clear();
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field1"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("Please fill in this field.");
      });
    });
    it("Yearly Savings - Non Numeric Entry", () => {
      cy.get('[data-cy="field1"]')
        .type('abcdef!£$"%^&*()@)')
        .should("have.value", "");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field1"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("Please fill in this field.");
      });
    });
  });

  context("Interest Rate", () => {
    beforeEach(() => {
      cy.get('[data-cy="field0"]').type("1000");
      cy.get('[data-cy="field1"]').type("1000");
    });
    it("Interest Rate - Lower Limit", () => {
      cy.get('[data-cy="field2"]').type("0.01");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field2"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("");
      });
    });
    it("Interest Rate - Upper limit", () => {
      cy.get('[data-cy="field2"]').type("500000");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field2"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("");
      });
    });
    it("Interest Rate - Lower Limit", () => {
      cy.get('[data-cy="field2"]').type("0.00");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field2"]').then(($input) => {
        expect($input[0].validationMessage).to.eq(
          "Value must be greater than or equal to 0.01."
        );
      });
    });
    it("Interest Rate - Validate on negative number", () => {
      cy.get('[data-cy="field2"]').type("-1");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field2"]').then(($input) => {
        expect($input[0].validationMessage).to.eq(
          "Value must be greater than or equal to 0.01."
        );
      });
    });
    it("Interest Rate - Validate over upper limit", () => {
      cy.get('[data-cy="field2"]').type("500000.01");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field2"]').then(($input) => {
        expect($input[0].validationMessage).to.eq(
          "Value must be less than or equal to 500000."
        );
      });
    });
    it("Interest Rate - Validate blank entry", () => {
      cy.get('[data-cy="field2"]').clear();
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field2"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("Please fill in this field.");
      });
    });
    it("Interest Rate - Non Numeric Entry", () => {
      cy.get('[data-cy="field2"]')
        .type('abcdef!£$"%^&*()@)')
        .should("have.value", "");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field2"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("Please fill in this field.");
      });
    });
  });

  context("Investment Period", () => {
    beforeEach(() => {
      cy.get('[data-cy="field0"]').type("1000");
      cy.get('[data-cy="field1"]').type("1000");
      cy.get('[data-cy="field2"]').type("5");
    });
    it("Investment Period - Lower Limit", () => {
      cy.get('[data-cy="field3"]').type("1");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field3"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("");
      });
    });
    it("Investment Period - Upper limit", () => {
      cy.get('[data-cy="field3"]').type("1000");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field3"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("");
      });
    });
    it("Investment Period - Lower Limit", () => {
      cy.get('[data-cy="field3"]').type("0.99");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field3"]').then(($input) => {
        expect($input[0].validationMessage).to.eq(
          "Value must be greater than or equal to 1."
        );
      });
    });
    it("Investment Period - Validate on negative number", () => {
      cy.get('[data-cy="field3"]').type("-1");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field3"]').then(($input) => {
        expect($input[0].validationMessage).to.eq(
          "Value must be greater than or equal to 1."
        );
      });
    });
    it("Investment Period - Validate over upper limit", () => {
      cy.get('[data-cy="field3"]').type("1000.01");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field3"]').then(($input) => {
        expect($input[0].validationMessage).to.eq(
          "Value must be less than or equal to 1000."
        );
      });
    });
    it("Investment Period - Validate blank entry", () => {
      cy.get('[data-cy="field3"]').clear();
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field3"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("Please fill in this field.");
      });
    });
    it("Investment Period - Non Numeric Entry", () => {
      cy.get('[data-cy="field3"]')
        .type('abcdef!£$"%^&*()@)')
        .should("have.value", "");
      cy.get('[data-cy="calculate-button"]').click();
      cy.get('[data-cy="field3"]').then(($input) => {
        expect($input[0].validationMessage).to.eq("Please fill in this field.");
      });
    });
  });
});

// cy.get('[data-cy="field0"]').should('have.css', 'background-color').and('eq', 'rgb(153 27 27 / var(--tw-bg-opacity))');
