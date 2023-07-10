export default function TimePicker(props: {
    hourSteps: number
    handleClick: Function
}) {

    const steps = 60 / props.hourSteps

    return (
        <div className='hours_container'>
            {[[Array.from({ length: 24 * steps }, (_, i) => {
                const hour = Math.floor(i / steps)
                const minutes: number = Math.floor((i % steps) * props.hourSteps)

                return <div className={`selectable hour`}
                    onClick={() => {
                        props.handleClick(hour, minutes)
                    }
                    }>
                    {hour}:{minutes.toString().padStart(2, '0')}
                </div>
            })]]}
        </div>
    )
}
