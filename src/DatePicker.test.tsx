import React from 'react';
import { render, screen } from '@testing-library/react';
import DateTimePicker from './DateTimePicker';

test('renders learn react link', () => {
  render(<DateTimePicker datePicker timePicker
    onUpdatedDate={() => { }} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
