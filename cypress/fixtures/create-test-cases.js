// The below javascript function creates an oject within an array that can be used in test-data.js and ran in result-testing.cy.js


function createTestData(numCases) {
    let testCases = [];
  
    // Define number formatter
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  
    for (let index = 0; index < numCases; index++) {
      const calcData = {
        currentSavings: parseFloat((Math.random() * 1000).toFixed(2)),
        yearlySavings: parseFloat((Math.random() * 1000).toFixed(2)),
        years: parseInt(Math.random() * 100),
        interestRate: parseFloat((Math.random() * 100).toFixed(2)),
      };
  
      const yearlyData = [];
  
      let currentSavings = parseFloat(calcData.currentSavings);
      const yearlyContribution = parseFloat(calcData.yearlySavings);
      const years = parseInt(calcData.years);
      const interestRate = parseFloat(calcData.interestRate) / 100;
      let totalInterest = 0;
      let totalContribution = currentSavings;
  
      for (let i = 0; i < years; i++) {
        let yearlyInterest = currentSavings * interestRate;
        currentSavings += yearlyInterest + yearlyContribution;
        totalInterest += yearlyInterest;
        totalContribution += yearlyContribution;
  
        let yearlyEnd = 0;
        let yearlyEndInterest = 0;
        let totalEndInterest = 0;
        let totalEndContribution = 0;
  
        if (currentSavings > 100000000000000) {
          yearlyEnd = currentSavings.toExponential();
          yearlyEndInterest = yearlyInterest.toExponential();
          totalEndInterest = totalInterest.toExponential();
          totalEndContribution = totalContribution.toExponential();
        } else {
          yearlyEnd = formatter.format(currentSavings);
          yearlyEndInterest = formatter.format(yearlyInterest);
          totalEndInterest = formatter.format(totalInterest);
          totalEndContribution = formatter.format(totalContribution);
        }
  
        yearlyData.push({
          year: i + 1,
          yearlyInterest: yearlyEndInterest,
          totalInterest: totalEndInterest,
          savingsEndOfYear: yearlyEnd,
          totalContribution: totalEndContribution,
        });
      }
  
      testCases.push({
        current: calcData.currentSavings,
        yearly: calcData.yearlySavings,
        interest: calcData.interestRate,
        years: calcData.years,
        end: yearlyData[yearlyData.length - 1].savingsEndOfYear
      });
    }
    console.log(testCases);
  }
  
  // Call the function with a specific number of test cases
  createTestData(20);