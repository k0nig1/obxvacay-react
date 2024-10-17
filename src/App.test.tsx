import React from 'react';
import { render } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest'; // Correct import for Vitest mocks
import App from './App';

describe('App', () => {
  test('renders without crashing', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeDefined();
  });
});