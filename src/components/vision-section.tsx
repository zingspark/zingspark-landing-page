"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function VisionSection() {
  const t = useTranslations("Vision");

  return (
    <section id="vision" className="relative overflow-hidden py-20 md:py-32">
      {/* Aurora background */}
      <div className="aurora-bg pointer-events-none absolute inset-0" />

      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-[10%] h-px w-32 bg-gradient-to-r from-transparent via-primary/20 to-transparent md:w-64" />
        <div className="absolute right-[10%] bottom-1/3 h-px w-32 bg-gradient-to-r from-transparent via-[#BD99FE]/20 to-transparent md:w-64" />
        <div className="absolute top-[20%] right-[20%] h-32 w-32 rounded-full bg-primary/[0.08] blur-[60px] dark:bg-primary/[0.06]" />
        <div className="absolute bottom-[20%] left-[20%] h-32 w-32 rounded-full bg-[#BD99FE]/[0.08] blur-[60px] dark:bg-[#BD99FE]/[0.06]" />
      </div>

      {/* Decorative geometric arcs & lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
      >
        {/* Top-left curved arc */}
        <div
          className="absolute top-[10%] left-[5%] h-48 w-48 rounded-full border border-primary/[0.15] dark:border-primary/[0.12]"
          style={{
            borderRightColor: "transparent",
            borderBottomColor: "transparent",
            transform: "rotate(-30deg)",
          }}
        />
        {/* Bottom-right curved arc */}
        <div
          className="absolute right-[5%] bottom-[10%] h-56 w-56 rounded-full border border-[#BD99FE]/[0.15] dark:border-[#BD99FE]/[0.12]"
          style={{
            borderLeftColor: "transparent",
            borderTopColor: "transparent",
            transform: "rotate(15deg)",
          }}
        />
        {/* Diagonal accent line — top right */}
        <div
          className="absolute top-[15%] right-[8%] h-px w-40 bg-gradient-to-r from-transparent via-[#969DFF]/25 to-transparent"
          style={{ transform: "rotate(-25deg)" }}
        />
        {/* Diagonal accent line — bottom left */}
        <div
          className="absolute bottom-[15%] left-[8%] h-px w-40 bg-gradient-to-r from-transparent via-primary/25 to-transparent"
          style={{ transform: "rotate(25deg)" }}
        />
        {/* Small arc near content center-left */}
        <div
          className="absolute top-[45%] left-[3%] h-24 w-24 rounded-full border border-[#969DFF]/[0.12] dark:border-[#969DFF]/[0.10]"
          style={{
            borderRightColor: "transparent",
            borderTopColor: "transparent",
            transform: "rotate(45deg)",
          }}
        />
      </div>

      {/* Floating particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block"
      >
        <div
          className="absolute top-[15%] left-[12%] h-[3px] w-[3px] rounded-full bg-[#4893FC]/60"
          style={{ animation: "float-particle 4s ease-in-out infinite" }}
        />
        <div
          className="absolute top-[30%] right-[15%] h-[2px] w-[2px] rounded-full bg-[#969DFF]/50"
          style={{
            animation: "float-particle 5s ease-in-out infinite",
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute bottom-[25%] left-[25%] h-[4px] w-[4px] rounded-full bg-[#BD99FE]/50"
          style={{
            animation: "float-particle 6s ease-in-out infinite",
            animationDelay: "2s",
          }}
        />
        <div
          className="absolute top-[60%] right-[22%] h-[2px] w-[2px] rounded-full bg-[#4893FC]/40"
          style={{
            animation: "float-particle 4.5s ease-in-out infinite",
            animationDelay: "0.5s",
          }}
        />
        <div
          className="absolute top-[45%] left-[8%] h-[3px] w-[3px] rounded-full bg-[#969DFF]/40"
          style={{
            animation: "float-particle 5.5s ease-in-out infinite",
            animationDelay: "3s",
          }}
        />
        <div
          className="absolute right-[10%] bottom-[35%] h-[3px] w-[3px] rounded-full bg-[#BD99FE]/60"
          style={{
            animation: "float-particle 4s ease-in-out infinite",
            animationDelay: "1.5s",
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-4 py-1.5 backdrop-blur-sm"
          >
            <div className="h-1 w-1 rounded-full bg-primary" />
            <span className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
              Our Vision
            </span>
          </motion.div>

          {/* Tagline */}
          <h2 className="font-bold text-4xl leading-tight tracking-tighter md:text-6xl">
            <span
              className="bg-gradient-to-r from-[#4893FC] via-[#969DFF] to-[#BD99FE] bg-clip-text text-transparent"
              style={{
                filter:
                  "drop-shadow(0 0 40px rgba(150, 157, 255, 0.45)) drop-shadow(0 0 80px rgba(72, 147, 252, 0.25))",
              }}
            >
              {t("tagline")}
            </span>
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-5 font-medium text-foreground/80 text-xl tracking-tight md:mt-8 md:text-3xl"
          >
            {t("subtitle")}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent md:w-32"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground leading-relaxed md:text-lg"
          >
            {t("description")}
          </motion.p>
        </motion.div>
      </div>

      {/* Vision → Capability section divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0"
      >
        <div className="section-divider section-divider-glow" />
      </div>
    </section>
  );
}
