function Table(props) {

    return (
        <div className="overflow-x-auto">
            <table className="table-auto mx-auto text-white p-4 text-xs sm:text-base">
                <thead className="text-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">Year</th>
                        <th scope="col" className="px-6 py-3">Total Savings (End of Year)</th>
                        <th scope="col" className="px-6 py-3">Interest (Year)</th>
                        <th scope="col" className="px-6 py-3">Total Interest</th>
                        <th scope="col" className="px-6 py-3">Invested Capital</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tableData.map(row => {
                        return (
                            <tr key={row.year}>
                                <td scope="row" className="px-6 py-3">{row.year}</td>
                                <td scope="row" className="px-6 py-3">{row.savingsEndOfYear}</td>
                                <td scope="row" className="px-6 py-3">{row.yearlyInterest}</td>
                                <td scope="row" className="px-6 py-3">{row.totalInterest}</td>
                                <td scope="row" className="px-6 py-3">{row.totalContribution}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default Table;