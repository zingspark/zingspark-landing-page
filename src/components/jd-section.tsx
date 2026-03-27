"use client";

import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { siteConfig } from "@/config/site-config";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
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
    <section id="jobs" className="relative overflow-hidden py-24 md:py-32">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 text-center md:mb-16"
        >
          <h2 className="mb-4 font-bold text-3xl tracking-tight md:text-5xl">
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
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {siteConfig.jobs.map((job) => (
            <motion.button
              key={job.key}
              type="button"
              variants={cardVariants}
              onClick={() => handleCardClick(job)}
              className={`cursor-pointer rounded-xl border p-5 text-left transition-colors md:p-6 ${
                selected === job.key
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent"
              }`}
            >
              <span className="font-semibold text-base md:text-lg">
                {job.name[locale as "zh" | "en"]}
              </span>
            </motion.button>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center text-muted-foreground text-sm"
        >
          {t("clickHint")}
        </motion.p>
      </div>
    </section>
  );
}
