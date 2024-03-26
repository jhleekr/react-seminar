// Play and pause a video
import { useEffect, useRef, useState } from "react";

export const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const clickHandler = () => {
    setIsPlaying((curr) => !curr);
  };

  return (
    <>
      <button onClick={clickHandler}>{isPlaying ? "Pause" : "Play"}</button>
      <video
        ref={videoRef}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        loop
        playsInline
      />
    </>
  );
};
