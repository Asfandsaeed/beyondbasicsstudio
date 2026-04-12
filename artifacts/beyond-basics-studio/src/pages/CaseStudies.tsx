import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUp } from "lucide-react";

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

const cases = [
  {
    business: "Urban Pizza", type: "Restaurant", location: "Chicago, IL",
    before: { views: "180/mo", rank: "#14", reviews: "12", calls: "8/mo" },
    after: { views: "5,200/mo", rank: "#2", reviews: "214", calls: "268/mo" },
    quote: "We went from 8 calls a month to 268. The best investment we've ever made.",
    author: "Maria T., Owner", tier: "Growth", duration: "90 days",
    highlight: "+3,250% profile views",
  },
  {
    business: "Summit Dental", type: "Healthcare", location: "Denver, CO",
    before: { views: "320/mo", rank: "#9", reviews: "28", calls: "22/mo" },
    after: { views: "8,100/mo", rank: "#1", reviews: "312", calls: "190/mo" },
    quote: "From page-2 obscurity to the top spot. New patients up 750%.",
    author: "Dr. James R., Practice Owner", tier: "Premium", duration: "60 days",
    highlight: "#1 in Local Map Pack",
  },
  {
    business: "City Auto Repair", type: "Automotive", location: "Austin, TX",
    before: { views: "95/mo", rank: "#11", reviews: "6", calls: "5/mo" },
    after: { views: "3,800/mo", rank: "#3", reviews: "187", calls: "145/mo" },
    quote: "I thought GBP was just a listing. It's now my biggest revenue driver.",
    author: "Carlos M., Owner", tier: "Growth", duration: "120 days",
    highlight: "+2,800% call volume",
  },
  {
    business: "Harbor Café", type: "Café & Bakery", location: "Portland, OR",
    before: { views: "210/mo", rank: "#7", reviews: "19", calls: "12/mo" },
    after: { views: "6,400/mo", rank: "#1", reviews: "401", calls: "98/mo" },
    quote: "Our weekend wait times doubled. Best problem we've ever had.",
    author: "Sarah L., Co-owner", tier: "Premium", duration: "75 days",
    highlight: "400+ Google Reviews",
  },
  {
    business: "Metro Fitness", type: "Gym & Fitness", location: "Miami, FL",
    before: { views: "440/mo", rank: "#8", reviews: "31", calls: "18/mo" },
    after: { views: "9,200/mo", rank: "#2", reviews: "560", calls: "312/mo" },
    quote: "New membership signups from Google Maps increased 5x. The ROI is insane.",
    author: "Derek J., Marketing Director", tier: "Premium", duration: "90 days",
    highlight: "5x membership signups",
  },
  {
    business: "Peak Real Estate", type: "Real Estate", location: "Seattle, WA",
    before: { views: "120/mo", rank: "#15", reviews: "8", calls: "4/mo" },
    after: { views: "4,100/mo", rank: "#3", reviews: "143", calls: "89/mo" },
    quote: "We closed 4 listings in one month that came directly from Google Maps.",
    author: "Amanda P., Principal Agent", tier: "Growth", duration: "105 days",
    highlight: "4 direct Map Pack closes",
  },
];

