"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const capabilityKeys = ["framework", "hardware", "global"] as const;

const capabilityIcons = {
  framework: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  hardware: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  ),
  global: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
} as const;

const capabilityColors = {
  framework: {
    gradient: "from-[#4893FC] to-[#7B93FF]",
    glow: "#4893FC",
    barFrom: "#a3c8fe",
    barTo: "#4893FC",
  },
  hardware: {
    gradient: "from-[#00B95C] to-[#4893FC]",
    glow: "#00B95C",
    barFrom: "#66e0a3",
    barTo: "#00B95C",
  },
  global: {
    gradient: "from-[#BD99FE] to-[#969DFF]",
    glow: "#BD99FE",
    barFrom: "#dcc5ff",
    barTo: "#BD99FE",
  },
} as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export function CapabilitySection() {
  const t = useTranslations("Capabilities");

  return (
    <section
      id="capabilities"
      className="relative overflow-hidden py-28 md:py-36"
    >
      {/* Subtle grid */}
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-[0.15] dark:opacity-[0.08]" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 text-center md:mb-20"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-4 py-1.5 backdrop-blur-sm">
            <div className="h-1 w-1 rounded-full bg-[#00B95C]" />
            <span className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
              What We Do
            </span>
          </div>
          <h2 className="font-bold text-4xl tracking-tighter md:text-6xl">
            {t("title")}
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
        >
          {/* Connection lines between cards — desktop only */}
          <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
            {/* Line from card 1 to card 2 */}
            <div
              className="absolute top-1/2 left-[33.33%] h-px w-[calc(33.33%-2rem)]"
              style={{
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(90deg, transparent, #4893FC40 30%, #969DFF40 70%, transparent)",
              }}
            />
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-[33.33%] h-1.5 w-1.5 rounded-full border-[#969DFF30] border-[3px]" />
            {/* Line from card 2 to card 3 */}
            <div
              className="absolute top-1/2 left-[66.66%] h-px w-[calc(33.33%-2rem)]"
              style={{
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(90deg, transparent, #969DFF40 30%, #BD99FE40 70%, transparent)",
              }}
            />
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-[66.66%] h-1.5 w-1.5 rounded-full border-[#969DFF30] border-[3px]" />
          </div>
          {capabilityKeys.map((key) => {
            const colors = capabilityColors[key];
            return (
              <motion.div
                key={key}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-8 backdrop-blur-sm transition-[border-color,box-shadow] duration-200 hover:shadow-2xl md:p-10 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(255,255,255,0.03)]"
                style={{
                  // @ts-expect-error -- CSS custom property for hover glow color
                  "--card-glow": colors.glow,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${colors.glow}60`;
                  e.currentTarget.style.boxShadow = `0 25px 50px -12px rgba(0,0,0,0.25), 0 0 30px ${colors.glow}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                {/* Top gradient accent bar */}
                <div
                  className="pointer-events-none absolute top-0 right-0 left-0 h-[3px]"
                  style={{
                    background: `linear-gradient(to right, ${colors.barFrom}, ${colors.barTo})`,
                  }}
                />

                {/* Hover glow */}
                <div
                  className="-top-20 -right-20 pointer-events-none absolute h-40 w-40 rounded-full opacity-0 blur-[60px] transition-opacity duration-200 group-hover:opacity-100"
                  style={{ backgroundColor: `${colors.glow}25` }}
                />

                {/* Icon with background glow */}
                <div className="relative mb-6 inline-flex">
                  {/* Pulsing glow behind icon */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-xl blur-lg"
                    style={{
                      backgroundColor: `${colors.glow}30`,
                      animation: "pulse-glow 3s ease-in-out infinite",
                    }}
                  />
                  <div
                    className={`relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${colors.gradient} p-3 text-white shadow-lg`}
                    style={{ boxShadow: `0 8px 30px ${colors.glow}25` }}
                  >
                    {capabilityIcons[key]}
                  </div>
                </div>

                <h3 className="mb-3 font-semibold text-foreground text-xl md:text-2xl">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                  {t(`items.${key}.description`)}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r ${colors.gradient} opacity-0 transition-opacity duration-200 group-hover:opacity-40`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Capability → University section divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0"
      >
        <div className="section-divider section-divider-glow" />
      </div>
    </section>
  );
}
