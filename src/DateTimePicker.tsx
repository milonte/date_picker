import React, { ReactElement, useEffect, useState } from 'react';
import './styles/datepicker.scss';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import TimePicker from './components/TimePicker';
import Controls from './components/Controls';

export default function DateTimePicker(props: {
  datePicker: boolean
  timePicker: boolean
  defaultDate?: Date
  onUpdatedDate?: Function
},): ReactElement {

  const defaultDate: Date = props.defaultDate || new Date()
  const inputElt = document.getElementById('datetime_input')
  const tableElt = document.getElementById('controls_container');

  const [isCalendarShow, showCalendar] = useState<boolean>(false);
  const [searchMonth, setSearchMonth] = useState<number>(defaultDate.getMonth())
  const [searchYear, setSearchYear] = useState<number>(defaultDate.getFullYear())
  const [date, setDate] = useState<Date>()

  useEffect(() => {
    isCalendarShow ? tableElt?.classList.add('show') : tableElt?.classList.remove('show')

    if (date) {
      inputElt?.setAttribute('value', date.toLocaleString())
      if (props.onUpdatedDate) {
        props.onUpdatedDate(date)
      }
    }

    if (0 > searchMonth) {
      setSearchYear(searchYear - 1)
      setSearchMonth(11)
    } else if (11 < searchMonth) {
      setSearchYear(searchYear + 1)
      setSearchMonth(0)
    }
  }, [isCalendarShow, searchMonth, date])

  return (
    <div id="datetime">

      <input type='text' id="datetime_input" onFocus={(e) => {
        e.preventDefault()
        showCalendar(true)
      }}></input>

      <div id="controls_container">
        {props.datePicker ? (

          <Controls
            defaultDate={defaultDate}
            searchMonth={searchMonth}
            searchYear={searchYear}
            handleChangeMonth={(month: number) => {
              setSearchMonth(month)
            }}
            handleChangeYear={(year: number) => {
              setSearchYear(year)
            }}
            handleClickClose={() => {
              showCalendar(false)
            }}
          />
        ) : null}
        <div className='body_controls'>
          {props.datePicker ? (
            <table>
              <TableHeader />
              <TableBody
                month={searchMonth}
                year={searchYear}
                handleClick={(current: Date) => {
                  setDate(current)
                  if (!props.timePicker) {
                    showCalendar(false)
                  }
                }} />
            </table>
          ) : null}

          {props.timePicker ? (
            <TimePicker
              handleClick={(hour: number, halfHour: number) => {
                if (!date) {
                  setDate(defaultDate)
                }
                showCalendar(false)
                date?.setHours(hour)
                date?.setMinutes(halfHour)
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
