"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { InteractiveStarfield } from "@/components/ui/starfield";
import { TabNavigation } from "@/components/ui/tab-navigation";
import { LicenseComparison } from "@/components/tabs/license-comparison";
import { Team } from "@/components/tabs/team";

const TABS = ["Client Portfolio", "ADGM License", "Team"];

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <Image
          src="/aspen-investor/logo.png"
          alt="Aspen Digital"
          width={320}
          height={100}
          priority
          className="h-12 w-auto"
        />
      </motion.div>
    </motion.div>
  );
}

function ClientPortfolio() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const resize = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc?.body) {
          iframe.style.height = doc.body.scrollHeight + "px";
        }
      } catch {}
    };

    const onMessage = (e: MessageEvent) => {
      if (e.data === "resize-iframe") resize();
    };

    iframe.addEventListener("load", () => { resize(); setTimeout(resize, 1500); });
    window.addEventListener("resize", resize);
    window.addEventListener("message", onMessage);
    return () => {
      iframe.removeEventListener("load", resize);
      window.removeEventListener("resize", resize);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <iframe
        ref={iframeRef}
        src="/aspen-investor/clients.html"
        className="w-full border-0"
        scrolling="no"
        style={{ overflow: "hidden" }}
        title="Institutional Client Portfolio"
      />
    </div>
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <main
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: null, y: null })}
        className="relative min-h-screen bg-background"
      >
        <InteractiveStarfield
          mousePosition={mousePosition}
          containerRef={containerRef}
        />

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <TabNavigation
            tabs={TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            disabledTabs={[]}
          />

          {/* Tab Content */}
          <div className="pt-16 pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeTab === 0 && <ClientPortfolio />}
                {activeTab === 1 && <LicenseComparison />}
                {activeTab === 2 && <Team />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <footer className="relative border-t border-border/20 py-10 px-6">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <p className="text-[11px] text-muted-foreground/40">
                &copy; {new Date().getFullYear()} Aspen Digital. All rights reserved.
              </p>
              <p className="text-[11px] text-muted-foreground/30">
                Confidential — For Investor Use Only
              </p>
            </div>
          </footer>
        </motion.div>
      </main>
    </>
  );
}
