import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mocked, Mock, MockedClass } from "vitest";
import LivestreamReactPlayer from "./LivestreamReactPlayer";
import Hls from "hls.js";

vi.mock("hls.js");

describe("LivestreamReactPlayer", () => {
    it("renders without crashing", () => {
        render(<LivestreamReactPlayer />);
        const videoElement = screen.getByRole("video");
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
            config: {},
            userConfig: {},
            coreComponents: [],
            networkControllers: [],
            startLoad: vi.fn(),
            recoverMediaError: vi.fn(),
            destroy: vi.fn(),
            started: false,
            _emitter: {},
            _autoLevelCapping: -1,
            _maxHdcpLevel: -1,
            // Add other missing properties here
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
            recoverMediaError: vi.fn(),
            stopLoad: vi.fn(),
            config: {},
            userConfig: {},
            coreComponents: [],
            networkControllers: [],
            startLoad: vi.fn(),
            destroy: vi.fn(),
            started: false,
            _emitter: {},
            _autoLevelCapping: -1,
            _maxHdcpLevel: -1,
        } as unknown as Hls;
        Hls.isSupported = vi.fn(() => true);
        (Hls as unknown as MockedClass<typeof Hls>).mockImplementation(() => mockHls);

        render(<LivestreamReactPlayer />);
        const errorMessage = screen.getByText("Live Stream Not Available (Media Error)");
        expect(errorMessage).toBeInTheDocument();
        });

        it("plays video when HLS is supported and manifest is parsed", () => {
        const mockHls = {
            on: vi.fn((event, callback) => {
                if (event === Hls.Events.MANIFEST_PARSED) {
                    callback();
                }
            }),
            loadSource: vi.fn(),
            attachMedia: vi.fn(),
            stopLoad: vi.fn(),
            config: {},
            userConfig: {},
            coreComponents: [],
            networkControllers: [],
            startLoad: vi.fn(),
            recoverMediaError: vi.fn(),
            destroy: vi.fn(),
            started: false,
            _emitter: {},
            _autoLevelCapping: -1,
            _maxHdcpLevel: -1,
        } as unknown as Hls;
        Hls.isSupported = vi.fn(() => true);
        (Hls as unknown as MockedClass<typeof Hls>).mockImplementation(() => mockHls);

        render(<LivestreamReactPlayer />);
        const videoElement = screen.getByRole("video");
        expect(videoElement).toHaveProperty("paused", false);
    });

    it("displays error message on video playback error", () => {
        Hls.isSupported = vi.fn(() => false);

        render(<LivestreamReactPlayer />);
        const videoElement = screen.getByRole("video");
        videoElement.dispatchEvent(new Event("error"));

        const errorMessage = screen.getByText("Live Stream Not Available (Playback Error)");
        expect(errorMessage).toBeInTheDocument();
    });
});