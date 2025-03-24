import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import audioManager from "../utils/AudioManager";
import "./Livestream.css";

const LivestreamReactPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    let hls: Hls | null = null;

    // Subscribe to AudioManager to stop audio when "stopAudio" event is emitted
    const handleStopAudio = () => {
      if (video) {
        video.pause();
      }
    };

    audioManager.on("stopAudio", handleStopAudio);

    const setupHls = () => {
      if (Hls.isSupported()) {
        hls = new Hls();

        // Retry logic after media error
        const handleMediaError = () => {
          setTimeout(() => {
            if (retryCount < 50) {
              setRetryCount((prev) => prev + 1);
              setErrorMessage(`Retrying... (${retryCount + 1})`);
              hls?.recoverMediaError();
            } else {
              setErrorMessage("Failed to recover from media error.");
            }
          }, 5000);
        };

        // Attach error event listener for HLS errors
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                setErrorMessage("Live Stream Not Available (Network Error)");
                handleMediaError();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                setErrorMessage("Live Stream Not Available (Media Error)");
                handleMediaError();
                break;
              default:
                setErrorMessage("Live Stream Not Available (Fatal Error)");
                hls?.destroy();
                break;
            }
          }
        });

        hls.loadSource(
          "https://c.streamhoster.com/link/hls/WBs3lk/i2LT4nJscCY/iXF1Nbsfwi9_5/playlist.m3u8"
        );
        if (video) {
          hls.attachMedia(video);
        }
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          audioManager.setCurrentAudio(video);
          video?.play();
          setErrorMessage(null); // Clear error message on successful load
          setRetryCount(0); // Reset retry count
        });
      } else if (video && video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src =
          "https://c.streamhoster.com/link/hls/WBs3lk/i2LT4nJscCY/iXF1Nbsfwi9_5/playlist.m3u8";
        video.addEventListener("loadedmetadata", () => {
          audioManager.setCurrentAudio(video);
          video.play();
          setErrorMessage(null);
        });
        video.addEventListener("error", () => {
          setErrorMessage("Live Stream Not Available (Playback Error)");
        });
      }
    };

    setupHls();

    return () => {
      if (hls) {
        hls.destroy();
      }
      // Unsubscribe from AudioManager events when component unmounts
      audioManager.off("stopAudio", handleStopAudio);

      // Stop the video when the component unmounts
      if (video) {
        video.pause();
        video.src = "";
      }
    };
  }, [retryCount]);

  return (
    <div>
      {errorMessage && (
        <div className="error-message" style={{ color: "red", textAlign: "center" }}>
          {errorMessage}
        </div>
      )}
      {!errorMessage && (
        <div className="responsive-player-wrapper">
          <video
            ref={videoRef}
            className="react-player"
            controls
            muted
            playsInline
            width="100%"
            height="100%"
            data-testid="livestream-video"
          />
        </div>
      )}
    </div>
  );
};

export default LivestreamReactPlayer;