export default function CaseStudies({ onAuditClick }: { onAuditClick: () => void }) {
  return (
    <div style={{ backgroundColor: "var(--sf-dark)", color: "var(--sf-cream)" }}>
      {/* Hero */}
      <section className="pt-36 pb-24 px-6 lg:px-10 border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <p className="tag mb-6" style={{ color: "rgba(229,225,216,0.4)" }}>Work</p>
            <h1
              className="font-display font-semibold leading-tight"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--sf-cream)" }}
            >
              Real results.<br />No stock photos.
            </h1>
          </FadeUp>
          <FadeIn delay={0.25}>
            <p className="font-sans text-base mt-8 max-w-lg" style={{ color: "rgba(229,225,216,0.45)" }}>
              These are actual before/after results from real clients who chose to stop being invisible on Google Maps.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Aggregate stats */}
      <section className="border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
            {[
              { value: "500+", label: "Active Clients" },
              { value: "300%", label: "Avg Review Growth" },
              { value: "12×", label: "Avg Call Increase" },
              { value: "90", label: "Days to Top 3 (avg)" },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="py-10 px-6 first:pl-0">
                  <p className="font-display font-semibold leading-none mb-2" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--sf-cream)" }}>
                    {stat.value}
                  </p>
                  <p className="font-sans text-xs tracking-widest uppercase" style={{ color: "rgba(229,225,216,0.35)" }}>
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Case list */}
      <section className="px-6 lg:px-10 py-6">
        <div className="max-w-7xl mx-auto space-y-px" style={{ backgroundColor: "rgba(229,225,216,0.05)" }}>
          {cases.map((c, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div
                className="grid md:grid-cols-5 gap-px"
                style={{ backgroundColor: "rgba(229,225,216,0.05)" }}
              >
                {/* Info */}
                <div className="md:col-span-2 p-8 lg:p-10" style={{ backgroundColor: "var(--sf-dark)" }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display font-semibold text-2xl" style={{ color: "var(--sf-cream)" }}>{c.business}</span>
                    <span className="font-sans text-xs tracking-widest uppercase px-2 py-0.5" style={{ backgroundColor: "rgba(229,225,216,0.07)", color: "rgba(229,225,216,0.4)" }}>
                      {c.tier}
                    </span>
                  </div>
                  <p className="font-sans text-xs mb-1" style={{ color: "rgba(229,225,216,0.35)" }}>
                    {c.type} · {c.location}
                  </p>
                  <p className="font-sans text-xs mb-6" style={{ color: "rgba(180,210,170,0.7)" }}>
                    {c.duration} · {c.highlight}
                  </p>
                  <blockquote className="font-display text-lg leading-snug mb-4" style={{ color: "var(--sf-cream)" }}>
                    "{c.quote}"
                  </blockquote>
                  <p className="font-sans text-xs" style={{ color: "rgba(229,225,216,0.35)" }}>
                    — {c.author}
                  </p>
                </div>

                {/* Before */}
                <div className="p-8 lg:p-10" style={{ backgroundColor: "#2a2e27" }}>
                  <p className="tag mb-6" style={{ color: "rgba(229,225,216,0.25)" }}>Before</p>
                  {[
                    ["Profile Views", c.before.views],
                    ["Map Rank", c.before.rank],
                    ["Reviews", c.before.reviews],
                    ["Monthly Calls", c.before.calls],
                  ].map(([label, val]) => (
                    <div key={label} className="mb-4">
                      <p className="font-sans text-xs mb-0.5" style={{ color: "rgba(229,225,216,0.25)" }}>{label}</p>
                      <p className="font-display font-semibold text-xl line-through decoration-1" style={{ color: "rgba(229,225,216,0.35)" }}>{val}</p>
                    </div>
                  ))}
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center p-4" style={{ backgroundColor: "var(--sf-dark)" }}>
                  <ArrowRight className="w-5 h-5" style={{ color: "rgba(229,225,216,0.2)" }} />
                </div>

                {/* After */}
                <div className="p-8 lg:p-10" style={{ backgroundColor: "#2d3429" }}>
                  <p className="tag mb-6" style={{ color: "rgba(180,210,170,0.5)" }}>After</p>
                  {[
                    ["Profile Views", c.after.views],
                    ["Map Rank", c.after.rank],
                    ["Reviews", c.after.reviews],
                    ["Monthly Calls", c.after.calls],
                  ].map(([label, val]) => (
                    <div key={label} className="mb-4">
                      <p className="font-sans text-xs mb-0.5" style={{ color: "rgba(229,225,216,0.35)" }}>{label}</p>
                      <p className="font-display font-semibold text-xl" style={{ color: "var(--sf-cream)" }}>{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6 lg:px-10 text-center">
        <FadeUp>
          <h2
            className="font-display font-semibold leading-tight mb-10"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "var(--sf-cream)" }}
          >
            Your story<br />starts here.
          </h2>
        </FadeUp>
        <FadeIn delay={0.2}>
          <p className="font-sans text-base mb-10" style={{ color: "rgba(229,225,216,0.45)" }}>
            Every business on this page started exactly where you are now.
          </p>
          <button onClick={onAuditClick} className="btn-cream">
            Claim Free Audit <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </FadeIn>
      </section>
    </div>
  );
}
