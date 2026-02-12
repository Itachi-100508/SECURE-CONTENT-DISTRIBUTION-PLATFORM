"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function WatchMovie() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  /* ---------------- LOAD USER EMAIL ---------------- */
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setUserEmail(email);
  }, []);

  /* ---------------- FULLSCREEN DETECTION ---------------- */
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);

      if (!isFs) {
        setShowControls(true);
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  /* ---------------- AUTO HIDE CONTROLS ---------------- */
  const handleMouseActivity = () => {
    setShowControls(true);

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    if (isFullscreen) {
      hideTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
  };

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

    const value =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;

    setProgress(value);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime =
      (Number(e.target.value) / 100) * videoRef.current.duration;
  };

  return (
    <main
      className={`bg-black flex flex-col items-center justify-center px-6 pt-40
        ${isFullscreen && !showControls ? "cursor-none" : "cursor-default"}`}
    >

      {/* BACK BUTTON */}
<button
  onClick={() => router.push("/dashboard")}
  className="absolute top-6 left-6 z-50 text-white/70 hover:text-white transition text-sm md:text-base flex items-center gap-2"
>
  <span className="text-xl">←</span>
  Back
</button>


      {/* TITLE */}
      {!isFullscreen && (
        <h1 className="text-white text-xl md:text-2xl -mt-15 mb-12 font-semibold">
          Episode 1 – What If…?
        </h1>
      )}

      {/* PLAYER WRAPPER */}
      <div
        className={`relative w-full max-w-5xl mx-auto transition-all
          ${
            !isFullscreen
              ? "rounded-xl shadow-[0_0_120px_rgba(255,255,255,0.35)]"
              : ""
          }`}
        onMouseMove={handleMouseActivity}
      >
        {/* VIDEO */}
        <video
          ref={videoRef}
          src="/videos/episode-1.mp4"
          onTimeUpdate={handleTimeUpdate}
          onClick={togglePlay}
          className={`w-full ${
            isFullscreen
              ? "h-screen w-screen object-contain rounded-none"
              : "rounded-lg"
          }`}
        />

        {/* WATERMARK */}
        {userEmail && (
          <div className="absolute bottom-6 right-6 pointer-events-none z-30">
            <span className="text-white/40 text-sm md:text-base font-semibold tracking-wide select-none drop-shadow-xl">
              {userEmail}
            </span>
          </div>
        )}

        {/* CENTER PLAY BUTTON */}
        {!playing && (
  <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
    <button
      onClick={togglePlay}
      className="pointer-events-auto bg-black/60 hover:bg-black/80 transition rounded-full p-6"
    >
      <svg width="42" height="42" viewBox="0 0 24 24" fill="white">
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  </div>
)}

        {/* CONTROLS */}
        {showControls && (
          <div
            className={`absolute bottom-0 left-0 right-0 px-6 pb-6 pt-12
            bg-gradient-to-t from-black/90 via-black/60 to-transparent
            ${!isFullscreen ? "rounded-b-xl" : ""}`}
          >
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
                  videoRef.current?.parentElement?.requestFullscreen()
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
  );
}
