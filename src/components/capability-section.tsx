"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const capabilityKeys = ["framework", "hardware", "global"] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function CapabilitySection() {
  const t = useTranslations("Capabilities");

  return (
    <section
      id="capabilities"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="container relative z-10">
        {/* Section title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 text-center font-bold text-3xl tracking-tight md:mb-16 md:text-5xl"
        >
          {t("title")}
        </motion.h2>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
        >
          {capabilityKeys.map((key) => (
            <motion.div
              key={key}
              variants={cardVariants}
              className="rounded-xl border border-border bg-card p-6 md:p-8"
            >
              <h3 className="mb-3 font-semibold text-foreground text-lg md:text-xl">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                {t(`items.${key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
