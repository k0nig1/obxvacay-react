import React from 'react';
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, MockedClass } from "vitest";
import LivestreamReactPlayer from "./LivestreamReactPlayer";
import Hls from "hls.js";

// Mock Hls.js module
vi.mock("hls.js");

describe("LivestreamReactPlayer", () => {
  // Mock HTMLMediaElement.play for JSDOM environment
  const mockPlay = vi.fn();
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: mockPlay, // mock the play method
  });

  // Mock HTMLMediaElement.pause for JSDOM environment
  const mockPause = vi.fn();
  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    value: mockPause, // mock the pause method
  });

  it("renders without crashing", () => {
    render(<LivestreamReactPlayer />);
    const videoElement = screen.getByTestId("livestream-video");
    expect(videoElement).toBeInTheDocument();
  });

  it("displays error message on HLS network error", () => {
    const mockHls = {
      on: vi.fn((event, callback) => {
        if (event === Hls.Events.ERROR) {
          callback({}, { fatal: true, type: Hls.ErrorTypes.NETWORK_ERROR });
        }
      }),
      loadSource: vi.fn(),
      attachMedia: vi.fn(),
      stopLoad: vi.fn(),
      destroy: vi.fn(),
    } as unknown as Hls;

    Hls.isSupported = vi.fn(() => true);
    (Hls as unknown as MockedClass<typeof Hls>).mockImplementation(() => mockHls);

    render(<LivestreamReactPlayer />);
    const errorMessage = screen.getByText("Live Stream Not Available (Network Error)");
    expect(errorMessage).toBeInTheDocument();
  });

  it("displays error message on HLS media error", () => {
    const mockHls = {
      on: vi.fn((event, callback) => {
        if (event === Hls.Events.ERROR) {
          callback({}, { fatal: true, type: Hls.ErrorTypes.MEDIA_ERROR });
        }
      }),
      loadSource: vi.fn(),
      attachMedia: vi.fn(),
      stopLoad: vi.fn(),
      destroy: vi.fn(), // Ensure destroy method is included
    } as unknown as Hls;

    Hls.isSupported = vi.fn(() => true);
    (Hls as unknown as MockedClass<typeof Hls>).mockImplementation(() => mockHls);

    render(<LivestreamReactPlayer />);
    const errorMessage = screen.getByText("Live Stream Not Available (Media Error)");
    expect(errorMessage).toBeInTheDocument();
  });

  it("simulates video playback when HLS is supported and manifest is parsed", () => {
    const mockHls = {
      on: vi.fn((event, callback) => {
        if (event === Hls.Events.MANIFEST_PARSED) {
          callback();
        }
      }),
      loadSource: vi.fn(),
      attachMedia: vi.fn(),
      stopLoad: vi.fn(),
      destroy: vi.fn(),
    } as unknown as Hls;

    Hls.isSupported = vi.fn(() => true);
    (Hls as unknown as MockedClass<typeof Hls>).mockImplementation(() => mockHls);

    render(<LivestreamReactPlayer />);
    const videoElement = screen.getByTestId("livestream-video");
    expect(videoElement).toBeInTheDocument();
    expect(mockPlay).toHaveBeenCalled();
  });
});