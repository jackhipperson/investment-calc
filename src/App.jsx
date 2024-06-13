import InputForm from "./components/InputForm.jsx"
import Header from "./components/Header.jsx"
import Table from "./components/Table.jsx"
import { useState } from "react"

function App() {


  // Function to format the values in the table
  const formatter = new Intl.NumberFormat('en-US', {
    style:'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})

  // State that hold the results data
  const [tableData, setTableData] = useState([])
  // 
  let yearlyData = []

  function onCalculate(calcData) {

    // Clear yearly data if currently populated
    yearlyData = []

    // Pull through values from input
    let currentSavings = parseFloat(calcData.currentSavings);
    const yearlyContribution = parseFloat(calcData.yearlySavings);
    const years = parseInt(calcData.numYears);
    const interestRate = parseFloat(calcData.interestRate) / 100;

    // Set up initial values
    let totalInterest = 0;
    let totalContribution = currentSavings;
    let yearlyEnd = 0;
    let yearlyEndInterest = 0;
    let totalEndInterest = 0;
    let totalEndContribution = 0;

    // Loop through each year calculating the values for each field
    for (let i = 0; i < years; i++) {
      let yearlyInterest = currentSavings * interestRate;
      currentSavings += yearlyInterest + yearlyContribution;
      totalInterest += yearlyInterest;
      totalContribution += yearlyContribution
      if (currentSavings > 100000000000000) {
        yearlyEnd = '£' + currentSavings.toExponential()
        yearlyEndInterest = '£' +yearlyInterest.toExponential()
        totalEndInterest = '£' + totalInterest.toExponential()
        totalEndContribution = '£' + totalContribution.toExponential()
      } else {
        yearlyEnd = formatter.format(currentSavings)
        yearlyEndInterest = formatter.format(yearlyInterest)
        totalEndInterest = formatter.format(totalInterest)
        totalEndContribution = formatter.format(totalContribution)
      }
      // Add to yearlyData array
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyEndInterest,
        totalInterest: totalEndInterest,
        savingsEndOfYear: yearlyEnd,
        totalContribution: totalEndContribution
      });
    }

    // Update state to hold final table values
    setTableData(yearlyData)
  }

  // Function that clears table (upon Clear button press)
  function onClear() {
    setTableData([])
  }

  return (
    <div className="mx-auto text-center">
      <Header />
      <InputForm onCalculate={onCalculate} onClear={onClear} />
      {tableData.length === 0 ? <p className="text-white p-4" data-cy="assistance-text">Enter data and click Calculate to see results!</p> :
        <Table tableData={tableData} />}
    </div>
  )
}

export default App
