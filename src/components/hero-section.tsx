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
      {/* Animated background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.08] dark:opacity-[0.15]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 120,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[800px] w-[800px] md:h-[1200px] md:w-[1200px]"
        >
          <div className="absolute inset-0 rounded-full border border-primary/10 dark:border-primary/20" />
          <div className="absolute inset-[15%] rounded-full border border-primary/5 border-dashed dark:border-primary/10" />
          <div className="absolute inset-[30%] rounded-full border border-primary/5 dark:border-primary/10" />
        </motion.div>
        {/* Glow orbs */}
        <div className="absolute top-[20%] left-[15%] h-64 w-64 animate-[glow-pulse_6s_ease-in-out_infinite] rounded-full bg-[#4893FC] opacity-[0.03] blur-[80px] md:h-96 md:w-96 dark:opacity-[0.06]" />
        <div className="absolute right-[15%] bottom-[20%] h-64 w-64 animate-[glow-pulse_8s_ease-in-out_infinite_1s] rounded-full bg-[#BD99FE] opacity-[0.03] blur-[80px] md:h-96 md:w-96 dark:opacity-[0.06]" />
        <div className="absolute top-[50%] right-[30%] h-48 w-48 animate-[glow-pulse_7s_ease-in-out_infinite_2s] rounded-full bg-[#00B95C] opacity-[0.02] blur-[60px] md:h-72 md:w-72 dark:opacity-[0.04]" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="container relative z-10 pt-32 pb-20 text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-8 md:mb-12"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 scale-150 bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-20 blur-2xl dark:opacity-30" />
            <Image
              src="/images/logo/zingspark_Icon_FullColor.svg"
              alt="Zingspark"
              width={80}
              height={80}
              className="relative h-16 w-16 md:h-20 md:w-20"
              priority
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-bold text-5xl leading-[1.05] tracking-tighter md:text-7xl lg:text-8xl"
        >
          <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            {t("line1")}
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#4893FC] via-[#969DFF] to-[#BD99FE] bg-clip-text text-transparent">
            {t("line2")}
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground leading-relaxed md:mt-8 md:text-lg"
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
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4893FC] via-[#7B93FF] to-[#BD99FE] px-8 py-3 font-medium text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/30 hover:shadow-xl active:scale-100"
          >
            {t("cta")}
            <Icons.send className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Company name tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-3 text-muted-foreground/60 md:mt-20"
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
        <a
          href="#vision"
          className="flex flex-col items-center gap-2 text-muted-foreground/50 transition-colors hover:text-muted-foreground"
        >
          <span className="text-xs tracking-wider">{t("scrollDown")}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Icons.chevronDown className="h-5 w-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
