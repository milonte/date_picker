import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TimePicker from './TimePicker';
import Controls from './Controls';
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
export default function DateTimePicker(props) {
    const defaultDate = props.defaultDate || new Date();
    const hourSteps = props.hourStep && props.hourStep > 0 ? props.hourStep : 30;
    const minDayHour = props.minDayHour || '00:00';
    const maxDayHour = props.maxDayHour || '23:59';
    const disabledWeekDays = props.disabledWeekDays || [];
    const minDate = props.minDate || new Date(defaultDate.getFullYear() - 100, 0, 0);
    const maxDate = props.maxDate || new Date(defaultDate.getFullYear() + 100, 0, 0);
    const [isCalendarShow, showCalendar] = useState(false);
    const [searchMonth, setSearchMonth] = useState(defaultDate.getMonth());
    const [searchYear, setSearchYear] = useState(defaultDate.getFullYear());
    const [date, setDate] = useState();
    const handleUpdateDate = props.onUpdatedDate;
    useEffect(() => {
        const inputElt = document.getElementById('datetime_input');
        const tableElt = document.getElementById('controls_container');
        // Show / Hide Picker
        isCalendarShow ? tableElt?.classList.add('show') : tableElt?.classList.remove('show');
        if (date) {
            const inputValue = [
                props.datePicker ? date.toLocaleDateString() : '',
                props.timePicker ? date.toLocaleTimeString() : ''
            ];
            inputElt?.setAttribute('value', inputValue.join(' ').trim());
            handleUpdateDate(date);
        }
        // Prevent search month overflow
        if (0 > searchMonth) {
            setSearchYear(searchYear - 1);
            setSearchMonth(11);
        }
        else if (11 < searchMonth) {
            setSearchYear(searchYear + 1);
            setSearchMonth(0);
        }
    }, [isCalendarShow, searchYear, searchMonth, date, handleUpdateDate]);
    return (_jsxs("div", { id: "datetime", children: [_jsx("input", { type: 'text', id: "datetime_input", style: { width: props.width }, onFocus: (e) => {
                    e.preventDefault();
                    showCalendar(true);
                } }), _jsxs("div", { id: "controls_container", children: [props.datePicker ? (_jsx(Controls, { defaultDate: defaultDate, searchMonth: searchMonth, searchYear: searchYear, minDate: minDate, maxDate: maxDate, handleChangeMonth: (month) => {
                            setSearchMonth(month);
                        }, handleChangeYear: (year) => {
                            setSearchYear(year);
                        }, handleClickClose: () => {
                            showCalendar(false);
                        } })) : null, _jsxs("div", { className: 'body_controls', style: { width: props.width }, children: [props.datePicker ? (_jsxs("table", { children: [_jsx(TableHeader, {}), _jsx(TableBody, { searchMonth: searchMonth, searchYear: searchYear, minDate: minDate, maxDate: maxDate, disabledWeekDays: disabledWeekDays, reservedDates: props.reservedDates || null, handleClickDate: (current) => {
                                            setDate(current);
                                            if (!props.timePicker) {
                                                showCalendar(false);
                                            }
                                        } })] })) : null, props.timePicker ? (_jsx(TimePicker, { hourSteps: hourSteps, minDayHour: minDayHour, maxDayHour: maxDayHour, date: date || defaultDate, reservedDatesTimes: props.reservedDatesTimes || null, handleClick: (hour, minutes) => {
                                    if (!date) {
                                        setDate(new Date(defaultDate.getFullYear(), defaultDate.getMonth(), defaultDate.getDate(), hour, minutes));
                                    }
                                    date?.setHours(hour);
                                    date?.setMinutes(minutes);
                                    showCalendar(false);
                                } })) : null] })] })] }));
}
