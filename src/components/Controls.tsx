export default function Controls(props: {
    defaultDate: Date,
    searchMonth: number,
    searchYear: number,
    handleClickClose: Function,
    handleChangeMonth: Function,
    handleChangeYear: Function
}) {
    const frMonths: string[] = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ]

    return (
        <div className='header_controls'>
            <div className='left' onClick={() => props.handleChangeMonth(props.searchMonth - 1)}>Prev</div>
            <div className='home' onClick={() => {
                props.handleChangeMonth(props.defaultDate.getMonth())
                props.handleChangeYear(props.defaultDate.getFullYear())
            }}>Home</div>
            <select className='month_select' value={props.searchMonth}
                onChange={(e) => { props.handleChangeMonth(Number(e.target.value)) }}>
                {frMonths.map((mo, key) => {
                    return <option value={key}>{mo}</option>
                })}
            </select>
            -
            <select className='year_select' value={props.searchYear}
                onChange={(e) => { props.handleChangeYear(Number(e.target.value)) }}>
                {[[Array.from(
                    { length: ((props.searchYear + 100) - (props.searchYear - 100)) },
                    (_, i) => {
                        const value = props.searchYear - 100 + i
                        return <option value={value}>{value}</option>
                    })]]}
            </select>
            <div className='right' onClick={() => props.handleChangeMonth(props.searchMonth + 1)}>Next</div>
            <div className='close' onClick={() => props.handleClickClose()}>Close</div>
        </div>
    )
}
