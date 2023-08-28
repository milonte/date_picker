import React from "react";

export default function TableHeader() {

    const frDays: string[] = ['Mon', 'Thu', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
