"use client";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { useState } from "react";
import {
  AgentIcon,
  ArchitectIcon,
  BrainIcon,
  ChipIcon,
  ClipboardIcon,
  GlobeIcon,
  PaletteIcon,
  SearchIcon,
  UsersIcon,
} from "@/components/icons";
import { siteConfig } from "@/config/site-config";

export const jobIcons: Record<string, ReactNode> = {
  "agent-dev": <AgentIcon />,
  algorithm: <BrainIcon />,
  architect: <ArchitectIcon />,
  hardware: <ChipIcon />,
  qa: <SearchIcon />,
  pr: <GlobeIcon />,
  pm: <ClipboardIcon />,
  hr: <UsersIcon />,
  design: <PaletteIcon />,
};

/* Unique gradient accents per job card for visual differentiation */
const jobGradients: Record<string, string> = {
  "agent-dev": "from-[#4893FC] to-[#969DFF]",
  algorithm: "from-[#BD99FE] to-[#969DFF]",
  architect: "from-[#4893FC] to-[#00B95C]",
  hardware: "from-[#00B95C] to-[#4893FC]",
  qa: "from-[#969DFF] to-[#4893FC]",
  pr: "from-[#4893FC] to-[#BD99FE]",
  pm: "from-[#BD99FE] to-[#4893FC]",
  hr: "from-[#FC413D] to-[#BD99FE]",
  design: "from-[#969DFF] to-[#BD99FE]",
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function JDSection() {
  const t = useTranslations("Jobs");
  const locale = useLocale();
  const [selected, setSelected] = useState<string | null>(null);

  const handleCardClick = (job: (typeof siteConfig.jobs)[number]) => {
    const jobTitle = job.name[locale as "zh" | "en"];
    setSelected(job.key);
    window.dispatchEvent(
      new CustomEvent("job-selected", { detail: { jobTitle } }),
    );
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="jobs" className="relative overflow-hidden py-28 md:py-36">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.03] dark:opacity-[0.06]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 text-center md:mb-18"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-4 py-1.5 backdrop-blur-sm">
            <div className="h-1 w-1 rounded-full bg-[#FC413D]" />
            <span className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
              Careers
            </span>
          </div>
          <h2 className="mb-4 font-bold text-4xl tracking-tighter md:text-6xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {siteConfig.jobs.map((job) => {
            const isSelected = selected === job.key;
            return (
              <motion.button
                key={job.key}
                type="button"
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(job)}
                className={`group relative cursor-pointer overflow-hidden rounded-xl border p-5 text-left transition-all duration-200 md:p-6 ${
                  isSelected
                    ? "border-transparent bg-primary/10 shadow-lg shadow-primary/15"
                    : "border-border/70 bg-card/60 shadow-sm backdrop-blur-sm hover:border-primary/40 hover:bg-card/90 hover:shadow-[0_8px_30px_rgba(72,147,252,0.15)] dark:border-border/50 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/10"
                }`}
              >
                {/* Animated gradient border for selected state */}
                {isSelected && (
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    style={{
                      padding: "1px",
                      background:
                        "linear-gradient(135deg, #4893FC, #969DFF, #BD99FE, #4893FC)",
                      backgroundSize: "300% 300%",
                      animation: "aurora 4s ease infinite",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                    }}
                  />
                )}

                {/* Pulse glow for selected state */}
                {isSelected && (
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    style={{
                      boxShadow:
                        "0 0 20px 4px oklch(0.62 0.18 255 / 0.2), 0 0 40px 8px oklch(0.68 0.17 290 / 0.1)",
                      animation: "pulse-glow 2.5s ease-in-out infinite",
                    }}
                  />
                )}

                {/* Gradient corner accent */}
                <div
                  className={`pointer-events-none absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl ${jobGradients[job.key] ?? "from-[#4893FC] to-[#969DFF]"} rounded-bl-2xl transition-opacity duration-200 ${isSelected ? "opacity-25" : "opacity-10 group-hover:opacity-25"}`}
                />

                {/* Hover glow — enhanced */}
                <div className="-top-10 -right-10 pointer-events-none absolute h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-[40px] transition-opacity duration-200 group-hover:opacity-100" />

                <div className="relative flex items-center gap-4">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center text-primary transition-transform duration-200 group-hover:rotate-3 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    {jobIcons[job.key] ?? <ClipboardIcon />}
                  </span>
                  <div>
                    <span className="font-semibold text-base md:text-lg">
                      {job.name[locale as "zh" | "en"]}
                    </span>
                  </div>
                </div>

                {/* Selected indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="job-selected-indicator"
                    className="absolute right-4 bottom-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="h-3.5 w-3.5"
                    >
                      <path
                        d="M5 12l5 5L20 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center text-muted-foreground/60 text-sm"
        >
          {t("clickHint")}
        </motion.p>
      </div>

      {/* JD → Recruitment visual guide divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 flex flex-col items-center"
      >
        <div className="section-divider section-divider-glow" />
        {/* Downward chevron hint */}
        <svg
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          className="mt-2 opacity-30 dark:opacity-50"
        >
          <path
            d="M2 2L10 10L18 2"
            stroke="url(#jd-chevron-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="jd-chevron-grad" x1="2" y1="2" x2="18" y2="2">
              <stop stopColor="#4893FC" />
              <stop offset="0.5" stopColor="#969DFF" />
              <stop offset="1" stopColor="#BD99FE" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
