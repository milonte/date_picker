export default function TableBody(props: {
    month: number
    year: number
    minDate: Date
    maxDate: Date
    disabledWeekDays: number[]
    handleClick: Function
}) {

    const lastDayOfPrevMonth = new Date(props.year, props.month, 0)
    const today = new Date()

    function isDateSelectable(targetDate: Date): boolean {

        if (props.disabledWeekDays.includes(targetDate.getUTCDay())) {
            return false
        }

        if (targetDate < props.minDate ||
            targetDate > props.maxDate) {
            return false
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
                        props.year,
                        props.month,
                        (row * 7 + col) - lastDayOfPrevMonth.getDay() + 1,
                    )
                    const isSelectable: boolean = isDateSelectable(currentDate)

                    daysItems.push(
                        <td key={'currentDate' + row + col}
                            className={`
                            ${isSelectable ? 'selectable' : ''}
                            ${currentDate.getMonth() !== props.month ? 'month_out' :
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
