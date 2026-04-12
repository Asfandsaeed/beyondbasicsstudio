import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, MapPin } from "lucide-react";

/* ── Helpers ── */
const ease = [0.16, 1, 0.3, 1];

function FadeUp({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { value: "500+", label: "Profiles Managed" },
  { value: "300%", label: "Avg Review Growth" },
  { value: "90", label: "Days to Top 3" },
  { value: "98%", label: "Client Retention" },
];

const logos = [
  "Urban Pizza", "City Auto", "Summit Dental", "Harbor Café",
  "Metro Fitness", "Peak Real Estate", "Blue Ridge Bakery",
  "Coastal Law Group", "Sunset Spa", "Northside Gym",
];

const services = [
  {
    index: "01",
    title: "GBP Strategy & Optimization",
    desc: "Full profile overhaul, category precision, attribute configuration, and continuous performance monitoring for maximum map visibility.",
  },
  {
    index: "02",
    title: "Review & Reputation Mastery",
    desc: "Systematic review generation, AI-powered response management, and reputation monitoring. Most clients see 300% growth in 60 days.",
  },
  {
    index: "03",
    title: "Media & Local Domination",
    desc: "Professional photo management, Google Posts strategy, Q&A optimization, and citation building for sustained Map Pack dominance.",
  },
];

export default function Home({ onAuditClick }: { onAuditClick: () => void }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div style={{ backgroundColor: "var(--sf-dark)", color: "var(--sf-cream)" }}>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end overflow-hidden" style={{ paddingBottom: "8vh" }}>
        {/* Parallax headline */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 px-6 lg:px-10 pt-32"
        >
          {/* Top meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-6 mb-12"
          >
            <span className="tag" style={{ color: "rgba(229,225,216,0.5)" }}>GBP Management Agency</span>
            <span className="tag" style={{ color: "rgba(229,225,216,0.5)" }}>Est. 2025</span>
            <div className="flex items-center gap-1.5 ml-auto">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--sf-cream)", opacity: 0.6 }} />
              <span className="tag" style={{ color: "rgba(229,225,216,0.4)" }}>500+ Profiles Active</span>
            </div>
          </motion.div>

          {/* Main headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.1 }}
              className="font-display font-semibold leading-none tracking-tight"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 9.5rem)",
                color: "var(--sf-cream)",
              }}
            >
              Beyond
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease, delay: 0.18 }}
              className="font-display font-semibold italic leading-none tracking-tight"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 9.5rem)",
                color: "var(--sf-cream)",
                opacity: 0.85,
              }}
            >
              Basics Studio
            </motion.h1>
          </div>

          {/* Sub row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-8"
          >
            <p
              className="font-sans text-base sm:text-lg leading-relaxed max-w-md"
              style={{ color: "rgba(229,225,216,0.55)" }}
            >
              The GBP agency giving local businesses an unfair advantage on Google Maps. From $200/mo.
            </p>
            <div className="flex items-center gap-4">
              <button onClick={onAuditClick} className="btn-cream">
                Free Audit <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link href="/services" className="btn-outline-cream hidden sm:flex">
                View Tiers
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-down"
        >
          <ArrowDown className="w-4 h-4" style={{ color: "rgba(229,225,216,0.3)" }} />
        </motion.div>

        {/* Decorative map pin cluster */}
        <div className="absolute top-1/3 right-10 lg:right-20 opacity-10 pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <MapPin
              key={i}
              className="absolute animate-pin-pulse"
              style={{
                width: 20 + i * 8,
                height: 20 + i * 8,
                top: `${i * 25}px`,
                left: `${i % 2 === 0 ? 0 : 30}px`,
                animationDelay: `${i * 0.6}s`,
                color: "var(--sf-cream)",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section
        className="border-y"
        style={{ borderColor: "rgba(229,225,216,0.1)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
            {stats.map((stat, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="py-10 px-6 lg:px-10 first:pl-0 last:pr-0">
                  <p
                    className="font-display font-semibold leading-none mb-2"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--sf-cream)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-sans text-xs tracking-widest uppercase" style={{ color: "rgba(229,225,216,0.4)" }}>
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee social proof ── */}
      <section
        className="py-6 border-b overflow-hidden"
        style={{ borderColor: "rgba(229,225,216,0.1)" }}
      >
        <div className="flex">
          <div className="flex gap-12 items-center animate-marquee whitespace-nowrap">
            {[
              "World's #1 GBP Agency",
              "✦",
              "Business Journal",
              "✦",
              "Local SEO Pro",
              "✦",
              "Google Verified Partner",
              "✦",
              "Map Pack Masters",
              "✦",
              "Agency of the Year 2026",
              "✦",
              "World's #1 GBP Agency",
              "✦",
              "Business Journal",
              "✦",
              "Local SEO Pro",
              "✦",
              "Google Verified Partner",
              "✦",
              "Map Pack Masters",
              "✦",
              "Agency of the Year 2026",
              "✦",
            ].map((item, i) => (
              <span key={i} className="font-sans text-xs tracking-widest uppercase shrink-0" style={{ color: "rgba(229,225,216,0.25)" }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-28 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="tag mb-12" style={{ color: "rgba(229,225,216,0.45)" }}>Client Voice</p>
          </FadeIn>
          <FadeUp>
            <blockquote
              className="font-display font-semibold italic leading-tight"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
                color: "var(--sf-cream)",
              }}
            >
              "Beyond Basics turned our profile into a lead machine. We went from 8 calls a month to over 250 — in 60 days."
            </blockquote>
          </FadeUp>
          <FadeIn delay={0.2}>
            <p className="mt-6 font-sans text-sm" style={{ color: "rgba(229,225,216,0.4)" }}>
              — Maria T., Owner, Urban Pizza · Growth Plan
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Services ── */}
      <section
        className="border-t"
        style={{ borderColor: "rgba(229,225,216,0.1)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <FadeUp>
              <p className="tag mb-3" style={{ color: "rgba(229,225,216,0.45)" }}>What We Do</p>
              <h2
                className="font-display font-semibold italic leading-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--sf-cream)" }}
              >
                Full-spectrum<br />GBP mastery.
              </h2>
            </FadeUp>
            <FadeIn>
              <Link href="/services" className="btn-outline-cream shrink-0">
                All Services <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </FadeIn>
          </div>

          <div className="space-y-0">
            {services.map((service, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className="flex items-start gap-8 py-8 border-b group cursor-default"
                  style={{ borderColor: "rgba(229,225,216,0.1)" }}
                >
                  <span className="font-sans text-xs opacity-30 w-8 shrink-0 pt-1" style={{ color: "var(--sf-cream)" }}>
                    {service.index}
                  </span>
                  <div className="flex-1">
                    <h3
                      className="font-display font-semibold italic text-2xl sm:text-3xl mb-3 group-hover:opacity-70 transition-opacity duration-300"
                      style={{ color: "var(--sf-cream)" }}
                    >
                      {service.title}
                    </h3>
                    <p className="font-sans text-sm leading-relaxed max-w-2xl" style={{ color: "rgba(229,225,216,0.45)" }}>
                      {service.desc}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 mt-1 opacity-20 group-hover:opacity-60 transition-opacity duration-300" style={{ color: "var(--sf-cream)" }} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── MapMaster AI ── */}
      <section
        className="py-28 px-6 lg:px-10"
        style={{ backgroundColor: "#363b32" }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeUp>
            <p className="tag mb-6" style={{ color: "rgba(229,225,216,0.45)" }}>Proprietary Technology</p>
            <h2
              className="font-display font-semibold italic leading-tight mb-8"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--sf-cream)" }}
            >
              MapMaster™ AI<br />works while<br />you sleep.
            </h2>
            <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: "rgba(229,225,216,0.5)" }}>
              Our proprietary AI engine runs 24/7 — auto-scheduling posts for peak engagement, scoring review opportunities, and optimizing map rank signals that deliver 40% more visibility on average.
            </p>
            <button onClick={onAuditClick} className="btn-cream">
              See It in Action <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </FadeUp>

          <FadeIn delay={0.15}>
            <div
              className="border p-8 space-y-1"
              style={{ borderColor: "rgba(229,225,216,0.12)", backgroundColor: "rgba(44,49,41,0.5)" }}
            >
              <p className="tag mb-6" style={{ color: "rgba(229,225,216,0.4)" }}>Live Rank Monitor · Urban Pizza</p>
              {[
                { keyword: "pizza near me", before: "#14", after: "#2", delta: "+12" },
                { keyword: "italian restaurant", before: "#9", after: "#1", delta: "+8" },
                { keyword: "best lunch downtown", before: "#22", after: "#3", delta: "+19" },
              ].map((row) => (
                <div
                  key={row.keyword}
                  className="flex items-center justify-between py-4 border-b"
                  style={{ borderColor: "rgba(229,225,216,0.07)" }}
                >
                  <span className="font-sans text-sm" style={{ color: "rgba(229,225,216,0.5)" }}>{row.keyword}</span>
                  <div className="flex items-center gap-6">
                    <span className="font-sans text-xs opacity-30 line-through" style={{ color: "var(--sf-cream)" }}>{row.before}</span>
                    <span className="font-sans text-xs font-medium" style={{ color: "rgba(180,210,170,0.8)" }}>{row.delta}</span>
                    <span className="font-display font-semibold text-lg" style={{ color: "var(--sf-cream)" }}>{row.after}</span>
                  </div>
                </div>
              ))}
              <div className="pt-5">
                <p className="font-sans text-xs" style={{ color: "rgba(180,210,170,0.7)" }}>
                  Average 40% visibility increase within 90 days
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section
        className="py-28 px-6 lg:px-10 border-t"
        style={{ borderColor: "rgba(229,225,216,0.1)" }}
      >
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <p className="tag mb-4" style={{ color: "rgba(229,225,216,0.45)" }}>Pricing</p>
            <h2
              className="font-display font-semibold italic leading-tight mb-16"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--sf-cream)" }}
            >
              No contracts.<br />No surprises.
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(229,225,216,0.1)" }}>
            {[
              {
                name: "Basic",
                price: "$200",
                note: "per month",
                tagline: "Essentials done right.",
                features: ["1 GBP Location", "4 Posts/month", "Profile optimisation", "Monthly report", "Review templates", "Email support"],
              },
              {
                name: "Growth",
                price: "$500",
                note: "per month",
                tagline: "The active edge.",
                badge: "Most Popular",
                features: ["Up to 3 Locations", "Everything in Basic", "Active review generation", "16 Posts/month", "Local ads management", "Weekly reports", "Competitor tracking", "Priority support"],
              },
              {
                name: "Premium",
                price: "$1,000",
                note: "per month",
                tagline: "Total domination.",
                features: ["Unlimited Locations", "Everything in Growth", "MapMaster™ AI", "Dedicated manager", "Daily posting", "Custom dashboard", "Monthly strategy call", "24/7 support"],
              },
            ].map((plan, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className="p-8 lg:p-10 flex flex-col h-full"
                  style={{ backgroundColor: "var(--sf-dark)" }}
                >
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-display text-xl font-semibold" style={{ color: "var(--sf-cream)" }}>{plan.name}</span>
                      {plan.badge && (
                        <span
                          className="font-sans text-xs tracking-widest uppercase px-2 py-0.5"
                          style={{ backgroundColor: "rgba(229,225,216,0.1)", color: "rgba(229,225,216,0.6)" }}
                        >
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs mb-6" style={{ color: "rgba(229,225,216,0.4)" }}>{plan.tagline}</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-semibold leading-none" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "var(--sf-cream)" }}>
                        {plan.price}
                      </span>
                      <span className="font-sans text-xs" style={{ color: "rgba(229,225,216,0.35)" }}>{plan.note}</span>
                    </div>
                  </div>

                  <div
                    className="flex-1 border-t pt-6 mb-8"
                    style={{ borderColor: "rgba(229,225,216,0.1)" }}
                  >
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 font-sans text-sm" style={{ color: "rgba(229,225,216,0.55)" }}>
                          <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "rgba(229,225,216,0.4)" }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button onClick={onAuditClick} className="btn-outline-cream w-full justify-center text-xs">
                    Start {plan.name}
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Logos ── */}
      <section
        className="py-6 border-t border-b overflow-hidden"
        style={{ borderColor: "rgba(229,225,216,0.1)" }}
      >
        <div className="flex">
          <div className="flex gap-14 items-center animate-marquee whitespace-nowrap">
            {[...logos, ...logos].map((client, i) => (
              <span key={i} className="font-display italic text-xl shrink-0" style={{ color: "rgba(229,225,216,0.12)" }}>
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Insights ── */}
      <section
        className="py-28 px-6 lg:px-10 border-b"
        style={{ borderColor: "rgba(229,225,216,0.1)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <FadeUp>
              <p className="tag mb-3" style={{ color: "rgba(229,225,216,0.45)" }}>Insights</p>
              <h2
                className="font-display font-semibold italic leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--sf-cream)" }}
              >
                From the playbook.
              </h2>
            </FadeUp>
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(229,225,216,0.08)" }}>
            {[
              { tag: "Award", date: "Mar 2026", title: "Beyond Basics Wins Local Agency of Year 2026", desc: "For the second consecutive year, recognised for extraordinary GBP results." },
              { tag: "Case Study", date: "Feb 2026", title: "How We 5x'd a Client's Map Pack Rankings in 90 Days", desc: "The exact strategy behind our most dramatic ranking turnaround." },
              { tag: "Strategy", date: "Jan 2026", title: "The GBP Optimisation Playbook for 2026", desc: "Google's algorithm changed. Here's what actually moves the needle today." },
            ].map((article, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className="p-8 group cursor-default"
                  style={{ backgroundColor: "var(--sf-dark)" }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="tag" style={{ color: "rgba(229,225,216,0.35)" }}>{article.tag}</span>
                    <span className="font-sans text-xs" style={{ color: "rgba(229,225,216,0.25)" }}>{article.date}</span>
                  </div>
                  <h3
                    className="font-display font-semibold italic text-2xl leading-snug mb-4 group-hover:opacity-70 transition-opacity duration-300"
                    style={{ color: "var(--sf-cream)" }}
                  >
                    {article.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(229,225,216,0.4)" }}>
                    {article.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-40 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto text-center">
          <FadeUp>
            <h2
              className="font-display font-semibold italic leading-tight mb-10"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--sf-cream)" }}
            >
              Ready to dominate<br />Google Maps?
            </h2>
          </FadeUp>
          <FadeIn delay={0.25}>
            <p className="font-sans text-base mb-10 max-w-lg mx-auto" style={{ color: "rgba(229,225,216,0.45)" }}>
              Your audit is free. Your results are real. Join 500+ local businesses who chose to go beyond basics.
            </p>
            <button onClick={onAuditClick} className="btn-cream text-sm">
              Claim Free Audit <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
