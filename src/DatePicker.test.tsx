import React from 'react';
import { render, screen } from '@testing-library/react';
import DatePicker from './DatePicker';

test('renders learn react link', () => {
  render(<DatePicker type='datetime' />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
