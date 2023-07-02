import React, { ReactElement, useEffect, useState } from 'react';
import './styles/app.scss';

export default function App(): ReactElement {
  const inputElt = document.getElementById('datetime_input')
  const tableElt = document.getElementById('dates_table');

  const today = new Date()
  const [isCalendarShow, setCalendarShow] = useState<boolean>(false);
  const [month, setMonth] = useState<number>(today.getMonth())
  const [year, setYear] = useState<number>(today.getFullYear())

  const lastDayOfPrevMonth = new Date(year, month, 0)


  const days: string[] = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const months: string[] = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ]

  useEffect(() => {
    isCalendarShow ? tableElt?.classList.add('show') : tableElt?.classList.remove('show')

    if (0 > month) {
      setYear(year - 1)
      setMonth(11)
    } else if (11 < month) {
      setYear(year + 1)
      setMonth(0)
    }
  }, [isCalendarShow, month])


  function selectDate(selectedDate: Date) {
    inputElt?.setAttribute('value', selectedDate.toLocaleDateString())
    setCalendarShow(false)
    // force to loose focus
    document.getElementById('datetime_input')?.blur()
  }

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
          const date = new Date(
            year,
            month,
            (row * 7 + col) - lastDayOfPrevMonth.getDay() + 1
          )

          daysItems.push(
            <td key={'date' + row + col}
              className={`selectable ${date.getMonth() !== month ? 'month_out' :
                date.toDateString() === today.toDateString() ? 'current_day' : ''}
                `}
              onClick={() => { selectDate(date) }}
            >
              {date.getDate()}
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

  /* const tableBodyTwo = () => {
    const lastDayOfCurrentMonth = new Date(year, month + 1, 0)
    const tableItems = []

    for (let i = 0; i < 6; i++) {
      const rowItems = []
      for (let j = 0; j < 7; j++) {
        const currentIndex = (i * 7 + j) - lastDayOfPrevMonth.getDay()

        const isPreviousMonth: boolean = 0 > currentIndex
        const isNextMonth: boolean = lastDayOfCurrentMonth.getDate() < currentIndex + 1
        const isCurrentDay: boolean = currentIndex + 1 === today.getDate()
          && !isPreviousMonth && !isNextMonth
          && month === today.getMonth() && year === today.getFullYear();

        rowItems.push(
          <td key={'date' + i + j}
            className={`selectable ${isPreviousMonth || isNextMonth ? 'month_out' :
              isCurrentDay ? 'current_day' : ''}
                `}
            onClick={() => {
              selectDate(new Date(
                year,
                month,
                currentIndex + 1
              ))
            }}>
            {currentIndex + 1 +
              (isPreviousMonth ? lastDayOfPrevMonth.getDate() :
                isNextMonth ? -lastDayOfCurrentMonth.getDate()
                  : 0)}
          </td>)

      }
      tableItems.push(<tr>{rowItems}</tr>)
    }

    return <tbody>{tableItems}</tbody>
  } */

  return (
    <div className="App">
      <div id="datetime_container"
        onFocus={() => setCalendarShow(true)}
        onBlur={() => setCalendarShow(false)}
        onMouseDown={(e) => {
          // prevent focus loose
          e.preventDefault()
          document.getElementById('datetime_input')?.focus()
        }}
      >
        <input type='text' id="datetime_input"></input>
        <div id="dates_table">

          <div className='controls'>
            <div className='left' onClick={() => setMonth(month - 1)}>Prev</div>
            <span>{months[month]} - {year}</span>
            <div className='right' onClick={() => setMonth(month + 1)}>Next</div>
          </div>
          <table>
            {tableHead}
            {tableBody}
            {/* {tableBodyTwo()} */}
          </table>
        </div>
      </div>
    </div>
  );
}
