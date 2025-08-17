import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders loading states for sections', () => {
  render(<App />);
  const loaderElements = screen.getAllByText(/Loading.../i);
  expect(loaderElements.length).toBeGreaterThan(0);
});
