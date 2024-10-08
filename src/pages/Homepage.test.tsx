import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

describe('Homepage', () => {
  test('renders the title and default components', () => {
    render(<Homepage />);

    // Check if the title is rendered
    const titleElement = screen.getByText(/OBX Vacay/i);
    expect(titleElement).toBeInTheDocument();

    // Check if the LivestreamReactPlayer is rendered
    const livestreamElement = screen.getByText(/LivestreamReactPlayer/i);
    expect(livestreamElement).toBeInTheDocument();

    // Check if the website link is rendered
    const websiteLink = screen.getByText(/OBXVacay.com/i);
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink.closest('a')).toHaveAttribute('href', 'https://obxvacay.com');

    // Check if the social media section is rendered
    const socialMediaElement = screen.getByText(/SocialMediaIcons/i);
    expect(socialMediaElement).toBeInTheDocument();
  });
});
