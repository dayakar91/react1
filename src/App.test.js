import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import App from './App';

jest.mock('jspdf', () => {
  return jest.fn(() => ({
    text: jest.fn(),
    save: jest.fn(),
  }));
});
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/react/i);
  expect(linkElement).toBeInTheDocument();
});
