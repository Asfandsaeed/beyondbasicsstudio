import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];
function FadeUp({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease, delay }} className={className}>{children}</motion.div>;
}
function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, ease: "easeOut", delay }} className={className}>{children}</motion.div>;
}

const team = [
  { name: "Marcus Chen", role: "CEO & Founder", initials: "MC", bio: "Former Google local team lead with 10 years of algorithm expertise. Built Beyond Basics to give every local business the competitive intelligence only large brands enjoyed." },
  { name: "Priya Sharma", role: "Head of GBP Operations", initials: "PS", bio: "Managed over 1,200 GBP profiles across 40+ industries. The engine behind our 98% client retention rate." },
  { name: "James O'Reilly", role: "AI Strategy Director", initials: "JO", bio: "Built MapMaster™ from the ground up. Data scientist by training, local SEO obsessive by nature." },
  { name: "Sofia Mendez", role: "Client Success Lead", initials: "SM", bio: "The reason clients stay. Sofia ensures every client feels heard, sees results, and grows with us long term." },
];

const values = [
  { title: "Transparent Reporting", desc: "No smoke, no mirrors. Every metric is real, verifiable, and tied to your business growth." },
  { title: "AI-Powered Precision", desc: "MapMaster™ runs 24/7, testing and optimising faster than any competitor can react." },
  { title: "Results-First Culture", desc: "We celebrate outcomes — not activity. Our team is incentivised around your profile's actual performance." },
];

export default function About({ onAuditClick }: { onAuditClick: () => void }) {
  return (
    <div style={{ backgroundColor: "var(--sf-dark)", color: "var(--sf-cream)" }}>
      {/* Hero */}
      <section className="pt-36 pb-24 px-6 lg:px-10 border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <p className="tag mb-6" style={{ color: "rgba(229,225,216,0.4)" }}>About</p>
            <h1
              className="font-display font-semibold leading-tight"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--sf-cream)" }}
            >
              Data-driven GBP<br />experts since 2025.
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 lg:px-10 border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          <FadeUp>
            <p className="tag mb-6" style={{ color: "rgba(229,225,216,0.4)" }}>Our Story</p>
            <h2
              className="font-display font-semibold leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "var(--sf-cream)" }}
            >
              Founded on an<br />unfair truth.
            </h2>
          </FadeUp>
          <FadeIn delay={0.15}>
            <div className="space-y-5">
              <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(229,225,216,0.55)" }}>
                In 2025, our founder Marcus Chen left his role on Google's local team after witnessing firsthand how a well-managed Google Business Profile could transform a local business — and how poorly most businesses managed theirs.
              </p>
              <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(229,225,216,0.55)" }}>
                The average local business leaves 70% of its Google Maps potential untouched. Not because they don't care — because they lack the time, expertise, and tools to do it right.
              </p>
              <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(229,225,216,0.55)" }}>
                Beyond Basics Studio was built to fix that. Today we manage 500+ profiles across 30+ countries, delivering results that most business owners thought were impossible.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
            {[
              { value: "500+", label: "Profiles Managed" },
              { value: "30+", label: "Countries Served" },
              { value: "98%", label: "Client Retention" },
              { value: "2025", label: "Year Founded" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="py-10 px-6 first:pl-0">
                  <p className="font-display font-semibold leading-none mb-2" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--sf-cream)" }}>
                    {s.value}
                  </p>
                  <p className="font-sans text-xs tracking-widest uppercase" style={{ color: "rgba(229,225,216,0.35)" }}>{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 lg:px-10 border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <p className="tag mb-10" style={{ color: "rgba(229,225,216,0.4)" }}>The Team</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(229,225,216,0.08)" }}>
            {team.map((member, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="p-8 group" style={{ backgroundColor: "var(--sf-dark)" }}>
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: "rgba(229,225,216,0.08)", border: "1px solid rgba(229,225,216,0.12)" }}
                  >
                    <span className="font-display font-semibold text-lg" style={{ color: "var(--sf-cream)" }}>
                      {member.initials}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-xl mb-0.5" style={{ color: "var(--sf-cream)" }}>
                    {member.name}
                  </h3>
                  <p className="font-sans text-xs tracking-widest uppercase mb-4" style={{ color: "rgba(229,225,216,0.35)" }}>
                    {member.role}
                  </p>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(229,225,216,0.45)" }}>
                    {member.bio}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 lg:px-10 border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <p className="tag mb-10" style={{ color: "rgba(229,225,216,0.4)" }}>What We Stand For</p>
          </FadeUp>
          <div className="space-y-0">
            {values.map((val, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className="grid md:grid-cols-3 gap-8 py-10 border-b items-start"
                  style={{ borderColor: "rgba(229,225,216,0.1)" }}
                >
                  <div className="flex items-start gap-6">
                    <span className="font-sans text-xs opacity-25" style={{ color: "var(--sf-cream)" }}>
                      0{i + 1}
                    </span>
                    <h3 className="font-display font-semibold text-2xl sm:text-3xl" style={{ color: "var(--sf-cream)" }}>
                      {val.title}
                    </h3>
                  </div>
                  <div className="md:col-span-2">
                    <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(229,225,216,0.5)" }}>
                      {val.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6 lg:px-10 text-center">
        <FadeUp>
          <h2
            className="font-display font-semibold leading-tight mb-10"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "var(--sf-cream)" }}
          >
            Work with the best.
          </h2>
        </FadeUp>
        <FadeIn delay={0.2}>
          <p className="font-sans text-base mb-10 max-w-md mx-auto" style={{ color: "rgba(229,225,216,0.45)" }}>
            Our team is ready to take your GBP from overlooked to unstoppable.
          </p>
          <button onClick={onAuditClick} className="btn-cream">
            Get Your Free Audit <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </FadeIn>
      </section>
    </div>
  );
}
