import { jsx as _jsx } from "react/jsx-runtime";
/**
 * TableBody
 * @param {PropsWithoutRef} props
 * @param {number} props.searchMonth Month Search number (0-11)
 * @param {number} props.searchYear Year Search
 * @param {Date} props.minDate Minimim Date value
 * @param {Date} props.maxDate Maximum Date Value
 * @param {number} props.disabledWeekDays Disabled specifics days (0-6)
 * @param {number} props.reservedDates Disabled specifics Dates
 * @callback props.HandleClickDate
 * @returns {ReactElement} TableBody
 */
export default function TableBody(props) {
    const lastDayOfPrevMonth = new Date(props.searchYear, props.searchMonth, 0);
    const today = new Date();
    /**
     * Verify if target Date can be selected
     * @param {Date} targetDate Date to check
     * @returns {boolean}
     */
    function isDateSelectable(targetDate) {
        // Check for disabled days of week
        if (props.disabledWeekDays.includes(targetDate.getUTCDay())) {
            return false;
        }
        // Check for minimum & maximum Dates allowed
        else if (targetDate < props.minDate ||
            targetDate > props.maxDate) {
            return false;
        }
        // Check for reserved Dates
        else if (props.reservedDates) {
            const isDateReserved = props.reservedDates.find((val) => {
                return val === targetDate.toLocaleDateString();
            });
            if (isDateReserved) {
                return false;
            }
        }
        // Date is selectable
        return true;
    }
    return (_jsx("tbody", { children: [[...Array(6)].map((x, row) => {
                const daysItems = [];
                // for each days on the week
                for (let col = 0; col < 7; col++) { // COLS
                    // Define Date to draw
                    const currentDate = new Date(props.searchYear, props.searchMonth, (row * 7 + col) - lastDayOfPrevMonth.getDay() + 1);
                    // Check if date can be selected
                    const isSelectable = isDateSelectable(currentDate);
                    daysItems.push(_jsx("td", { className: `date 
                            ${isSelectable ? 'selectable' : ''}
                            ${currentDate.getMonth() !== props.searchMonth ? 'month_out' :
                            currentDate.toDateString() === today.toDateString() ? 'current_day selected' : ''}
              `, onClick: (elt) => {
                            if (isSelectable) {
                                elt.currentTarget.offsetParent?.querySelector('.selected')
                                    ?.classList.remove('selected');
                                elt.currentTarget.classList.add('selected');
                            }
                            props.handleClickDate(currentDate);
                        }, children: currentDate.getDate() }, 'currentDate' + row + col));
                }
                return (_jsx("tr", { children: daysItems.map((item) => {
                        return item;
                    }) }, row));
            })] }));
}
