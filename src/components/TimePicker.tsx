import { ReactElement } from "react"

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
    hourSteps: number
    minDayHour: string,
    maxDayHour: string,
    date: Date,
    reservedDatesTimes: Record<string, string[]> | null,
    handleClick: Function
}): ReactElement {

    // number of steps for minutes loop (for 1 hour)
    const steps = 60 / props.hourSteps

    /**
     * Verify if target Time can be selected
     * @param {number} hour 
     * @param {number} minutes 
     * @returns {boolean}
     */
    function isTimeSelectable(hour: number, minutes: number): boolean {
        // Get hours & minutes from props string
        const [minHour, minMinute]: string[] = props.minDayHour.split(':')
        const [maxHour, maxMinute]: string[] = props.maxDayHour.split(':')

        // Convert Times to number for comparison
        const minTime: number = Number(minHour) + Number(minMinute) / 60
        const maxTime: number = Number(maxHour) + Number(maxMinute) / 60
        const time = hour + minutes / 60

        // Check Time interval restriction
        if (time < minTime) {
            return false
        }
        else if (time > maxTime) {
            return false
        }
        // Check reserved times for targeted date
        else if (props.reservedDatesTimes) {
            const disabledHours: string[] = props.reservedDatesTimes[props.date.toLocaleDateString()]
            if (disabledHours && disabledHours.includes(hour + ':' + minutes.toString().padStart(2, '0'))) {
                return false
            }
        }
        // Time is selectable
        return true
    }

    return (
        <div className='hours_container'>
            {[[Array.from({ length: 24 * steps }, (_, i) => {
                const hour = Math.floor(i / steps)
                const minutes: number = Math.floor((i % steps) * props.hourSteps)
                const isSelectable = isTimeSelectable(hour, minutes)
                const timeString: string = hour + ':' + minutes.toString().padStart(2, '0')

                return <div key={timeString}
                    className={`hour 
                    ${isSelectable ? 'selectable' : ''}`}
                    onClick={(elt) => {
                        if (isSelectable) {
                            elt.currentTarget.parentElement?.querySelector('.selected')
                                ?.classList.remove('selected')
                            elt.currentTarget.classList.add('selected')

                            props.handleClick(hour, minutes)
                        }
                    }
                    }>
                    {timeString}
                </div>
            })]]}
        </div>
    )
}
