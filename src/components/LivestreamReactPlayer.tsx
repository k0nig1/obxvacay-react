import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import "./Livestream.css";

const LivestreamReactPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(
          "https://c.streamhoster.com/link/hls/WBs3lk/i2LT4nJscCY/iXF1Nbsfwi9_5/playlist.m3u8"
        );
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src =
          "https://c.streamhoster.com/link/hls/WBs3lk/i2LT4nJscCY/iXF1Nbsfwi9_5/playlist.m3u8";
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      }
    }
  }, []);

  return (
    <div className="responsive-player-wrapper">
      <video
        ref={videoRef}
        className="react-player"
        controls
        muted
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default LivestreamReactPlayer;