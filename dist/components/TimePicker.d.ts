import { ReactElement } from "react";
/**
 * TimePicker
 * @param {PropsWithoutRef} props
 * @param {number} props.hourSteps Hour step increment
 * @param {string} props.minDayHour Minimum Hour selectable
 * @param {string} props.maxDayHour Maximum Hour selectable
 * @param {Date} props.date Selected Date
 * @param {Record<string, string[]> | null} props.reservedDatesTimes Disabled specifics Times for current target Date
 * @callback props.handleClick
 * @returns {ReactElement} TimePicker
 */
export default function TimePicker(props: {
    hourSteps: number;
    minDayHour: string;
    maxDayHour: string;
    date: Date;
    reservedDatesTimes: Record<string, string[]> | null;
    handleClick: Function;
}): ReactElement;
//# sourceMappingURL=TimePicker.d.ts.map