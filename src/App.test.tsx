import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('MultiSelect integration', () => {
  // check if the header is rendered
  test('renders the header', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: /Multi Select Component 🎉/i })).toBeInTheDocument();
  });

  // check if the options are rendered when the input is focused
  test('clicking input shows the options', () => {
    render(<App />);
    const input = screen.getByTestId('multiselect-input');
    fireEvent.focus(input);
    expect(screen.getByText(/Science/i)).toBeVisible();
    expect(screen.getByText(/Education/i)).toBeVisible();
    expect(screen.getByText(/Art/i)).toBeVisible();
  });

  // check if the option is selected when clicked
  test('select an option, check it appears as a tag', () => {
    render(<App />);
    const input = screen.getByTestId('multiselect-input');
    fireEvent.focus(input);
    fireEvent.click(screen.getByText(/Science/i));
    const tags = screen.getByTestId('multiselect-tags');
    expect(within(tags).getByText(/Science/i)).toBeInTheDocument();
  });
});
