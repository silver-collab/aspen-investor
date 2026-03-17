"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

const companies = [
  { name: "Aspen Digital", highlight: true },
  { name: "Binance", highlight: false },
  { name: "Kraken", highlight: false },
  { name: "M2", highlight: false },
  { name: "Rain", highlight: false },
];

type LicenseStatus = "yes" | "no" | "coming";

interface LicenseRow {
  activity: string;
  description: string;
  statuses: LicenseStatus[];
  isPipeline?: boolean;
}

const licenseRows: LicenseRow[] = [
  {
    activity: "Dealing in Investments as Matched Principal",
    description:
      "Act as the other side of every client trade — capturing spread and executing large orders without moving the market.",
    statuses: ["yes", "yes", "no", "no", "no"],
  },
  {
    activity: "Providing Custody",
    description:
      "Hold client assets securely — the foundation every institution requires before they'll trust you with a dollar.",
    statuses: ["yes", "yes", "yes", "yes", "yes"],
  },
  {
    activity: "Managing Assets",
    description:
      "Manage money on behalf of Asia's wealthiest families — and earn recurring fees doing it.",
    statuses: ["yes", "yes", "no", "no", "no"],
  },
  {
    activity: "Managing a Collective Investment Fund",
    description:
      "Create and sell investment funds globally — a capability no other ADGM crypto firm holds.",
    statuses: ["yes", "no", "no", "no", "no"],
  },
  {
    activity: "Arranging Deals in Investments",
    description:
      "Structure and place private deals — the digital asset equivalent of an investment bank.",
    statuses: ["yes", "yes", "no", "no", "no"],
  },
  {
    activity: "Advising on Investments or Credit",
    description:
      "Advise the region's wealthiest families on their digital asset strategy — building trust that leads to larger allocations.",
    statuses: ["yes", "no", "no", "no", "no"],
  },
  {
    activity: "Providing Credit",
    description:
      "Private credit funds and margin lending — secured against crypto collateral.",
    statuses: ["coming", "no", "no", "no", "no"],
    isPipeline: true,
  },
  {
    activity: "Providing Money Services",
    description:
      "Third-party payments and branded debit cards for seamless crypto spending across MENA.",
    statuses: ["coming", "no", "no", "no", "no"],
    isPipeline: true,
  },
  {
    activity: "Providing Options and Futures",
    description:
      "Derivatives and structured products built for Asia's institutional appetite.",
    statuses: ["coming", "no", "no", "no", "no"],
    isPipeline: true,
  },
];

function StatusIcon({ status }: { status: LicenseStatus }) {
  if (status === "yes") {
    return (
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/15">
        <Check className="w-4 h-4 text-emerald-400" strokeWidth={2.5} />
      </div>
    );
  }
  if (status === "coming") {
    return (
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-brand/15">
        <Clock className="w-4 h-4 text-brand/70" strokeWidth={2} />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-muted-foreground/5">
      <X className="w-4 h-4 text-muted-foreground/25" strokeWidth={2} />
    </div>
  );
}

function ScoreBar({ score, total }: { score: number; total: number }) {
  return (
    <div className="flex gap-1 mt-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-2 h-2 rounded-full transition-colors",
            i < score ? "bg-brand" : "bg-muted-foreground/15"
          )}
        />
      ))}
    </div>
  );
}

const barData = [
  { name: "Aspen", count: 7, isAspen: true, active: 6, eligible: 1 },
  { name: "Binance", count: 5, isAspen: false },
  { name: "Laser Digital", count: 4, isAspen: false },
  { name: "eToro", count: 4, isAspen: false },
  { name: "XBTO", count: 4, isAspen: false },
  { name: "Rain", count: 2, isAspen: false },
  { name: "Paxos", count: 2, isAspen: false },
  { name: "Circle", count: 2, isAspen: false },
  { name: "Copper", count: 2, isAspen: false },
  { name: "QCP", count: 1, isAspen: false },
  { name: "Zodia", count: 1, isAspen: false },
];

const chartVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
} as const;

const barVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

const labelVariants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
} as const;

