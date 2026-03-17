"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const DEMO_URL = "https://demo.aspendigital.co";

interface TabNavigationProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
  disabledTabs?: number[];
}

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  disabledTabs = [],
}: TabNavigationProps) {
  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl backdrop-saturate-150 border-b border-border/40">
      <div className="relative mx-auto px-6 flex items-center justify-center h-14">
        {/* Logo — absolute left */}
        <div className="absolute left-6 flex items-center">
          <Image
            src="/logo.png"
            alt="Aspen Digital"
            width={200}
            height={62}
            priority
            className="h-7 w-auto"
          />
        </div>

        {/* Tabs — centered */}
        <div className="relative flex w-fit items-center rounded-full bg-muted/80 p-1 gap-0.5">
          {tabs.map((tab, index) => {
            const isDisabled = disabledTabs.includes(index);
            const isActive = activeTab === index;
            return (
              <button
                key={tab}
                onClick={() => {
                  if (!isDisabled) {
                    onTabChange(index);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={cn(
                  "relative z-10 rounded-full px-5 sm:px-7 py-1.5 text-[13px] font-medium transition-colors duration-200 whitespace-nowrap",
                  isActive
                    ? "text-primary-foreground"
                    : isDisabled
                      ? "text-muted-foreground/30 cursor-default"
                      : "text-muted-foreground hover:text-foreground/80"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  {tab}
                  {isDisabled && (
                    <span className="text-[11px] uppercase tracking-wider font-semibold bg-muted-foreground/15 text-muted-foreground/40 px-1.5 py-0.5 rounded-full">
                      Soon
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Demo CTA — absolute right */}
        <div className="absolute right-6">
          <motion.a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-1.5 text-[13px] font-medium text-white transition-shadow duration-200 hover:shadow-[0_0_20px_rgba(241,126,0,0.3)]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Product Demo
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </motion.a>
        </div>
      </div>
    </div>
  );
}
