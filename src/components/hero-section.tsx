"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
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
      {/* Animated background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.08] dark:opacity-[0.15]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px]"
        >
          <div className="absolute inset-0 rounded-full border border-primary/10 dark:border-primary/20" />
          <div className="absolute inset-[15%] rounded-full border border-primary/5 dark:border-primary/10 border-dashed" />
          <div className="absolute inset-[30%] rounded-full border border-primary/5 dark:border-primary/10" />
        </motion.div>
        {/* Glow orbs */}
        <div className="absolute top-[20%] left-[15%] w-64 h-64 md:w-96 md:h-96 rounded-full bg-[#4893FC] opacity-[0.03] dark:opacity-[0.06] blur-[80px] animate-[glow-pulse_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-[20%] right-[15%] w-64 h-64 md:w-96 md:h-96 rounded-full bg-[#BD99FE] opacity-[0.03] dark:opacity-[0.06] blur-[80px] animate-[glow-pulse_8s_ease-in-out_infinite_1s]" />
        <div className="absolute top-[50%] right-[30%] w-48 h-48 md:w-72 md:h-72 rounded-full bg-[#00B95C] opacity-[0.02] dark:opacity-[0.04] blur-[60px] animate-[glow-pulse_7s_ease-in-out_infinite_2s]" />
      </div>

      {/* Content */}
      <motion.div style={{ opacity, scale, y }} className="container relative z-10 pt-32 pb-20 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-8 md:mb-12"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 scale-150 bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-20 dark:opacity-30 blur-2xl" />
            <Image
              src="/images/logo/zingspark_Icon_FullColor.svg"
              alt="Zingspark"
              width={80}
              height={80}
              className="relative w-16 h-16 md:w-20 md:h-20"
              priority
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[1.05]"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/70">
            {t("line1")}
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4893FC] via-[#969DFF] to-[#BD99FE]">
            {t("line2")}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 md:mt-8 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          {t("description")}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 md:mt-10"
        >
          <a
            href="#join"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4893FC] via-[#7B93FF] to-[#BD99FE] px-8 py-3 font-medium text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-100"
          >
            {t("cta")}
            <Icons.send className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Company name tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-20 flex items-center justify-center gap-3 text-muted-foreground/60"
        >
          <Icons.logo className="w-5 h-5" />
          <span className="text-xs tracking-[0.2em] uppercase font-medium">
            Zingspark.tech
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#team" className="flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors">
          <span className="text-xs tracking-wider">{t("scrollDown")}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Icons.chevronDown className="w-5 h-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
