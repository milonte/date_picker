export default function TimePicker(props: {
    hourSteps: number
    minDayHour: string,
    maxDayHour: string,
    date: Date,
    reservedDatesTimes: Record<string, string[]> | null,
    handleClick: Function
}) {

    const steps = 60 / props.hourSteps
    const [minHour, minMinute]: string[] = props.minDayHour.split(':')
    const [maxHour, maxMinute]: string[] = props.maxDayHour.split(':')
    const minTime = Number(minHour) + Number(minMinute) / 60
    const maxTime = Number(maxHour) + Number(maxMinute) / 60

    function isTimeSelectable(hour: number, minutes: number) {
        const time = hour + minutes / 60

        if (time < minTime) {
            return false
        }
        if (time > maxTime) {
            return false
        }
        if (props.reservedDatesTimes) {
            const disabledHours: string[] = props.reservedDatesTimes[props.date.toLocaleDateString()]
            if (disabledHours && disabledHours.includes(hour + ':' + minutes.toString().padStart(2, '0'))) {
                return false
            }
        }
        return true
    }
    return (
        <div className='hours_container'>
            {[[Array.from({ length: 24 * steps }, (_, i) => {
                const hour = Math.floor(i / steps)
                const minutes: number = Math.floor((i % steps) * props.hourSteps)
                const time = hour + minutes / 60
                const isSelectable = isTimeSelectable(hour, minutes)

                return <div className={`hour 
                    ${isSelectable ? 'selectable' : ''}`}
                    onClick={() => {
                        if (isSelectable) {
                            props.handleClick(hour, minutes)
                        }
                    }
                    }>
                    {hour}:{minutes.toString().padStart(2, '0')}
                </div>
            })]]}
        </div>
    )
}
