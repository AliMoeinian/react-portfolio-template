import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio owner name', () => {
  render(<App />);
  const nameElements = screen.getAllByText(/Ali Moeinian/i);
  expect(nameElements.length).toBeGreaterThan(0);
});
