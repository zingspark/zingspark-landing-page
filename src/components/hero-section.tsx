"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Icons } from "./icons";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const t = useTranslations("Hero");

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Multi-layer animated background */}
      <div className="pointer-events-none absolute inset-0 bg-background">
        {/* Grid pattern */}
        <div className="grid-pattern absolute inset-0 opacity-[0.3] dark:opacity-[0.15]" />

        {/* Gradient mesh */}
        <div className="gradient-mesh absolute inset-0" />

        {/* Rotating orbital rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 120,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[700px] w-[700px] md:h-[1100px] md:w-[1100px]"
        >
          <div className="absolute inset-0 rounded-full border border-primary/[0.07] dark:border-primary/[0.15]" />
          <div className="absolute inset-[15%] rounded-full border border-primary/[0.05] border-dashed dark:border-primary/[0.1]" />
          <div className="absolute inset-[30%] rounded-full border border-primary/[0.03] dark:border-primary/[0.08]" />
          {/* Orbital dots */}
          <div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 h-2 w-2 rounded-full bg-primary/30 shadow-[0_0_12px_4px] shadow-primary/20" />
          <div className="-translate-y-1/2 absolute top-1/2 right-0 h-1.5 w-1.5 translate-x-1/2 rounded-full bg-[#BD99FE]/40 shadow-[#BD99FE]/20 shadow-[0_0_10px_3px]" />
        </motion.div>

        {/* Counter-rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 180,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[500px] w-[500px] md:h-[800px] md:w-[800px]"
        >
          <div className="absolute inset-0 rounded-full border border-[#BD99FE]/[0.04] border-dashed dark:border-[#BD99FE]/[0.08]" />
          <div className="-translate-x-1/2 absolute bottom-0 left-1/2 h-1.5 w-1.5 translate-y-1/2 rounded-full bg-[#00B95C]/40 shadow-[#00B95C]/20 shadow-[0_0_10px_3px]" />
        </motion.div>

        {/* Glow orbs - larger and more vivid */}
        <div className="absolute top-[15%] left-[10%] h-72 w-72 animate-[glow-pulse_6s_ease-in-out_infinite] rounded-full bg-[#4893FC] opacity-[0.04] blur-[100px] md:h-[28rem] md:w-[28rem] dark:opacity-[0.08]" />
        <div className="absolute right-[10%] bottom-[15%] h-72 w-72 animate-[glow-pulse_8s_ease-in-out_infinite_1s] rounded-full bg-[#BD99FE] opacity-[0.04] blur-[100px] md:h-[28rem] md:w-[28rem] dark:opacity-[0.08]" />
        <div className="absolute top-[45%] right-[25%] h-56 w-56 animate-[glow-pulse_7s_ease-in-out_infinite_2s] rounded-full bg-[#00B95C] opacity-[0.03] blur-[80px] md:h-80 md:w-80 dark:opacity-[0.06]" />
        <div className="absolute bottom-[30%] left-[30%] h-48 w-48 animate-[glow-pulse_9s_ease-in-out_infinite_3s] rounded-full bg-[#FC413D] opacity-[0.02] blur-[70px] md:h-64 md:w-64 dark:opacity-[0.04]" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="container relative z-10 pt-32 pb-20 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-4 py-1.5 backdrop-blur-sm"
        >
          <div className="h-1 w-1 rounded-full bg-[#00B95C]" />
          <span className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
            Frontier AI Lab
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="mx-auto mb-10 md:mb-14"
        >
          <div className="relative inline-block">
            <div className="pointer-events-none absolute inset-0 scale-[2] bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-20 blur-3xl dark:opacity-35" />
            <Image
              src="/images/logo/zingspark_Icon_FullColor.svg"
              alt="Zingspark"
              width={96}
              height={96}
              className="relative h-20 w-20 drop-shadow-[0_0_30px_oklch(0.62_0.18_255_/_0.3)] md:h-24 md:w-24"
              priority
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="font-bold text-5xl leading-[1.05] tracking-tighter md:text-7xl lg:text-8xl"
        >
          <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent">
            {t("line1")}
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#4893FC] via-[#969DFF] to-[#BD99FE] bg-clip-text text-transparent drop-shadow-[0_0_40px_oklch(0.62_0.18_255_/_0.2)]">
            {t("line2")}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed md:mt-8 md:text-lg"
        >
          {t("description")}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-12"
        >
          <a
            href="#join"
            className="shimmer inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#4893FC] via-[#7B93FF] to-[#BD99FE] px-8 py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/35 hover:shadow-xl active:scale-100"
          >
            {t("cta")}
            <Icons.send className="h-4 w-4" />
          </a>
          <a
            href="#vision"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-6 py-3 font-medium text-muted-foreground text-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/80 hover:text-foreground"
          >
            {t("scrollDown")}
            <Icons.chevronDown className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Company name tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-20 flex items-center justify-center gap-3 text-muted-foreground/50 md:mt-24"
        >
          <Icons.logo className="h-5 w-5" />
          <span className="font-medium text-xs uppercase tracking-[0.2em]">
            Zingspark.tech
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="-translate-x-1/2 absolute bottom-8 left-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="flex h-8 w-5 items-start justify-center rounded-full border border-muted-foreground/30 p-1"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50"
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient transition to Vision section */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-b from-transparent to-background md:h-48"
        aria-hidden="true"
      />
    </section>
  );
}
