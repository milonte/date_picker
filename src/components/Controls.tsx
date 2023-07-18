import { ReactElement } from "react"


/**
 * DatePicker Header Controls
 * @param {PropsWithoutRef} props
 * @param {Date} props.defaultDate Default selected Date
 * @param {number} props.searchMonth Current targeted search month
 * @param {number} props.searchYear Current targeted search year
 * @param {Date} props.minDate Minimim Date value 
 * @param {Date} props.maxDate Maximum Date value
 * @param {CallableFunction} props.handleClickClose Click Close button event
 * @param {CallableFunction} props.handleChangeMonth Change Month Event 
 * @param {CallableFunction} props.handleChangeYear Change Year Event 
 * @returns {ReactElement} Controls
 */
export default function Controls(props: {
    defaultDate: Date,
    searchMonth: number,
    searchYear: number,
    minDate: Date,
    maxDate: Date,
    handleClickClose: Function,
    handleChangeMonth: Function,
    handleChangeYear: Function
}): ReactElement {

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
                    return <option key={key} value={key}>{mo}</option>
                })}
            </select>
            -
            <select className='year_select' value={props.searchYear}
                onChange={(e) => { props.handleChangeYear(Number(e.target.value)) }}>
                {[[Array.from(
                    { length: (props.maxDate.getFullYear() - props.minDate.getFullYear()) + 1 },
                    (_, i) => {
                        const value = props.minDate.getFullYear() + i
                        return <option key={value} value={value}>{value}</option>
                    })]]}
            </select>
            <div className='right' onClick={() => props.handleChangeMonth(props.searchMonth + 1)}>Next</div>
            <div className='close' onClick={() => props.handleClickClose()}>Close</div>
        </div>
    )
}
