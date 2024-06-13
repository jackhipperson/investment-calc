import { useState } from "react";

function InputForm(props) {

    // Set the inital structure and state of the input data
    const initialState = {
        currentSavings: "",
        yearlySavings: "",
        interestRate: "",
        numYears: ""
    }

    // State to hold input form data
    const [inputData, setInputData] = useState(initialState)
    // States below contain booleans to show if there is an issue with input fields to adjust formatting
    const [currentError, setCurrentError] = useState(false)
    const [yearlyError, setYearlyError] = useState(false)
    const [interestError, setInterestError] = useState(false)
    const [numYearsError, setNumYearsError] = useState(false)

    
    function changeHandler(input, value) {
        if (input === 'current-savings') {
            setInputData(prevValues => {
                return {
                    ...prevValues,
                    currentSavings: value
                }
            })
        } else if (input === 'yearly-savings') {
            setInputData(prevValues => {
                return {
                    ...prevValues,
                    yearlySavings: value
                }
            })
        } else if (input === 'interest-rate') {
            setInputData(prevValues => {
                return {
                    ...prevValues,
                    interestRate: value
                }
            })
        } else if (input === 'num-years') {
            setInputData(prevValues => {
                return {
                    ...prevValues,
                    numYears: value
                }
            })
        }
    }

    function clearHandler(event) {
        event.preventDefault();
        setInputData(initialState)
        props.onClear()
    }

    function validate() {
        if (inputData.currentSavings === "") {
            setCurrentError(true)
        } else {
            setCurrentError(false)
        }
        if (inputData.yearlySavings === "") {
            setYearlyError(true)
        } else {
            setYearlyError(false)
        }
        if (inputData.numYears === "") {
            setNumYearsError(true)
        } else {
            setNumYearsError(false)
        }
        if (inputData.interestRate === "") {
            setInterestError(true)
        } else {
            setInterestError(false)
        }
    }

    function submitFormHandler(event) {
        event.preventDefault()
        validate()
        if (currentError || yearlyError || numYearsError || interestError) {
            props.onClear()
        } else {
            props.onCalculate(inputData)
        }
    }

    const errorStyle = 'rounded bg-red-800 border text-white border-white w-[100%] p-2'
    const noErrorStyle = 'rounded bg-transparent border text-white border-white w-[100%] p-2'

    return (
        <form onSubmit={submitFormHandler}>
            <div className="rounded shadow-lg bg-[#134611] p-4 max-w-3xl mx-auto text-xs sm:text-base">
                <div className="grid grid-flow-row-dense grid-cols-2 p-2 items-end">
                    <div className="flex flex-col items-start p-2">
                        <label className="text-white text-left text-bold w-[100%]" data-cy="label0">CURRENT SAVINGS (£)</label>
                        <input type="number" min="0.00" step="0.01" max="1000000000.00" required data-cy="field0" className={currentError ? errorStyle : noErrorStyle} value={inputData.currentSavings} onChange={(event) => changeHandler('current-savings', event.target.value)}></input>
                    </div>
                    <div className="flex flex-col items-start p-2">
                        <label className="text-white text-left text-bold w-[100%]" data-cy="label1">YEARLY SAVINGS (£)</label>
                        <input type="number" min="0.00" step="0.01" max="1000000000.00" required data-cy="field1" className={yearlyError ? errorStyle : noErrorStyle} value={inputData.yearlySavings} onChange={(event) => changeHandler('yearly-savings', event.target.value)}></input>
                    </div>
                    <div className="flex flex-col items-start p-2">
                        <label className="text-white text-left text-bold w-[100%]" data-cy="label2">EXPECTED INTEREST RATE (%) PER YEAR</label>
                        <input type="number" min="0.01" step="0.01" max="500000.00" required data-cy="field2" className={interestError ? errorStyle : noErrorStyle} value={inputData.interestRate} onChange={(event) => changeHandler('interest-rate', event.target.value)}></input>
                    </div>
                    <div className="flex flex-col items-start p-2">
                        <label className="text-white text-left text-bold w-[100%]" data-cy="label3">INVESTMENT PERIOD (YEARS)</label>
                        <input type="number" min="1" step="1" max="1000" data-cy="field3" required className={numYearsError ? errorStyle : noErrorStyle} value={inputData.numYears} onChange={(event) => changeHandler('num-years', event.target.value)}></input>
                    </div>
                </div>
                <div className="p-4">
                    <button type="button" data-cy="clear-button" className="text-base transition ease-in-out delay-150 p-3 text-white hover:-translate-y-1 hover:scale-100 duration-300" onClick={clearHandler}>Clear</button>
                    <button data-cy="calculate-button" className="text-base transition ease-in-out delay-150 p-3 text-white border-white border rounded bg-[#0a3009] hover:-translate-y-1 hover:scale-100 duration-300">Calculate</button>
                </div>
            </div>
        </form>
    )
}

export default InputForm;