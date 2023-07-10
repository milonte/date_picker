export default function TimePicker(props: {
    hourSteps: number
    minDayHour: string,
    maxDayHour: string,
    handleClick: Function
}) {

    const steps = 60 / props.hourSteps
    const [minHour, minMinute]: string[] = props.minDayHour.split(':')
    const [maxHour, maxMinute]: string[] = props.maxDayHour.split(':')
    const minTime = Number(minHour) + Number(minMinute) / 60
    const maxTime = Number(maxHour) + Number(maxMinute) / 60

    return (
        <div className='hours_container'>
            {[[Array.from({ length: 24 * steps }, (_, i) => {
                const hour = Math.floor(i / steps)
                const minutes: number = Math.floor((i % steps) * props.hourSteps)
                const time = hour + minutes / 60
                const isSelectable = time >= minTime && time <= maxTime
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
