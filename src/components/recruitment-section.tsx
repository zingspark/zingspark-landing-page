"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { siteConfig } from "@/config/site-config";
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
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      },
    [],
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ jobTitle: string }>;
      setFormData((prev) => ({
        ...prev,
        interest: customEvent.detail.jobTitle,
      }));
    };
    window.addEventListener("job-selected", handler);
    return () => window.removeEventListener("job-selected", handler);
  }, []);

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
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    },
    [formData],
  );

  const inputClass =
    "w-full rounded-xl border border-border/50 bg-background/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 backdrop-blur-sm transition-all duration-200 focus:border-transparent focus:bg-background/80 focus:outline-none focus:shadow-lg focus:shadow-primary/5";

  const inputWrapperClass = "gradient-border-focus rounded-xl";

  return (
    <section id="join" className="relative py-28 md:py-36">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--primary)_0%,transparent_60%)] opacity-[0.04] dark:opacity-[0.08]" />
        <div className="grid-pattern absolute inset-0 opacity-[0.1] dark:opacity-[0.05]" />
        {/* Decorative dot pattern background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--primary) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center md:mb-18"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/40 px-4 py-1.5 backdrop-blur-sm">
            <div className="h-1 w-1 rounded-full bg-primary" />
            <span className="font-medium text-muted-foreground text-xs uppercase tracking-widest">
              Apply Now
            </span>
          </div>
          <h2 className="font-bold text-4xl tracking-tighter md:text-6xl">
            <span className="bg-gradient-to-r from-[#4893FC] via-[#969DFF] to-[#BD99FE] bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            {t("subtitle")}
          </p>
          <p className="mt-2 font-medium text-primary/70 text-sm">
            {t("note")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-2xl"
        >
          <div className="glass-card-enhanced relative overflow-hidden rounded-2xl p-8 shadow-2xl shadow-primary/[0.03] md:p-12">
            {/* Decorative gradient overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.04] via-transparent to-[#BD99FE]/[0.04]" />
            {/* Top accent line */}
            <div className="pointer-events-none absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            {/* Bottom accent line */}
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#BD99FE]/20 to-transparent" />
            {/* Corner glow accents */}
            <div className="pointer-events-none absolute top-0 left-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,oklch(0.62_0.18_255/0.06)_0%,transparent_70%)]" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,oklch(0.68_0.17_290/0.06)_0%,transparent_70%)]" />

            <form onSubmit={handleSubmit} className="relative space-y-6">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-medium text-sm"
                  >
                    {t("name")}
                  </label>
                  <div className={inputWrapperClass}>
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
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-medium text-sm"
                  >
                    {t("email")}
                  </label>
                  <div className={inputWrapperClass}>
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
              </div>

              {/* Phone + School row */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block font-medium text-sm"
                  >
                    {t("phone")}
                  </label>
                  <div className={inputWrapperClass}>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={updateField("phone")}
                      className={inputClass}
                      placeholder={t("phone")}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="school"
                    className="mb-2 block font-medium text-sm"
                  >
                    {t("school")}
                  </label>
                  <div className={inputWrapperClass}>
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
              </div>

              {/* Education + Interest row */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="education"
                    className="mb-2 block font-medium text-sm"
                  >
                    {t("education")}
                  </label>
                  <div className={inputWrapperClass}>
                    <select
                      id="education"
                      value={formData.education}
                      onChange={updateField("education")}
                      className={inputClass}
                    >
                      <option value="">{t("selectDegree")}</option>
                      <option value="bachelor">
                        {t("educationOptions.bachelor")}
                      </option>
                      <option value="master">
                        {t("educationOptions.master")}
                      </option>
                      <option value="phd">{t("educationOptions.phd")}</option>
                      <option value="other">
                        {t("educationOptions.other")}
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="interest"
                    className="mb-2 block font-medium text-sm"
                  >
                    {t("interest")}
                  </label>
                  <div className={inputWrapperClass}>
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
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-medium text-sm"
                >
                  {t("message")}
                </label>
                <div className={inputWrapperClass}>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={updateField("message")}
                    className={`${inputClass} resize-none`}
                    placeholder={t("messagePlaceholder")}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group shimmer flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[length:200%_100%] bg-gradient-to-r bg-left from-[#4893FC] via-[#7B93FF] to-[#BD99FE] px-6 py-4 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-right hover:shadow-primary/30 hover:shadow-xl hover:brightness-110 active:scale-[0.98]"
              >
                <Icons.send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:scale-110" />
                {t("submit")}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Recruitment → Footer section divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0"
      >
        <div className="section-divider section-divider-glow" />
      </div>
    </section>
  );
}
