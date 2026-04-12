import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Plus, Minus } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

function FadeUp({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease, delay }} className={className}>
      {children}
    </motion.div>
  );
}
function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
}

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left gap-6 group"
      >
        <span
          className="font-display text-xl sm:text-2xl group-hover:opacity-70 transition-opacity duration-200"
          style={{ color: "var(--sf-cream)" }}
        >
          {q}
        </span>
        {open
          ? <Minus className="w-4 h-4 shrink-0 opacity-50" style={{ color: "var(--sf-cream)" }} />
          : <Plus className="w-4 h-4 shrink-0 opacity-50" style={{ color: "var(--sf-cream)" }} />
        }
      </button>
      {open && (
        <div className="pb-6 font-sans text-sm leading-relaxed" style={{ color: "rgba(229,225,216,0.5)" }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function Services({ onAuditClick }: { onAuditClick: () => void }) {
  return (
    <div style={{ backgroundColor: "var(--sf-dark)", color: "var(--sf-cream)" }}>
      {/* Hero */}
      <section className="pt-36 pb-24 px-6 lg:px-10 border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <p className="tag mb-6" style={{ color: "rgba(229,225,216,0.4)" }}>Services</p>
            <h1
              className="font-display font-semibold leading-tight"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--sf-cream)" }}
            >
              GBP Tiers: Basic<br />to Domination.
            </h1>
          </FadeUp>
          <FadeIn delay={0.25}>
            <p
              className="font-sans text-base mt-8 max-w-lg"
              style={{ color: "rgba(229,225,216,0.45)" }}
            >
              Every tier is engineered to move the needle. Choose based on your ambition — not your budget.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Feature Table */}
      <section className="py-24 px-6 lg:px-10 border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <p className="tag mb-12" style={{ color: "rgba(229,225,216,0.4)" }}>Feature Comparison</p>
          </FadeUp>
          <FadeIn>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
                    <th className="text-left pb-6 font-sans text-xs tracking-widest uppercase text-left w-1/2" style={{ color: "rgba(229,225,216,0.3)" }}>Feature</th>
                    {["Basic · $200", "Growth · $500", "Premium · $1k"].map((h) => (
                      <th key={h} className="pb-6 font-display text-xl text-center" style={{ color: "var(--sf-cream)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["GBP Locations", "1", "Up to 3", "Unlimited"],
                    ["Monthly Posts", "4", "16", "Daily"],
                    ["Profile Optimisation", "✓", "✓", "✓"],
                    ["Review Response", "Templates", "Active", "AI-Powered"],
                    ["Review Generation", "—", "✓", "✓"],
                    ["Google Ads", "—", "✓", "✓"],
                    ["Citation Building", "—", "20 dirs", "Unlimited"],
                    ["MapMaster™ AI", "—", "—", "✓"],
                    ["Dedicated Manager", "—", "—", "✓"],
                    ["Reporting", "Monthly", "Weekly", "Custom"],
                    ["Support", "Email", "Priority", "24/7"],
                  ].map(([feat, b, g, p], i) => (
                    <tr key={i} className="border-b" style={{ borderColor: "rgba(229,225,216,0.06)" }}>
                      <td className="py-4 font-sans text-sm" style={{ color: "rgba(229,225,216,0.55)" }}>{feat}</td>
                      {[b, g, p].map((val, j) => (
                        <td key={j} className="py-4 text-center font-sans text-sm" style={{ color: val === "—" ? "rgba(229,225,216,0.15)" : val === "✓" ? "rgba(180,210,170,0.8)" : "rgba(229,225,216,0.7)" }}>
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tier Cards */}
      <section className="py-24 px-6 lg:px-10 border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(229,225,216,0.08)" }}>
            {[
              {
                name: "Basic", price: "$200", note: "/mo",
                tagline: "Essentials done right. One location, consistent presence.",
                features: ["1 GBP Location", "Full initial optimisation", "4 Google Posts/month", "Business hours & attributes", "Monthly performance report", "Review response templates", "Keyword optimisation", "Email support"],
              },
              {
                name: "Growth", price: "$500", note: "/mo", badge: "Most Popular",
                tagline: "The active edge. Reviews, reach, and results.",
                features: ["Up to 3 Locations", "Everything in Basic", "Active review generation", "16 Posts/month", "Local Google Ads", "Weekly reports", "Competitor gap analysis", "Photo management", "Priority support", "Citation building (20 dirs)"],
              },
              {
                name: "Premium", price: "$1,000", note: "/mo",
                tagline: "Total domination mode. Unlimited, AI-powered.",
                features: ["Unlimited Locations", "Everything in Growth", "MapMaster™ AI engine", "Dedicated account manager", "Daily posting & updates", "Unlimited citations", "Schema markup", "Monthly strategy call", "Custom dashboard", "24/7 priority support"],
              },
            ].map((plan, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-8 lg:p-10 flex flex-col" style={{ backgroundColor: "var(--sf-dark)", minHeight: "520px" }}>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-display font-semibold text-2xl" style={{ color: "var(--sf-cream)" }}>{plan.name}</span>
                      {plan.badge && (
                        <span className="font-sans text-xs tracking-widest uppercase px-2 py-0.5" style={{ backgroundColor: "rgba(229,225,216,0.08)", color: "rgba(229,225,216,0.5)" }}>
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs mb-6" style={{ color: "rgba(229,225,216,0.4)" }}>{plan.tagline}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-semibold leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--sf-cream)" }}>{plan.price}</span>
                      <span className="font-sans text-xs" style={{ color: "rgba(229,225,216,0.3)" }}>{plan.note}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1 border-t pt-6 mb-8" style={{ borderColor: "rgba(229,225,216,0.08)" }}>
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 font-sans text-sm" style={{ color: "rgba(229,225,216,0.5)" }}>
                        <span className="mt-2 w-0.5 h-0.5 rounded-full shrink-0 opacity-50" style={{ backgroundColor: "var(--sf-cream)" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={onAuditClick} className="btn-outline-cream w-full justify-center text-xs">
                    Start {plan.name}
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Timeline */}
      <section className="py-24 px-6 lg:px-10 border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <p className="tag mb-10" style={{ color: "rgba(229,225,216,0.4)" }}>How We Work</p>
            <h2
              className="font-display font-semibold leading-tight mb-16"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--sf-cream)" }}
            >
              From zero to domination<br />in four steps.
            </h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "rgba(229,225,216,0.08)" }}>
            {[
              { step: "01", label: "GBP Audit", desc: "Full profile analysis, competitive landscape, and opportunity mapping." },
              { step: "02", label: "Strategy", desc: "Custom domination roadmap built around your market and goals." },
              { step: "03", label: "Implement", desc: "Full optimisation sprint across every profile signal and asset." },
              { step: "04", label: "Optimise & Report", desc: "Continuous AI tuning and transparent monthly or weekly reporting." },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="p-8" style={{ backgroundColor: "var(--sf-dark)" }}>
                  <span className="font-display text-5xl font-semibold opacity-20 block mb-6" style={{ color: "var(--sf-cream)" }}>
                    {s.step}
                  </span>
                  <h3 className="font-display font-semibold text-2xl mb-3" style={{ color: "var(--sf-cream)" }}>
                    {s.label}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(229,225,216,0.45)" }}>
                    {s.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <p className="tag mb-8" style={{ color: "rgba(229,225,216,0.4)" }}>Questions</p>
          </FadeUp>
          {[
            { q: "What's included in the initial setup?", a: "We begin with a comprehensive audit of your existing GBP, competitive analysis, and a full optimisation sprint — categories, attributes, business description, photos, and service areas — all within the first week." },
            { q: "How do you generate more reviews?", a: "We deploy proven post-transaction sequences via email and SMS, using Google's compliant review request methodology. Growth and Premium clients see an average 300% increase in monthly reviews within 60 days." },
            { q: "Can I upgrade or downgrade my plan?", a: "Absolutely. You can change tiers at any time with 30 days notice. Upgrades activate immediately; downgrades take effect at the next billing cycle. No penalties or lock-in." },
            { q: "What reporting will I receive?", a: "Detailed performance reports covering: profile views, search impressions, direction requests, call clicks, photo views, review growth, and map rank trends — weekly or monthly depending on your tier." },
            { q: "Do you guarantee results?", a: "We guarantee Top 3 Map Pack placement on Premium plans. We also offer a full refund if you see zero improvement in your first 60 days on any plan." },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <Accordion q={item.q} a={item.a} />
            </FadeIn>
          ))}
          <div className="mt-12">
            <FadeIn>
              <button onClick={onAuditClick} className="btn-cream">
                Start with a Free Audit <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
