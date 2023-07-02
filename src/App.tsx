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

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

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
              onClick={() => {
                selectDate(date)
                setCalendarShow(false)
              }}
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

  return (
    <div className="App">
      <div id="datetime_container">
        <input type='text' id="datetime_input" onFocus={() => setCalendarShow(true)}></input>
        <div id="dates_table">
          <div className='controls'>
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
            <div className='close' onClick={() => setCalendarShow(false)}>Close</div>
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
