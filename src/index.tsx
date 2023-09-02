import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/datepicker.css';
import DateTimePicker from './components/DateTimePicker';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <DateTimePicker
      maxDate={new Date()}
    />
  </React.StrictMode>
);
