import { jsx as _jsx } from "react/jsx-runtime";
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
export default function TimePicker(props) {
    // number of steps for minutes loop (for 1 hour)
    const steps = 60 / props.hourSteps;
    /**
     * Verify if target Time can be selected
     * @param {number} hour
     * @param {number} minutes
     * @returns {boolean}
     */
    function isTimeSelectable(hour, minutes) {
        // Get hours & minutes from props string
        const [minHour, minMinute] = props.minDayHour.split(':');
        const [maxHour, maxMinute] = props.maxDayHour.split(':');
        // Convert Times to number for comparison
        const minTime = Number(minHour) + Number(minMinute) / 60;
        const maxTime = Number(maxHour) + Number(maxMinute) / 60;
        const time = hour + minutes / 60;
        // Check Time interval restriction
        if (time < minTime) {
            return false;
        }
        else if (time > maxTime) {
            return false;
        }
        // Check reserved times for targeted date
        else if (props.reservedDatesTimes) {
            const disabledHours = props.reservedDatesTimes[props.date.toLocaleDateString()];
            if (disabledHours && disabledHours.includes(hour + ':' + minutes.toString().padStart(2, '0'))) {
                return false;
            }
        }
        // Time is selectable
        return true;
    }
    return (_jsx("div", { className: 'hours_container', children: [[Array.from({ length: 24 * steps }, (_, i) => {
                    const hour = Math.floor(i / steps);
                    const minutes = Math.floor((i % steps) * props.hourSteps);
                    const isSelectable = isTimeSelectable(hour, minutes);
                    const timeString = hour + ':' + minutes.toString().padStart(2, '0');
                    return _jsx("div", { className: `hour 
                    ${isSelectable ? 'selectable' : ''}`, onClick: (elt) => {
                            if (isSelectable) {
                                elt.currentTarget.parentElement?.querySelector('.selected')
                                    ?.classList.remove('selected');
                                elt.currentTarget.classList.add('selected');
                                props.handleClick(hour, minutes);
                            }
                        }, children: timeString }, timeString);
                })]] }));
}
