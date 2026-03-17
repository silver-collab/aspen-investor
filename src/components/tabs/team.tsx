"use client";

import { motion } from "framer-motion";
import React from "react";

interface TeamMember {
  name: string;
  role: string;
  bio: React.ReactNode;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Elliot Andrews",
    role: "Chief Executive Officer",
    bio: (
      <>
        <strong className="text-foreground/90">CFA charterholder</strong> with 15+
        years in financial technology and digital assets. Former{" "}
        <strong className="text-foreground/90">
          Head of Asia Pacific at Dealogic
        </strong>
        , serving investment banks and institutional investors. Holds Law and
        Finance degrees from the University of Canterbury.
      </>
    ),
    image: "/team/elliot.jpg",
  },
  {
    name: "Ruby Cheng",
    role: "Chief Controlling Officer",
    bio: (
      <>
        Co-Founder of{" "}
        <strong className="text-foreground/90">Everest Ventures Group</strong>,
        Aspen Digital&apos;s parent company. Previously led Product Strategy at
        Guru Online (Focus Media-backed) and served as{" "}
        <strong className="text-foreground/90">
          APAC Corporate Marketing Manager at Equinix
        </strong>
        .
      </>
    ),
    image: "/team/ruby.jpg",
  },
  {
    name: "Shu Duan",
    role: "Chief Technology Officer",
    bio: (
      <>
        Former{" "}
        <strong className="text-foreground/90">
          Director of Investment Banking at Credit Suisse
        </strong>
        , with experience structuring and executing{" "}
        <strong className="text-foreground/90">$30B+</strong> in credit financing
        transactions. Previously held roles at BNP Paribas, Standard Chartered,
        and Deutsche Bank.
      </>
    ),
    image: "/team/shu.jpg",
  },
  {
    name: "Mitchell Waters",
    role: "Chief Operating Officer",
    bio: (
      <>
        <strong className="text-foreground/90">20+ years</strong> in investment
        operations and alternative asset management. Former{" "}
        <strong className="text-foreground/90">
          Deputy Head of Operations at Abu Dhabi Investment Authority (ADIA)
        </strong>
        . Previously held senior roles at Duet Group and Cheyne Capital.
      </>
    ),
    image: "/team/mitchell.jpg",
  },
  {
    name: "Arthur Chan",
    role: "General Counsel",
    bio: (
      <>
        Extensive legal experience across crypto, fintech, and Web3. Previously{" "}
        <strong className="text-foreground/90">General Counsel at Adaverse</strong>,
        VP of Legal at Cassava, and Head of Legal at Kikitrade. Juris Doctor from{" "}
        <strong className="text-foreground/90">CUHK</strong>.
      </>
    ),
    image: "/team/arthur.jpg",
  },
  {
    name: "Mohammed Klai",
    role: "Compliance Officer / MLRO",
    bio: (
      <>
        Former{" "}
        <strong className="text-foreground/90">
          Senior Analyst at the Central Bank of Bahrain
        </strong>{" "}
        in Licensing of Banks & Banking Supervision. Specialist in regulatory
        requirements and AML/compliance frameworks across MENA.
      </>
    ),
    image: "/team/mohammed.jpg",
  },
  {
    name: "Kenneth Wong",
    role: "Finance Officer",
    bio: (
      <>
        Concurrently serves as{" "}
        <strong className="text-foreground/90">
          Head of Finance at Everest Ventures Group
        </strong>
        , overseeing financial operations across one of APAC&apos;s largest Web3
        product-building groups with 200+ engineers.
      </>
    ),
    image: "/team/kenneth.jpg",
  },
  {
    name: "Sardar Ahmed Durrani",
    role: "Independent Director",
    bio: (
      <>
        Partner at <strong className="text-foreground/90">The Osiris Group</strong>,
        leading tech and digital assets across MENAP. Former{" "}
        <strong className="text-foreground/90">
          Deutsche Bank Hong Kong — Investment Banking Coverage & Advisory
        </strong>
        . Previously held roles at RBS and ABN Amro across Asia and the Gulf.
      </>
    ),
    image: "/team/sardar.jpg",
  },
  {
    name: "John Bond",
    role: "Independent Director",
    bio: (
      <>
        <strong className="text-foreground/90">25+ years</strong> in financial
        services. Founder of{" "}
        <strong className="text-foreground/90">TTB Partners</strong>, a
        co-founding investor of Aspen Digital. Started career at{" "}
        <strong className="text-foreground/90">Merrill Lynch</strong> before
        managing two hedge funds as Partner and MD.
      </>
    ),
    image: "/team/john.jpg",
  },
];

const cardVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.06,
    },
  }),
};

function TeamCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={cardVariants}
      whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
      className="rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm overflow-hidden hover:border-brand/20 hover:shadow-lg hover:shadow-brand/[0.03] transition-[border-color,box-shadow] duration-300"
    >
      {/* Photo placeholder */}
      <div className="aspect-[5/3] relative overflow-hidden bg-muted/40">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-brand/8 border border-brand/15 flex items-center justify-center">
            <span className="text-2xl font-semibold text-brand/40 tracking-tight">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 sm:p-6">
        <h3 className="text-base font-semibold text-foreground tracking-tight">
          {member.name}
        </h3>
        <p className="text-[13px] text-brand/70 font-medium mt-1">{member.role}</p>
        <p className="text-[13px] text-muted-foreground/60 mt-4 leading-relaxed">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}

export function Team() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white mb-4">
          Leadership Team
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          The team that built Asia&apos;s deepest institutional network — now
          bringing it to Bullish.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {teamMembers.map((member, index) => (
          <TeamCard key={member.name} member={member} index={index} />
        ))}
      </div>
    </div>
  );
}
