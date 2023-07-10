export default function TimePicker(props: {
    handleClick: Function
}) {

    const today = new Date()
    return (
        <div className='hours_container'>
            {[[Array.from({ length: 48 }, (_, i) => {
                const hour = Math.floor(i / 2)
                const halfHour: number = (i % 2) * 30
                const isPastHalfHour = today.getMinutes() >= 30 ? true : false

                return <div className={`selectable hour
              ${!isPastHalfHour ?
                        (halfHour === 30 && hour === today.getHours() ? 'current_hour' : '') :
                        halfHour === 0 && hour === today.getHours() + 1 ? 'current_hour' : ''}`}
                    onClick={() => {
                        props.handleClick(hour, halfHour)
                    }
                    }>
                    {hour}:{halfHour.toString().padStart(2, '0')}
                </div>
            })]]}
        </div>
    )
}