function LicenseBarChart() {
  const maxCount = 7;

  return (
    <div className="mb-20 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm p-10 sm:p-12">
      <p className="text-[12px] text-muted-foreground/60 text-center mb-10 uppercase tracking-[0.2em] font-medium">
        Number of ADGM Licensed Activities by Firm
      </p>
      <motion.div
        className="flex justify-center gap-2 sm:gap-3"
        variants={chartVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {barData.map((item) => {
          const ratio = item.count / maxCount;
          const heightPct = ratio * 100;
          return (
            <motion.div
              key={item.name}
              className={cn(
                "flex flex-col items-center flex-1",
                item.isAspen ? "max-w-20" : "max-w-12"
              )}
              variants={labelVariants}
            >
              <div
                className="flex flex-col items-center justify-end w-full"
                style={{ height: "180px" }}
              >
                <span
                  className={cn(
                    "text-xs font-semibold mb-1.5 text-center tabular-nums",
                    item.isAspen ? "text-brand" : "text-muted-foreground/60"
                  )}
                >
                  {item.count}
                </span>

                {item.isAspen && item.eligible ? (
                  <motion.div
                    className="w-full flex flex-col rounded-t-md overflow-hidden origin-bottom"
                    style={{ height: `${heightPct}%` }}
                    variants={barVariants}
                  >
                    <div
                      className="w-full border-2 border-dashed border-brand/30 bg-brand/8"
                      style={{
                        height: `${(item.eligible / item.count) * 100}%`,
                      }}
                    />
                    <div className="w-full bg-brand flex-1" />
                  </motion.div>
                ) : (
                  <motion.div
                    className="w-full rounded-t-md bg-muted-foreground/10 origin-bottom"
                    style={{ height: `${heightPct}%` }}
                    variants={barVariants}
                  />
                )}
              </div>

              <div className="flex flex-col items-center mt-2.5">
                <span
                  className={cn(
                    "text-[11px] font-medium text-center leading-tight",
                    item.isAspen ? "text-brand" : "text-muted-foreground/50"
                  )}
                >
                  {item.name}
                </span>
                {item.isAspen && (
                  <span className="text-[11px] text-brand/40 mt-0.5 text-center whitespace-nowrap">
                    6 active + 1 eligible
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function LicenseComparison() {
  const scores = companies.map((_, colIdx) =>
    licenseRows.filter((row) => row.statuses[colIdx] === "yes").length
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white mb-4">
          One License. Every Capability.
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Aspen is the only firm in Abu Dhabi licensed to custody, trade,
          manage, and advise on digital assets — all under one roof.
        </p>
      </motion.div>

      <LicenseBarChart />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm overflow-x-auto"
      >
        {/* Header */}
        <div className="grid grid-cols-[1.4fr_repeat(5,minmax(90px,1fr))] min-w-[700px] border-b border-border/40">
          <div className="p-4 flex items-end">
            <span className="text-xs text-muted-foreground/70 font-medium uppercase tracking-wider">
              Licensed Activity
            </span>
          </div>
          {companies.map((company, idx) => (
            <div
              key={company.name}
              className={cn(
                "p-4 text-center flex flex-col items-center justify-end",
                company.highlight &&
                  "bg-brand/[0.08] border-x border-brand/10"
              )}
            >
              {company.highlight ? (
                <>
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-brand text-black text-[11px] font-bold px-3 py-0.5 rounded-full mb-2.5 uppercase tracking-wider"
                  >
                    Full Stack
                  </motion.div>
                  <Image
                    src="/logo.png"
                    alt="Aspen Digital"
                    width={120}
                    height={37}
                    className="h-5 w-auto"
                  />
                </>
              ) : (
                <span className="text-xs font-semibold text-foreground/80">
                  {company.name}
                </span>
              )}
              <ScoreBar score={scores[idx]} total={6} />
              <span
                className={cn(
                  "text-[11px] mt-1.5 font-medium tabular-nums",
                  company.highlight
                    ? "text-brand/70"
                    : "text-muted-foreground/50"
                )}
              >
                {scores[idx]}/6
              </span>
            </div>
          ))}
        </div>

        {/* Active Licenses Label */}
        <div className="grid grid-cols-[1.4fr_repeat(5,minmax(90px,1fr))] min-w-[700px] bg-muted/20">
          <div className="px-4 py-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand/80">
              Active Licenses
            </span>
          </div>
          {companies.map((c) => (
            <div
              key={`active-${c.name}`}
              className={cn(
                c.highlight && "bg-brand/[0.05] border-x border-brand/10"
              )}
            />
          ))}
        </div>

        {/* License Rows */}
        {licenseRows.map((row, rowIdx) => (
          <React.Fragment key={row.activity}>
            {rowIdx === 6 && (
              <div className="grid grid-cols-[1.4fr_repeat(5,minmax(90px,1fr))] min-w-[700px] bg-muted/20 border-t border-border/40">
                <div className="px-4 py-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand/40">
                    Coming Soon
                  </span>
                </div>
                {companies.map((c) => (
                  <div
                    key={`pipeline-${c.name}`}
                    className={cn(
                      c.highlight &&
                        "bg-brand/[0.05] border-x border-brand/10"
                    )}
                  />
                ))}
              </div>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.03 * rowIdx, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "grid grid-cols-[1.4fr_repeat(5,minmax(90px,1fr))] min-w-[700px] border-b border-border/40 transition-colors duration-150",
                row.isPipeline ? "opacity-50" : "hover:bg-muted/10"
              )}
            >
              <div className="p-4 flex flex-col justify-center">
                <span className="text-sm text-foreground/90 font-medium leading-snug">
                  {row.activity}
                </span>
                <span className="text-[11px] text-muted-foreground/70 mt-1 leading-relaxed">
                  {row.description}
                </span>
              </div>
              {row.statuses.map((status, colIdx) => (
                <div
                  key={`${row.activity}-${colIdx}`}
                  className={cn(
                    "p-4 flex items-center justify-center",
                    companies[colIdx].highlight &&
                      "bg-brand/[0.05] border-x border-brand/10"
                  )}
                >
                  <StatusIcon status={status} />
                </div>
              ))}
            </motion.div>
          </React.Fragment>
        ))}
      </motion.div>

      {/* Binance Footnote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center text-xs text-muted-foreground/60 leading-relaxed"
      >
        * Even Binance — the world&apos;s largest exchange — needs{" "}
        <span className="text-foreground/80 font-medium">
          3 separate entities
        </span>{" "}
        to cover just 4 of 6 activities. Aspen does it all{" "}
        <span className="text-brand font-medium">under one roof</span>.
      </motion.p>

      {/* Timeline Moat */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-20 rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm p-10 sm:p-12"
      >
        <h3 className="text-lg font-semibold text-white mb-3 text-center tracking-tight">
          A Head Start That Can&apos;t Be Bought
        </h3>
        <p className="text-sm text-muted-foreground/70 text-center mb-10 max-w-xl mx-auto leading-relaxed">
          ADGM requires 12 months of active licensing before any expansion.
          Aspen secured its Financial Services Permission in December 2024 —
          new entrants can&apos;t catch up until late 2027 at the earliest.
        </p>
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline bar */}
          <div className="h-1.5 bg-muted/60 rounded-full relative overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand to-brand/70 rounded-full"
            />
          </div>

          {/* Markers */}
          <div className="flex justify-between mt-5">
            <div className="text-center">
              <div className="w-2.5 h-2.5 rounded-full bg-brand mx-auto mb-2 shadow-[0_0_8px_rgba(241,126,0,0.4)]" />
              <p className="text-xs font-semibold text-brand">
                Dec 2024
              </p>
              <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                Aspen FSP Secured
              </p>
            </div>
            <div className="text-center">
              <div className="w-2.5 h-2.5 rounded-full bg-brand mx-auto mb-2 shadow-[0_0_8px_rgba(241,126,0,0.4)]" />
              <p className="text-xs font-semibold text-brand">
                Mid 2025
              </p>
              <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                Eligible for Expansion
              </p>
            </div>
            <div className="text-center">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/50 mx-auto mb-2" />
              <p className="text-xs font-semibold text-red-400/50">
                Late 2027+
              </p>
              <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                New Entrants Earliest
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
