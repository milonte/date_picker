import React, { ReactElement, useEffect, useState } from 'react';
import './styles/datepicker.scss';

export default function DatePicker(props: {
  type: string
}): ReactElement {
  const inputElt = document.getElementById('datetime_input')
  const tableElt = document.getElementById('controls_container');
  const isTimerEnabled: boolean = props.type === 'datetime' || props.type === 'time' ? true : false

  const today = new Date()
  const [isCalendarShow, showCalendar] = useState<boolean>(false);
  const [month, setMonth] = useState<number>(today.getMonth())
  const [year, setYear] = useState<number>(today.getFullYear())
  const [date, setDate] = useState<Date>()

  const lastDayOfPrevMonth = new Date(year, month, 0)

  const days: string[] = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const months: string[] = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ]

  useEffect(() => {
    isCalendarShow ? tableElt?.classList.add('show') : tableElt?.classList.remove('show')

    if (date) {
      inputElt?.setAttribute('value', date.toLocaleString())
    }

    if (0 > month) {
      setYear(year - 1)
      setMonth(11)
    } else if (11 < month) {
      setYear(year + 1)
      setMonth(0)
    }
  }, [isCalendarShow, month, date])


  const tableHead = (
    <thead>
      <tr>
        {days.map((day, key) => {
          return (
            <td key={'day' + key}>{day}</td>
          )
        })}
      </tr>
    </thead>
  );

  const tableBody = (
    <tbody>
      {/* For each week on month */}
      {[[...Array(6)].map((x, row) => { // ROWS

        const daysItems = []

        // for each days on the week
        for (let col = 0; col < 7; col++) { // COLS
          const currentDate = new Date(
            year,
            month,
            (row * 7 + col) - lastDayOfPrevMonth.getDay() + 1
          )

          daysItems.push(
            <td key={'currentDate' + row + col}
              className={`selectable ${currentDate.getMonth() !== month ? 'month_out' :
                currentDate.toDateString() === today.toDateString() ? 'current_day' : ''}
                `}
              onClick={() => {
                setDate(currentDate)
                if (!isTimerEnabled) {
                  showCalendar(false)
                }
              }}
            >
              {currentDate.getDate()}
            </td>)
        }

        return (
          <tr>
            {daysItems.map((d) => {
              return d
            })}
          </tr>
        )
      })]}
    </tbody>
  );

  const tableTimer = (
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
            if (!date) {
              setDate(today)
            }
            date?.setHours(hour)
            date?.setMinutes(halfHour)
            showCalendar(false)
          }}>
          {hour}:{halfHour.toString().padStart(2, '0')}
        </div>
      })]]}
    </div>
  )

  return (
    <div id="datetime">
      <input type='text' id="datetime_input" onFocus={(e) => {
        e.preventDefault()
        showCalendar(true)
      }}></input>
      <div id="controls_container">
        <div className='header_controls'>
          <div className='left' onClick={() => setMonth(month - 1)}>Prev</div>
          <div className='home' onClick={() => {
            setMonth(today.getMonth())
            setYear(today.getFullYear())
          }}>Home</div>
          <select className='month_select' value={month} onChange={(e) => { setMonth(Number(e.target.value)) }}>
            {months.map((mo, key) => {
              return <option value={key}>{mo}</option>
            })}
          </select>
          -
          <select className='year_select' value={year} onChange={(e) => { setYear(Number(e.target.value)) }}>
            {[[Array.from(
              { length: ((year + 100) - (year - 100)) },
              (_, i) => {
                const value = year - 100 + i
                return <option value={value}>{value}</option>
              })]]}
          </select>
          <div className='right' onClick={() => setMonth(month + 1)}>Next</div>
          <div className='close' onClick={() => showCalendar(false)}>Close</div>
        </div>
        <div className='body_controls'>
          <table>
            {tableHead}
            {tableBody}
          </table>
          {isTimerEnabled ? (
            tableTimer
          ) : null}
        </div>
      </div>
    </div>
  );
}
