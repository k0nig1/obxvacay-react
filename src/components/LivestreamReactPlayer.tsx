import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import "./Livestream.css";

const LivestreamReactPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();

        // Attach error event listener for HLS errors
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                setErrorMessage("Live Stream Not Available (Network Error)");
                hls.stopLoad(); // Optional: Stop loading more chunks
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                setErrorMessage("Live Stream Not Available (Media Error)");
                hls.recoverMediaError();
                break;
              default:
                setErrorMessage("Live Stream Not Available");
                hls.destroy(); // Destroy HLS instance
                break;
            }
          }
        });

        hls.loadSource(
          "https://c.streamhoster.com/link/hls/WBs3lk/i2LT4nJscCY/iXF1Nbsfwi9_5/playlist.m3u8"
        );
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
          setErrorMessage(null); // Clear error message on successful load
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
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
    }
  }, []);

  return (
    <div>
      {errorMessage && (
        <div className="error-message" style={{ color: "red", textAlign: "center" }}>
          {errorMessage}
        </div>
      )}
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
    </div>
  );
};

export default LivestreamReactPlayer;