"use client";

import { useTranslations } from "next-intl";
import { type FormEvent, useCallback, useState } from "react";
import { motion } from "motion/react";
import { Icons } from "./icons";

export function RecruitmentSection() {
  const t = useTranslations("Recruitment");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    education: "",
    interest: "",
    message: "",
  });

  const updateField = useCallback(
    (field: string) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      },
    [],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const subject = encodeURIComponent(
        `[Zingspark Application] ${formData.name} — ${formData.school}`,
      );
      const body = encodeURIComponent(
        [
          `Name: ${formData.name}`,
          `Email: ${formData.email}`,
          `Phone: ${formData.phone}`,
          `School: ${formData.school}`,
          `Education: ${formData.education}`,
          `Interest: ${formData.interest}`,
          `Message: ${formData.message}`,
        ].join("\n"),
      );
      window.location.href = `mailto:zingsparktech@gmail.com?subject=${subject}&body=${body}`;
    },
    [formData],
  );

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <section id="join" className="relative py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--primary)_0%,transparent_60%)] opacity-[0.04] dark:opacity-[0.08]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4893FC] via-[#969DFF] to-[#BD99FE]">
              {t("title")}
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            {t("subtitle")}
          </p>
          <p className="mt-2 text-sm text-primary/80 font-medium">{t("note")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-2xl"
        >
          <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-10 shadow-xl shadow-primary/[0.03]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

            <form onSubmit={handleSubmit} className="relative space-y-5">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                    {t("name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={updateField("name")}
                    className={inputClass}
                    placeholder={t("name")}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                    {t("email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={updateField("email")}
                    className={inputClass}
                    placeholder={t("email")}
                  />
                </div>
              </div>

              {/* Phone + School row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
                    {t("phone")}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={updateField("phone")}
                    className={inputClass}
                    placeholder={t("phone")}
                  />
                </div>
                <div>
                  <label htmlFor="school" className="mb-1.5 block text-sm font-medium">
                    {t("school")}
                  </label>
                  <input
                    id="school"
                    type="text"
                    value={formData.school}
                    onChange={updateField("school")}
                    className={inputClass}
                    placeholder={t("school")}
                  />
                </div>
              </div>

              {/* Education + Interest row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="education" className="mb-1.5 block text-sm font-medium">
                    {t("education")}
                  </label>
                  <select
                    id="education"
                    value={formData.education}
                    onChange={updateField("education")}
                    className={inputClass}
                  >
                    <option value="">{t("selectDegree")}</option>
                    <option value="bachelor">{t("educationOptions.bachelor")}</option>
                    <option value="master">{t("educationOptions.master")}</option>
                    <option value="phd">{t("educationOptions.phd")}</option>
                    <option value="other">{t("educationOptions.other")}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="interest" className="mb-1.5 block text-sm font-medium">
                    {t("interest")}
                  </label>
                  <input
                    id="interest"
                    type="text"
                    value={formData.interest}
                    onChange={updateField("interest")}
                    className={inputClass}
                    placeholder={t("interestPlaceholder")}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  {t("message")}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={updateField("message")}
                  className={`${inputClass} resize-none`}
                  placeholder={t("messagePlaceholder")}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#4893FC] via-[#7B93FF] to-[#BD99FE] px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 active:scale-[0.98] cursor-pointer"
              >
                <Icons.send className="w-4 h-4" />
                {t("submit")}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
