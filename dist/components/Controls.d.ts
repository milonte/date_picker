import { ReactElement } from "react";
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
    defaultDate: Date;
    searchMonth: number;
    searchYear: number;
    minDate: Date;
    maxDate: Date;
    handleClickClose: Function;
    handleChangeMonth: Function;
    handleChangeYear: Function;
}): ReactElement;
//# sourceMappingURL=Controls.d.ts.map