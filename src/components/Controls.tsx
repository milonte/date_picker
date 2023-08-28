import React from "react"
import { faChevronCircleLeft, faChevronCircleRight, faChevronLeft, faChevronRight, faClose, faCoffee, faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactElement } from "react"


/**
 * DatePicker Header Controls
 * @param {PropsWithoutRef} props
 * @param {Date} props.defaultDate Default selected Date
 * @param {number} props.searchMonth Current targeted search month
 * @param {number} props.searchYear Current targeted search year
 * @param {Date} props.minDate Minimim Date value 
 * @param {Date} props.maxDate Maximum Date value
 * @param {CallableFunction} props.handleChangeMonth Change Month Event 
 * @param {CallableFunction} props.handleChangeYear Change Year Event 
 * @returns {ReactElement} Controls
 */
export default function Controls(props: {
    defaultDate: Date
    searchMonth: number
    searchYear: number
    minDate: Date
    maxDate: Date
    handleChangeMonth: Function
    handleChangeYear: Function
}): ReactElement {

    const months: string[] = [
        "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
        "Jul.", "Aug", "Sep.", "Oct.", "Nov.", "Dec."
    ]

    return (
        <>
            <div className='left' onClick={() => props.handleChangeMonth(props.searchMonth - 1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <div className='home' onClick={() => {
                props.handleChangeMonth(props.defaultDate.getMonth())
                props.handleChangeYear(props.defaultDate.getFullYear())
            }}>
                <FontAwesomeIcon icon={faHome} />
            </div>

            <select className='month_select' value={props.searchMonth}
                onChange={(e) => { props.handleChangeMonth(Number(e.target.value)) }}>
                {months.map((mo, key) => {
                    return <option key={key} value={key}>{mo}</option>
                })}
            </select>
            <select className='year_select' value={props.searchYear}
                onChange={(e) => { props.handleChangeYear(Number(e.target.value)) }}>
                {[[Array.from(
                    { length: (props.maxDate.getFullYear() - props.minDate.getFullYear()) + 1 },
                    (_, i) => {
                        const value = props.minDate.getFullYear() + i
                        return <option key={value} value={value}>{value}</option>
                    })]]}
            </select>
            <div className='right' onClick={() => props.handleChangeMonth(props.searchMonth + 1)}>
                <FontAwesomeIcon icon={faChevronRight} />
            </div>
        </>
    )
}
