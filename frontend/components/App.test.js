import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppFunctional from './AppFunctional';

test('sanity', () => {
  expect(true).toBe(true);
});

test('renders headings, buttons, and input fields', () => {
  render(<AppFunctional />);
  expect(screen.getByText(/coordinates/i)).toBeInTheDocument();
  expect(screen.getByText(/you moved/i)).toBeInTheDocument();
  expect(screen.getByText(/left/i)).toBeInTheDocument();
  expect(screen.getByText(/up/i)).toBeInTheDocument();
  expect(screen.getByText(/right/i)).toBeInTheDocument();
  expect(screen.getByText(/down/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/type email/i)).toBeInTheDocument();
});

test('initially, the active square is in the center', () => {
  render(<AppFunctional />);
  const squares = screen.getAllByText('B');
  expect(squares.length).toBe(1);
  expect(squares[0]).toHaveClass('active');
});

test('typing in the email input changes its value', () => {
  render(<AppFunctional />);
  const input = screen.getByPlaceholderText(/type email/i);
  fireEvent.change(input, { target: { value: 'test@example.com' } });
  expect(input.value).toBe('test@example.com');
});

test('moving up decreases the Y coordinate', () => {
  render(<AppFunctional />);
  const upButton = screen.getByText(/up/i);
  fireEvent.click(upButton);
  expect(screen.getByText(/coordinates \(2, 1\)/i)).toBeInTheDocument();
});

test('resetting returns the "B" to the center', () => {
  render(<AppFunctional />);
  const upButton = screen.getByText(/up/i);
  const resetButton = screen.getByText(/reset/i);
  fireEvent.click(upButton);
  fireEvent.click(resetButton);
  expect(screen.getByText(/coordinates \(2, 2\)/i)).toBeInTheDocument();
});
