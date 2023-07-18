import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import DatePicker from './DateTimePicker';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const reservedDatesTimes: Record<string, string[]> = {
  '26/07/2023': ['19:15', '20:45'],
  '27/07/2023': ['19:45', '20:15'],
}

const reservedDates: string[] = [
  '28/07/2023',
  '31/07/2023'
]

root.render(
  <React.StrictMode>
    <DatePicker datePicker timePicker hourStep={15}
      minDate={new Date(2023, 6, 10)}
      maxDate={new Date(2024, 6, 11)}
      minDayHour='18:52'
      maxDayHour='21:45'
      disabledWeekDays={[5, 6]}
      reservedDates={reservedDates}
      reservedDatesTimes={reservedDatesTimes}
      onUpdatedDate={(date) => { console.log(date) }}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
