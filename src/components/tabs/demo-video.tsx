"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export function DemoVideo() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setVideoLoaded(true);
    const handleError = () => setVideoError(true);

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    // Check if already loaded
    if (video.readyState >= 3) {
      setVideoLoaded(true);
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-background/70 backdrop-blur-sm"
      >
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            videoLoaded && !videoError ? "opacity-100" : "opacity-0"
          }`}
          controls
          playsInline
        >
          <source src="/demo.mp4" type="video/mp4" />
        </video>

        {/* Loading skeleton / fallback */}
        <AnimatePresence>
          {(!videoLoaded || videoError) && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-muted/80"
            >
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary/60 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-foreground/80 text-sm font-medium">
                  See the Platform in Action
                </p>
                {!videoError ? (
                  <div className="flex items-center gap-2 justify-center mt-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" />
                    <p className="text-muted-foreground/60 text-xs">
                      Loading video...
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground/60 text-xs mt-3">
                    Video will be available soon
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
