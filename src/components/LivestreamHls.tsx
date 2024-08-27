import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Livestream.css";

const LiveStreamHls: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(
        "https://c.streamhoster.com/link/hls/WBs3lk/i2LT4nJscCY/iXF1Nbsfwi9_5/playlist.m3u8"
      );
      if (videoRef.current) {
        hls.attachMedia(videoRef.current);
      }
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      // Fallback for browsers with native HLS support (e.g., Safari)
      videoRef.current.src =
        "https://c.streamhoster.com/link/hls/WBs3lk/i2LT4nJscCY/iXF1Nbsfwi9_5/playlist.m3u8";
    }
  }, []);

  return (
      <div className="responsive-hls-player">
        <video
          ref={videoRef}
          className="hls-player"
          controls
          style={{ width: "100%" }}
        />
      </div>
  );
};

export default LiveStreamHls;
