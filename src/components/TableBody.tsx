export default function TableBody(props: {
    searchMonth: number
    searchYear: number
    minDate: Date
    maxDate: Date
    disabledWeekDays: number[]
    reservedDates: string[] | null
    handleClick: Function
}) {

    const lastDayOfPrevMonth = new Date(props.searchYear, props.searchMonth, 0)
    const today = new Date()

    function isDateSelectable(targetDate: Date): boolean {

        if (props.disabledWeekDays.includes(targetDate.getUTCDay())) {
            return false
        }

        else if (targetDate < props.minDate ||
            targetDate > props.maxDate) {
            return false
        }

        else if (props.reservedDates) {
            const isDateReserved = props.reservedDates.find((val) => {
                return val === targetDate.toLocaleDateString()
            })
            if (isDateReserved) {
                return false
            }
        }

        return true
    }

    return (
        <tbody>
            {/* For each week on month */}
            {[[...Array(6)].map((x, row) => { // ROWS

                const daysItems = []

                // for each frDays on the week
                for (let col = 0; col < 7; col++) { // COLS
                    const currentDate = new Date(
                        props.searchYear,
                        props.searchMonth,
                        (row * 7 + col) - lastDayOfPrevMonth.getDay() + 1,
                    )
                    const isSelectable: boolean = isDateSelectable(currentDate)

                    daysItems.push(
                        <td key={'currentDate' + row + col}
                            className={`
                            ${isSelectable ? 'selectable' : ''}
                            ${currentDate.getMonth() !== props.searchMonth ? 'month_out' :
                                    currentDate.toDateString() === today.toDateString() ? 'current_day' : ''}
              `}
                            onClick={() => {
                                if (isSelectable) props.handleClick(currentDate)
                            }}
                        >
                            {currentDate.getDate()}
                        </td>)
                }

                return (
                    <tr>
                        {daysItems.map((item) => {
                            return item
                        })}
                    </tr>
                )
            })]}
        </tbody>
    )
}
