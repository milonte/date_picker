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
export default function TableBody(props: {
    searchMonth: number;
    searchYear: number;
    minDate: Date;
    maxDate: Date;
    disabledWeekDays: number[];
    reservedDates: string[] | null;
    handleClickDate: Function;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TableBody.d.ts.map