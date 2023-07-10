export default function TableHeader() {

    const frDays: string[] = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    return (
        <thead>
            <tr>
                {frDays.map((day, key) => {
                    return (
                        <td key={'day' + key}>{day}</td>
                    )
                })}
            </tr>
        </thead>
    )
}
