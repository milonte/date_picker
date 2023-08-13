import { ReactElement } from 'react';
import './styles/datepicker.scss';
/**
 * DatePTimePicker
 * @param {Object} props
 * @param {boolean} props.datePicker Enable DatePicker | true
 * @param {boolean} props.timePicker Enable TimePicker | true
 * @param {number} props.width Input Width
 * @param {Date} props.defaultDate Default  selected Date | now
 * @param {Date} props.minDate Minimim Date value | now - 100 year
 * @param {Date} props.maxDate Maximum Date Value | now + 100 year
 * @param {number[]} props.disabledWeekDays Disabled specifics days (0-6)
 * @param {string[]} props.reservedDates Disabled specifics Dates
 * @param {Record<string, string[]>} props.reservedDatesTimes Disabled specifics Times at specifics Dates
 * @param {string} props.minDayHour Minimum Hour selectable
 * @param {string} props.maxDayHour Maximum Hout Selectable
 * @param {number} props.hourStep Hour step increment
 * @callback props.onUpdateDate Return selected Date value on update
 * @returns {ReactElement} DatePicker
 */
export default function DateTimePicker(props: {
    datePicker?: boolean;
    timePicker?: boolean;
    width?: number;
    defaultDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    disabledWeekDays?: number[];
    reservedDates?: string[];
    reservedDatesTimes?: Record<string, string[]>;
    minDayHour?: string;
    maxDayHour?: string;
    hourStep?: number;
    onUpdatedDate: (date: Date) => void;
}): ReactElement;
//# sourceMappingURL=DateTimePicker.d.ts.map