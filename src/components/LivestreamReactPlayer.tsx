import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import "./Livestream.css";

const LivestreamReactPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    let hls: Hls | null = null;

    const setupHls = () => {
      if (Hls.isSupported()) {
        hls = new Hls();

        // Retry logic after media error
        const handleMediaError = () => {
          setTimeout(() => {
            if (retryCount < 3) {
              setRetryCount((prev) => prev + 1);
              setErrorMessage(`Retrying... (${retryCount + 1})`);
              hls?.recoverMediaError();
            } else {
              setErrorMessage("Failed to recover from media error.");
            }
          }, 3000);
        };
        
        // Attach error event listener for HLS errors
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                setErrorMessage("Live Stream Not Available (Network Error)");
                // hls?.stopLoad(); // Stop loading more chunks
                handleMediaError();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                setErrorMessage("Live Stream Not Available (Media Error)");
                handleMediaError();
                break;
              default:
                setErrorMessage("Live Stream Not Available (Fatal Error)");
                hls?.destroy(); // Destroy HLS instance
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
          video?.play();
          setErrorMessage(null); // Clear error message on successful load
          setRetryCount(0); // Reset retry count
        });
      } else if (video && video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src =
          "https://c.streamhoster.com/link/hls/WBs3lk/i2LT4nJscCY/iXF1Nbsfwi9_5/playlist.m3u8";
        video.addEventListener("loadedmetadata", () => {
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
          />
        </div>
      )}
    </div>
  );
};

export default LivestreamReactPlayer;