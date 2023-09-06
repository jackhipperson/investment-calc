import InputForm from "./components/InputForm"
import Header from "./components/Header"
import Table from "./components/Table.jsx"
import { useState } from "react"

function App() {

  const formatter = new Intl.NumberFormat('en-US', {
    style:'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})

  const [tableData, setTableData] = useState([])
  let yearlyData = []

  function onCalculate(calcData) {

    yearlyData = []

    let currentSavings = parseFloat(calcData.currentSavings);
    const yearlyContribution = parseFloat(calcData.yearlySavings);
    const years = parseInt(calcData.numYears);
    const interestRate = parseFloat(calcData.interestRate) / 100;
    let totalInterest = 0;
    let totalContribution = currentSavings;
    let yearlyEnd = 0;
    let yearlyEndInterest = 0;
    let totalEndInterest = 0;
    let totalEndContribution = 0;


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
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyEndInterest,
        totalInterest: totalEndInterest,
        savingsEndOfYear: yearlyEnd,
        totalContribution: totalEndContribution
      });
    }

    setTableData(yearlyData)
  }

  function onClear() {
    setTableData([])
  }

  return (
    <div className="mx-auto text-center">
      <Header />
      <InputForm onCalculate={onCalculate} onClear={onClear} />
      {tableData.length === 0 ? <p className="text-white p-4">Enter data and click Calculate to see results!</p> :
        <Table tableData={tableData} />}
    </div>
  )
}

export default App
