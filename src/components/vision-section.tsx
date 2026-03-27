"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function VisionSection() {
  const t = useTranslations("Vision");

  return (
    <section id="vision" className="relative overflow-hidden py-24 md:py-32">
      {/* Subtle background accent */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary)_0%,transparent_60%)] opacity-[0.04] dark:opacity-[0.08]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Tagline */}
          <h2 className="font-bold text-3xl leading-tight tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-[#4893FC] via-[#969DFF] to-[#BD99FE] bg-clip-text text-transparent">
              {t("tagline")}
            </span>
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-4 font-medium text-foreground/80 text-lg tracking-tight md:mt-6 md:text-2xl"
          >
            {t("subtitle")}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-6 text-base text-muted-foreground leading-relaxed md:mt-8 md:text-lg"
          >
            {t("description")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
