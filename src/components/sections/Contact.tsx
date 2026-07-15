"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-transparent"
      style={{ minHeight: "100vh" }}
    >

      {/* ── CONTENT WRAPPER ─────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-24 sm:py-32 flex flex-col justify-center min-h-screen">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: Text & Info */}
          <div className="flex flex-col">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c92a2a]" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#c92a2a] uppercase font-bold">
                  Contact
                </span>
              </div>
              
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white/90 mb-2 leading-tight">
                Let&apos;s build something <br />
                <span className="font-serif italic text-[#c92a2a] tracking-wide pr-2">worth sharing.</span>
              </h2>

              <p className="font-mono text-xs sm:text-sm text-white/50 leading-relaxed mt-6 mb-8 max-w-md">
                Tell me what you&apos;re working on and what you need. <br />
                I&apos;ll get back to you within <span className="text-[#c92a2a]">24 hours</span>.
              </p>

              <div className="w-8 h-[1px] bg-[#c92a2a]/60 mb-10" />
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 p-6 sm:p-8 rounded-xl border border-[#c92a2a]/20 bg-black/40 backdrop-blur-sm"
            >
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#c92a2a] uppercase mb-4 font-bold">
                Email Directly
              </h3>
              <a href="mailto:luvyanishad@gmail.com" className="font-serif text-lg sm:text-xl text-white/80 hover:text-white transition-colors duration-300">
                luvyanishad@gmail.com
              </a>
            </motion.div>

            {/* Social Links Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-6 sm:p-8 rounded-xl border border-[#c92a2a]/20 bg-black/40 backdrop-blur-sm"
            >
              <h3 className="font-mono text-[10px] tracking-[0.2em] text-[#c92a2a] uppercase mb-4 font-bold">
                Let&apos;s Connect
              </h3>
              <div className="flex flex-col">
                <SocialLink icon={Linkedin} label="LINKEDIN" href="#" />
                <SocialLink icon={Github} label="GITHUB" href="#" />
                <SocialLink icon={Instagram} label="INSTAGRAM" href="#" />
                <SocialLink icon={Youtube} label="YOUTUBE" href="#" border={false} />
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-6 sm:p-8 lg:p-10 rounded-xl border border-[#c92a2a]/20 bg-black/40 backdrop-blur-sm mt-0 lg:mt-12"
          >
            <form className="flex flex-col gap-5">
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-black/30 border border-[#c92a2a]/20 rounded-md px-4 py-3.5 text-xs font-mono text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#c92a2a]/50 transition-colors"
                  required
                />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-black/30 border border-[#c92a2a]/20 rounded-md px-4 py-3.5 text-xs font-mono text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#c92a2a]/50 transition-colors"
                  required
                />
              </div>

              {/* Subject Select */}
              <div className="relative">
                <select 
                  className="w-full bg-black/30 border border-[#c92a2a]/20 rounded-md px-4 py-3.5 text-xs font-mono text-white/80 focus:outline-none focus:border-[#c92a2a]/50 transition-colors appearance-none"
                  required
                  defaultValue=""
                >
                  <option value="" disabled className="bg-[#0a0a0c] text-white/50">What do you need help with?</option>
                  <option value="ui-ux" className="bg-[#0a0a0c]">UI/UX Design</option>
                  <option value="frontend" className="bg-[#0a0a0c]">Frontend Development</option>
                  <option value="fullstack" className="bg-[#0a0a0c]">Fullstack Development</option>
                  <option value="other" className="bg-[#0a0a0c]">Other</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c92a2a]/60 pointer-events-none" />
              </div>

              {/* Message Textarea */}
              <textarea
                placeholder="Tell me about your project - goals, timeline, any details that help..."
                rows={5}
                className="w-full bg-black/30 border border-[#c92a2a]/20 rounded-md px-4 py-3.5 text-xs font-mono text-white/80 placeholder:text-white/30 focus:outline-none focus:border-[#c92a2a]/50 transition-colors resize-y"
                required
              ></textarea>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 mt-2 rounded-md border border-[#c92a2a]/30 bg-[#c92a2a]/5 hover:bg-[#c92a2a]/10 text-[#c92a2a] font-mono text-[11px] sm:text-xs tracking-[0.15em] uppercase font-bold transition-all duration-300"
              >
                Send Message
              </button>

              <p className="text-center font-mono text-[9px] text-white/40 mt-2 tracking-wide uppercase">
                No spam. I reply within 24 hours.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function SocialLink({ icon: Icon, label, href, border = true }: { icon: any, label: string, href: string, border?: boolean }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center justify-between py-4 ${border ? 'border-b border-[#c92a2a]/10' : ''} hover:bg-white/[0.02] px-2 -mx-2 rounded transition-colors`}
    >
      <div className="flex items-center gap-4">
        <Icon className="w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" />
        <span className="font-mono text-xs text-white/60 tracking-wider group-hover:text-white/90 transition-colors">
          {label}
        </span>
      </div>
      <ArrowUpRight className="w-3.5 h-3.5 text-[#c92a2a]/60 group-hover:text-[#c92a2a] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
    </a>
  );
}

function Linkedin(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Github(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Instagram(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Youtube(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 7.1C2.5 7.1 2.3 5 4.3 3c2.3-2.3 5.8-2.3 9.7-2.3S19.4.7 21.7 3c2 2 1.8 4.1 1.8 4.1s.2 1.7.2 3.4v3c0 1.7-.2 3.4-.2 3.4s.2 2.1-1.8 4.1c-2.3 2.3-6.2 2.3-9.7 2.3S6.6 23.3 4.3 21c-2-2-1.8-4.1-1.8-4.1s-.2-1.7-.2-3.4v-3c0-1.7.2-3.4.2-3.4z" />
      <path d="m9.5 15.5 7-3.5-7-3.5z" />
    </svg>
  );
}
