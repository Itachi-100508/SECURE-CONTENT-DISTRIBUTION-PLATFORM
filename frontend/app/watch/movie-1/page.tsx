"use client";

import { useRef, useState, useEffect } from "react";

export default function WatchMovie() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* ---------------- FULLSCREEN DETECTION ---------------- */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  /* ---------------- PLAY / PAUSE ---------------- */
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  /* ---------------- PROGRESS ---------------- */
  const handleTimeUpdate = () => {
    if (!videoRef.current || !videoRef.current.duration) return;

    setProgress(
      (videoRef.current.currentTime / videoRef.current.duration) * 100
    );
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime =
      (Number(e.target.value) / 100) * videoRef.current.duration;
  };

  return (
    <>
      <main className="min-h-screen bg-black flex flex-col items-center justify-start px-6 pt-24">
        {/* TITLE */}
        <h1 className="text-white text-xl md:text-2xl -mt-15 mb-12 font-semibold">
          Episode 1 – What If…?
        </h1>

        {/* PLAYER WRAPPER */}
        <div
          className={`relative w-full max-w-5xl mx-auto transition-all
            ${
              !isFullscreen
                ? "border-4 border-red-900 rounded-xl shadow-[0_0_100px_rgba(127,29,29,0.6)]"
                : ""
            }
          `}
          onMouseMove={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* VIDEO */}
          <video
            ref={videoRef}
            src="/videos/episode-1.mp4"
            className="w-full rounded-lg"
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
          />

          {/* CENTER PLAY BUTTON */}
          {!playing && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-black/60 hover:bg-black/80 transition rounded-full p-6">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}

          {/* CONTROLS */}
          {showControls && (
            <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-b-xl">
              {/* PROGRESS BAR */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 accent-red-700 cursor-pointer"
              />

              {/* CONTROL ROW */}
              <div className="flex items-center justify-between mt-4 text-white">
                {/* PLAY / PAUSE */}
                <button onClick={togglePlay} className="hover:opacity-80">
                  {playing ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                    </svg>
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* FULLSCREEN */}
                <button
                  onClick={() =>
                    videoRef.current?.requestFullscreen()
                  }
                  className="hover:opacity-80"
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                    <path d="M7 14H5v5h5v-2H7v-3zm0-4h2V7h3V5H5v5zm10 9h-3v2h5v-5h-2v3zm-3-14v2h3v3h2V5h-5z" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
