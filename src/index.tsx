import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import DatePicker from './DateTimePicker';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <DatePicker datePicker timePicker hourStep={15}
      minDate={new Date(2023, 6, 10)}
      maxDate={new Date(2024, 6, 11)}
      minHour='18:52'
      maxHour='19:45'
      disabledDays={[5, 6]}
      onUpdatedDate={(date: Date) => { console.log(date) }}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
