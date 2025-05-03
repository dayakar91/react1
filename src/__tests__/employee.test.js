import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; // <-- Add this line to use jest-dom matchers
import FirstTest from "../../TestCcomponent";

test('My First Unit Test Case', () => {
  render(<FirstTest />);
  const element = screen.getByText(/learn react/i);
  expect(element).toBeInTheDocument(); // Now `toBeInTheDocument` will work
});
