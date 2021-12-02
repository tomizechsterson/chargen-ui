import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from "../App";

describe('Top-level App component', () => {
  it('renders without exploding', () => {
    render(<App />);
  });
});
