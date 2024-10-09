import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Homepage from './Homepage';
import '@testing-library/jest-dom'; // Provides additional matchers for assertions
import { vi, describe, test, expect } from 'vitest'; // Correct import for Vitest mocks

// Mock components used in Homepage
vi.mock('../components/LivestreamReactPlayer', () => ({
  default: () => <div>LivestreamReactPlayer</div>,
}));
vi.mock('../components/SocialMediaIcons', () => ({
  default: () => <div>SocialMediaIcons</div>,
}));
vi.mock('../components/WeatherForecast', () => ({
  default: () => <div>WeatherForecast</div>,
}));

describe('Homepage', () => {
  test('renders the title and default components', async () => {
    await act(async () => {
      render(<Homepage />);
    });

    // Check if the title is rendered (ensure the right match function is used)
    const titleElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'ion-img' && content.includes('OBX Vacay');
    });
    expect(titleElement).toBeInTheDocument();

    // Check if the LivestreamReactPlayer is rendered
    const livestreamElement = screen.getByText(/LivestreamReactPlayer/i);
    expect(livestreamElement).toBeInTheDocument();

    // Check if the social media section is rendered
    const socialMediaElement = screen.getByText(/SocialMediaIcons/i);
    expect(socialMediaElement).toBeInTheDocument();
  });

  test('renders the WeatherForecast component', async () => {
    await act(async () => {
      render(<Homepage />);
    });

    // Check if the WeatherForecast is rendered
    const weatherElement = screen.getByText(/WeatherForecast/i);
    expect(weatherElement).toBeInTheDocument();
  });

  test('renders external links with correct attributes', async () => {
    await act(async () => {
      render(<Homepage />);
    });

    // Check if the OBX Voice button is rendered with the correct alt text
    const obxVoiceButton = screen.getByAltText(/OBX Voice/i);
    expect(obxVoiceButton).toBeInTheDocument();

    // Check if the OBX Vacay button is rendered with the correct alt text
    const obxVacayButton = screen.getByAltText(/OBX Vacay/i);
    expect(obxVacayButton).toBeInTheDocument();
  });
});