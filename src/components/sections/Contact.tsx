"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Plus } from "lucide-react";
import { siteConfig, activeSocials } from "@/config/site";
import { SOCIAL_ICONS, SOCIAL_BRAND_COLORS } from "@/components/ui/SocialIcons";

const SERVICES = [
  "Thumbnails & Social Graphics",
  "Video Editing & Reels",
  "Brand Identity & Print",
  "Websites & Web Apps",
];

const SUBJECTS = [
  "UI/UX Design",
  "Frontend Development",
  "Fullstack Development",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot — must stay empty. */
  company: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildMailto(form: FormState): string {
  const subject = `Portfolio enquiry${form.subject ? ` — ${form.subject}` : ""} from ${form.name}`;
  const body = `Name: ${form.name}\nEmail: ${form.email}\nTopic: ${form.subject || "—"}\n\n${form.message}`;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const FIELD_CLASS =
  "w-full bg-black/30 border border-red/20 rounded-md px-4 py-3.5 text-xs font-mono text-white/85 placeholder:text-white/40 focus:outline-none focus:border-red/50 focus:ring-1 focus:ring-red/30 transition-colors";

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setFeedback("Please fill in your name, email and message.");
      return;
    }
    if (!isEmail(email)) {
      setStatus("error");
      setFeedback("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setFeedback("Message sent — I'll get back to you within 24 hours.");
        setForm(EMPTY_FORM);
        return;
      }

      const data = await res.json().catch(() => ({}));

      // Backend not configured yet → fall back to the user's email client
      // so a message is never lost.
      if (res.status === 501 || data?.unconfigured) {
        window.location.href = buildMailto(form);
        setStatus("success");
        setFeedback("Opening your email app… If nothing happens, email me directly above.");
        return;
      }

      setStatus("error");
      setFeedback(data?.error || "Could not send message right now. Please email me directly above.");
    } catch {
      // Network failure — still give the user a working path.
      window.location.href = buildMailto(form);
      setStatus("error");
      setFeedback("Network error — opening your email app instead.");
    }
  }

  const submitting = status === "submitting";

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-transparent"
    >
      {/* ── CONTENT WRAPPER ─────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex flex-col justify-center" style={{ paddingTop: "clamp(2rem, 5vh, 6rem)", paddingBottom: "clamp(2rem, 5vh, 8rem)" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-red" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-red uppercase font-bold">
              Contact
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white/90 mb-2 leading-tight">
            Let&apos;s build something <br />
            <span className="font-serif italic text-gold tracking-wide pr-2">worth sharing.</span>
          </h2>

          <p className="font-mono text-xs sm:text-sm text-white/60 leading-relaxed mt-6 max-w-md">
            Tell me what you&apos;re working on and what you need. <br />
            I&apos;ll get back to you within <span className="text-red">24 hours</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Email + Services */}
          <div className="flex flex-col gap-6">
            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="p-6 sm:p-8 rounded-xl border border-red/20 bg-black/40 backdrop-blur-sm"
            >
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-red uppercase mb-4 font-bold">
                Email Directly
              </h3>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-serif text-lg sm:text-xl text-white/80 hover:text-white transition-colors duration-300"
              >
                {siteConfig.email}
              </a>
            </motion.div>

            {/* What I Can Help With Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 sm:p-8 rounded-xl border border-red/20 bg-black/40 backdrop-blur-sm"
            >
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-red uppercase mb-5 font-bold">
                What I Can Help With
              </h3>
              <ul className="flex flex-col gap-3.5">
                {SERVICES.map((service) => (
                  <li key={service} className="flex items-center gap-3">
                    <Plus className="w-3.5 h-3.5 text-red/70 shrink-0" />
                    <span className="font-mono text-xs sm:text-[13px] text-white/70 tracking-wide">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social Pills — only render links that are configured */}
            {activeSocials.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap gap-2.5"
              >
                {activeSocials.map(({ key, label, href }) => {
                  const Icon = SOCIAL_ICONS[key];
                  const brand = SOCIAL_BRAND_COLORS[key];
                  return (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="social-pill-btn group flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-red/20 bg-black/30 backdrop-blur-sm hover:scale-[1.03]"
                      style={{
                        ["--brand-color" as string]: brand?.color || "#ffffff",
                        ["--brand-border" as string]: brand?.hoverBorder || "rgba(197, 38, 26, 0.5)",
                        ["--brand-bg" as string]: brand?.hoverBg || "rgba(197, 38, 26, 0.08)",
                        ["--brand-glow" as string]: brand?.hoverGlow || "none",
                      }}
                    >
                      <Icon className="w-3.5 h-3.5 text-white/45 transition-colors duration-300 group-hover:text-[var(--brand-color)]" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60 group-hover:text-white transition-colors duration-300">
                        {label}
                      </span>
                    </a>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* RIGHT COLUMN: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-6 sm:p-8 lg:p-10 rounded-xl border border-red/20 bg-black/40 backdrop-blur-sm"
          >
            <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
              {/* Honeypot — hidden from real users, catches bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                />
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={FIELD_CLASS}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Your email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Your email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={FIELD_CLASS}
                    required
                  />
                </div>
              </div>

              {/* Subject Select */}
              <div className="relative">
                <label htmlFor="subject" className="sr-only">
                  What do you need help with?
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={(e) => set("subject", e.target.value)}
                  className={`${FIELD_CLASS} appearance-none pr-10`}
                  required
                >
                  <option value="" disabled className="bg-[#0a0a0c] text-white/50">
                    What do you need help with?
                  </option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s} className="bg-[#0a0a0c]">
                      {s}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red/60 pointer-events-none" />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="sr-only">
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project - goals, timeline, any details that help..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  className={`${FIELD_CLASS} resize-y`}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 mt-2 rounded-md border border-red/30 bg-red/5 hover:bg-red/10 text-red font-mono text-[11px] sm:text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending…" : "Send Message"}
              </button>

              {/* Feedback / status — announced to screen readers */}
              <p
                role="status"
                aria-live="polite"
                className={`text-center font-mono text-[10px] mt-1 tracking-wide min-h-[1.2em] ${
                  status === "error"
                    ? "text-red"
                    : status === "success"
                      ? "text-gold"
                      : "text-white/45"
                }`}
              >
                {feedback || "No spam. I reply within 24 hours."}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
