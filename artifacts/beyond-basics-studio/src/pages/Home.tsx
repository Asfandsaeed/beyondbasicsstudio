import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";
import { usePageMeta } from "@/hooks/usePageMeta";
import { homeFeaturedArticles, homeFeaturedCustomers } from "@/data/homeFeaturedData";

const ease = [0.25, 0.1, 0.25, 1];

function FadeUp({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease, delay }} className={className}>
      {children}
    </motion.div>
  );
}
function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
}

const services = [
  { n: "01", title: "GBP Strategy & Optimisation", desc: "Full profile overhaul — category precision, attribute configuration, and continuous performance monitoring for maximum map visibility." },
  { n: "02", title: "Review & Reputation Mastery", desc: "Systematic review generation and AI-powered responses. Clients typically see 300% growth within 60 days." },
  { n: "03", title: "Content & Local Domination", desc: "Professional photo management, Google Posts strategy, Q&A optimisation, and citation building for sustained Map Pack dominance." },
];

export default function Home({ onAuditClick }: { onAuditClick: () => void }) {
  usePageMeta({ title: "Beyond Basics Studio — GBP Management Agency", description: "Stop losing customers to competitors who show up first on Google Maps. Beyond Basics Studio dominates Google Maps from $200/mo.", ogImage: "home.jpg", url: "/" });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div style={{ backgroundColor: "var(--sp-white)" }}>
      <SchemaMarkup schema={[
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://www.beyondbasicsstudio.com/",
          "name": "Beyond Basics Studio",
          "description": "Google Business Profile management agency helping local businesses dominate Google Maps.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.beyondbasicsstudio.com/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Beyond Basics Studio",
          "url": "https://www.beyondbasicsstudio.com/",
          "logo": "https://www.beyondbasicsstudio.com/favicon.svg",
          "image": "https://www.beyondbasicsstudio.com/opengraph.jpg",
          "description": "Beyond Basics Studio is a Google Business Profile (GBP) management agency delivering data-driven local SEO, review generation, and map pack domination for businesses worldwide.",
          "email": "hello@beyondbasicsstudio.com",
          "foundingDate": "2025",
          "areaServed": "Worldwide",
          "serviceType": "Google Business Profile Management",
          "priceRange": "$200–$1,000/month",
          "sameAs": [],
          "offers": [
            {
              "@type": "Offer",
              "name": "Basic",
              "price": "200",
              "priceCurrency": "USD",
              "description": "Foundational GBP maintenance for single-location businesses. Daily audits, NAP monitoring, 1–2 posts/month.",
              "url": "https://www.beyondbasicsstudio.com/services"
            },
            {
              "@type": "Offer",
              "name": "Growth",
              "price": "500",
              "priceCurrency": "USD",
              "description": "Proactive growth for businesses targeting top-3 map pack. Up to 5 locations, review automation, competitor analysis.",
              "url": "https://www.beyondbasicsstudio.com/services"
            },
            {
              "@type": "Offer",
              "name": "Premium",
              "price": "1000",
              "priceCurrency": "USD",
              "description": "Enterprise-level GBP domination. Up to 50 locations, 24/7 monitoring, dedicated account manager.",
              "url": "https://www.beyondbasicsstudio.com/services"
            }
          ]
        }
      ]} />

      {/* ── HERO — full-bleed dark ── */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col overflow-hidden"
        style={{ backgroundColor: "var(--sp-ink)", minHeight: "600px" }}
      >
        {/* Top meta strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-between px-6 lg:px-12"
          style={{ paddingTop: "5.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--sp-rule-d)" }}
        >
          <p className="label" style={{ color: "rgba(247,244,240,0.75)" }}>GBP Management Agency</p>
          <p className="label" style={{ color: "rgba(247,244,240,0.65)" }}>Est. 2025 — Worldwide</p>
        </motion.div>

        {/* Headline */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="flex-1 flex flex-col justify-center px-6 lg:px-12"
        >
          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-serif leading-tight"
              style={{ fontSize: "clamp(2.2rem, 6vw, 6.5rem)", color: "var(--sp-white)" }}
            >
              Stop Losing Customers to Competitors Who Show Up First on Google Maps.
            </motion.h1>
          </div>
        </motion.div>

        {/* Bottom strip — tagline + CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 px-6 lg:px-12 pb-10"
          style={{ paddingTop: "1.5rem", borderTop: "1px solid var(--sp-rule-d)" }}
        >
          <p className="font-sans text-sm max-w-xs leading-relaxed" style={{ color: "rgba(247,244,240,0.75)" }}>
            The GBP agency giving local businesses an unfair advantage on Google Maps. From $200/mo.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={onAuditClick} className="btn btn-white">
              Free Audit <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <Link href="/services" className="btn btn-outline-white">
              Our Services
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce-y"
        >
          <ArrowDown className="w-4 h-4" style={{ color: "rgba(247,244,240,0.25)" }} />
        </motion.div>
      </section>

      {/* ── INTRO text ── */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-2">
              <FadeIn>
                <p className="label mt-2">About</p>
              </FadeIn>
            </div>
            <div className="md:col-span-8">
              <FadeUp>
                <p
                  className="font-serif leading-tight"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)", color: "var(--sp-black)" }}
                >
                  We manage Google Business Profiles for ambitious local businesses — bringing the same rigour and craft that global brands rely on, available from $200/mo.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-b" style={{ backgroundColor: "var(--sp-cream)", borderColor: "var(--sp-rule)" }}>
        <div
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4"
          style={{ borderRight: "1px solid var(--sp-rule)" }}
        >
          {[
            { value: "500+", label: "Profiles Managed" },
            { value: "300%", label: "Avg Review Growth" },
            { value: "90", label: "Days to Top 3" },
            { value: "98%", label: "Client Retention" },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div
                className="py-12 px-8 lg:px-12 border-l border-b md:border-b-0"
                style={{ borderColor: "var(--sp-rule)" }}
              >
                <p
                  className="font-serif leading-none mb-3"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "var(--sp-black)" }}
                >
                  {stat.value}
                </p>
                <p className="label">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── TICKER ── */}
      <section className="border-b py-4 overflow-hidden" style={{ backgroundColor: "var(--sp-ink)", borderColor: "var(--sp-rule-d)" }} aria-hidden="true">
        <div className="flex">
          <div className="flex gap-14 items-center animate-marquee whitespace-nowrap">
            {[
              "GBP Strategy", "—", "Review Growth", "—", "Map Pack Domination",
              "—", "Google Posts", "—", "AI-Powered Optimisation", "—",
              "500+ Profiles Active", "—", "Worldwide", "—",
              "GBP Strategy", "—", "Review Growth", "—", "Map Pack Domination",
              "—", "Google Posts", "—", "AI-Powered Optimisation", "—",
              "500+ Profiles Active", "—", "Worldwide", "—",
            ].map((t, i) => (
              <span key={i} className="label shrink-0" style={{ color: "rgba(247,244,240,0.65)" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <FadeUp>
              <p className="label mb-4">What We Do</p>
              <h2
                className="font-serif leading-tight"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--sp-black)" }}
              >
                Full-spectrum GBP<br />mastery.
              </h2>
            </FadeUp>
            <FadeIn>
              <Link href="/services" className="btn btn-outline shrink-0">
                All Services <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </FadeIn>
          </div>

          <div className="border-t" style={{ borderColor: "var(--sp-rule)" }}>
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div
                  className="grid grid-cols-12 gap-6 py-8 border-b group cursor-default"
                  style={{ borderColor: "var(--sp-rule)" }}
                >
                  <span className="col-span-1 font-sans text-xs pt-1" style={{ color: "var(--sp-gray)", opacity: 0.5 }}>{s.n}</span>
                  <h3 className="col-span-5 font-serif text-2xl lg:text-3xl group-hover:opacity-60 transition-opacity duration-300" style={{ color: "var(--sp-black)" }}>{s.title}</h3>
                  <p className="col-span-5 col-start-8 font-sans text-sm leading-relaxed self-center" style={{ color: "var(--sp-gray)" }}>{s.desc}</p>
                  <div className="col-span-1 flex justify-end items-center">
                    <ArrowRight className="w-4 h-4 opacity-20 group-hover:opacity-50 transition-opacity" style={{ color: "var(--sp-black)" }} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="section-dark border-b" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-36">
          <FadeIn>
            <p className="label mb-12" style={{ color: "rgba(247,244,240,0.7)" }}>Client Voice</p>
          </FadeIn>
          <FadeUp>
            <blockquote
              className="font-serif leading-tight max-w-4xl"
              style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", color: "var(--sp-white)" }}
            >
              "Beyond Basics turned our profile into a lead machine. We went from 8 calls a month to over 250 — in 60 days."
            </blockquote>
          </FadeUp>
          <FadeIn delay={0.2}>
            <p className="font-sans text-sm mt-8" style={{ color: "rgba(247,244,240,0.7)" }}>
              Maria T., Owner — Urban Pizza · Growth Plan
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── MAPMASTER AI ── */}
      <section className="section-cream border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeUp>
            <p className="label mb-6">Proprietary Technology</p>
            <h2 className="font-serif leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--sp-black)" }}>
              MapMaster™ AI works while you sleep.
            </h2>
            <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: "var(--sp-gray)" }}>
              Our proprietary engine runs 24/7 — auto-scheduling posts for peak engagement, scoring review opportunities, and optimising signals that deliver 40% more visibility on average.
            </p>
            <button onClick={onAuditClick} className="btn btn-black">
              See It in Action <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </FadeUp>

          <FadeIn delay={0.15}>
            <div className="border bg-white" style={{ borderColor: "var(--sp-rule)" }}>
              <div className="px-6 py-4 border-b" style={{ borderColor: "var(--sp-rule)" }}>
                <p className="label">Live Rank Monitor — Urban Pizza</p>
              </div>
              {[
                { keyword: "pizza near me", before: "#14", after: "#2", delta: "+12" },
                { keyword: "italian restaurant", before: "#9", after: "#1", delta: "+8" },
                { keyword: "best lunch downtown", before: "#22", after: "#3", delta: "+19" },
              ].map((row) => (
                <div key={row.keyword} className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--sp-rule)" }}>
                  <span className="font-sans text-sm" style={{ color: "var(--sp-gray)" }}>{row.keyword}</span>
                  <div className="flex items-center gap-5">
                    <span className="font-sans text-xs line-through" style={{ color: "var(--sp-gray)", opacity: 0.5 }}>{row.before}</span>
                    <span className="font-sans text-xs font-medium" style={{ color: "#2d6a4f" }}>{row.delta}</span>
                    <span className="font-serif text-xl" style={{ color: "var(--sp-black)" }}>{row.after}</span>
                  </div>
                </div>
              ))}
              <div className="px-6 py-4">
                <p className="font-sans text-xs" style={{ color: "#2d6a4f" }}>Avg 40% visibility increase within 90 days</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <FadeUp>
            <p className="label mb-4">Pricing</p>
            <h2 className="font-serif leading-tight mb-16" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--sp-black)" }}>
              No contracts. No surprises.
            </h2>
          </FadeUp>
          <div
            className="grid md:grid-cols-3 gap-px"
            style={{ backgroundColor: "var(--sp-rule)" }}
          >
            {[
              {
                name: "Basic", price: "$200", note: "/mo",
                tagline: "Foundational maintenance. One location, consistent presence.",
                features: ["Single GBP location", "1–2 Google Posts/month", "NAP monitoring (50 dirs)", "Weekly + daily auto audit", "Basic review monitoring", "1-page monthly report", "Email support (48h)"],
              },
              {
                name: "Growth", price: "$500", note: "/mo",
                badge: "Most Popular",
                tagline: "Proactive growth for businesses targeting top-3.",
                features: ["Up to 5 locations", "Everything in Basic", "4–8 Posts + 2 videos/month", "Review automation (100 req/mo)", "AI response templates (24h)", "Competitor analysis (10 rivals)", "Bi-weekly dashboard + 5-page report", "Email/chat support (24h)"],
              },
              {
                name: "Premium", price: "$1,000", note: "/mo",
                tagline: "Enterprise domination for high-competition markets.",
                features: ["Up to 50 locations", "Everything in Growth", "Real-time 24/7 monitoring", "200+ review requests/month", "Sentiment analysis + white-label funnels", "12+ Posts + 360° tours", "100+ citations + schema markup", "Custom KPI dashboard + 20-page report", "Dedicated manager + phone support (2h)"],
              },
            ].map((plan, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="section-light p-8 lg:p-10 flex flex-col h-full">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-serif text-2xl" style={{ color: "var(--sp-black)" }}>{plan.name}</span>
                      {plan.badge && (
                        <span className="label px-2 py-0.5 border" style={{ borderColor: "var(--sp-rule)", color: "var(--sp-gray)" }}>
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs mb-5" style={{ color: "var(--sp-gray)" }}>{plan.tagline}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--sp-black)" }}>{plan.price}</span>
                      <span className="font-sans text-xs" style={{ color: "var(--sp-gray)" }}>{plan.note}</span>
                    </div>
                  </div>
                  <div className="flex-1 border-t pt-6 mb-8" style={{ borderColor: "var(--sp-rule)" }}>
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 font-sans text-sm" style={{ color: "var(--sp-gray)" }}>
                          <span className="mt-2 w-1 h-px shrink-0 inline-block" style={{ backgroundColor: "var(--sp-gray)" }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={onAuditClick} className="btn btn-outline w-full justify-center">
                    Start {plan.name}
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENTS MARQUEE ── */}
      <section className="border-b py-5 overflow-hidden" style={{ backgroundColor: "var(--sp-cream)", borderColor: "var(--sp-rule)" }} aria-hidden="true">
        <div className="flex">
          <div className="flex gap-16 items-center animate-marquee whitespace-nowrap">
            {["Urban Pizza", "Summit Dental", "City Auto", "Harbor Café", "Metro Fitness", "Peak Real Estate", "Blue Ridge Bakery", "Coastal Law Group",
              "Urban Pizza", "Summit Dental", "City Auto", "Harbor Café", "Metro Fitness", "Peak Real Estate", "Blue Ridge Bakery", "Coastal Law Group"].map((c, i) => (
              <span key={i} className="font-serif text-2xl shrink-0" style={{ color: "#737373" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS ── */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <FadeUp>
            <p className="label mb-4">Insights</p>
            <h2 className="font-serif leading-tight mb-16" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--sp-black)" }}>
              From the playbook.
            </h2>
          </FadeUp>
          <div
            className="grid md:grid-cols-3 gap-px border-t"
            style={{ backgroundColor: "var(--sp-rule)", borderColor: "var(--sp-rule)" }}
          >
            {homeFeaturedArticles.map((a, i) => (
              <FadeIn key={a.slug} delay={i * 0.07}>
                <Link href="/journal">
                  <div className="section-light px-8 py-8 group cursor-pointer h-full flex flex-col">
                    <div className="mb-5">
                      <span className="label block mb-1.5">{a.tag}</span>
                      <span className="font-sans text-xs" style={{ color: "var(--sp-gray)", opacity: 0.5 }}>{a.date} · {a.readTime}</span>
                    </div>
                    <h3 className="font-serif text-lg lg:text-xl leading-snug mb-4 group-hover:opacity-60 transition-opacity duration-300 flex-1" style={{ color: "var(--sp-black)" }}>{a.title}</h3>
                    <p className="font-sans text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: "var(--sp-gray)" }}>{a.excerpt}</p>
                    <div className="flex items-center gap-2">
                      <span className="label" style={{ color: "var(--sp-black)" }}>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" style={{ color: "var(--sp-black)" }} />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.2}>
            <div className="flex justify-end mt-8">
              <Link href="/journal" className="flex items-center gap-2 group label" style={{ color: "var(--sp-gray)" }}>
                View all articles
                <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FEATURED CUSTOMERS ── */}
      <section className="section-cream border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <FadeUp>
              <p className="label mb-4">Customers</p>
              <h2 className="font-serif leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--sp-black)" }}>
                Real businesses.<br />Real results.
              </h2>
            </FadeUp>
            <FadeIn delay={0.15}>
              <Link href="/customers" className="flex items-center gap-2 group label shrink-0" style={{ color: "var(--sp-gray)" }}>
                All 30 stories
                <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </FadeIn>
          </div>

          <div className="space-y-px border-t" style={{ borderColor: "var(--sp-rule)" }}>
            {homeFeaturedCustomers.map((c, i) => (
              <FadeIn key={c.id} delay={i * 0.04}>
                <Link href="/customers">
                  <div className="grid md:grid-cols-12 gap-6 py-6 border-b group hover:opacity-70 transition-opacity duration-200" style={{ borderColor: "var(--sp-rule)" }}>
                    <div className="md:col-span-4 flex items-center gap-3">
                      <span className="font-serif text-xl" style={{ color: "var(--sp-black)" }}>{c.business}</span>
                      <span className="font-sans text-xs" style={{ color: "var(--sp-gray)" }}>{c.type}</span>
                    </div>
                    <div className="md:col-span-5">
                      <p className="font-serif text-base leading-snug" style={{ color: "var(--sp-ink)" }}>"{c.quote1}"</p>
                      <p className="font-sans text-xs mt-1" style={{ color: "var(--sp-gray)" }}>— {c.owner}</p>
                    </div>
                    <div className="md:col-span-3 flex items-center justify-end gap-3">
                      <p className="font-sans text-xs text-right" style={{ color: "#163d2a" }}>{c.highlight}</p>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-25 group-hover:opacity-70 group-hover:translate-x-1 transition-all duration-200" style={{ color: "var(--sp-black)" }} />
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="flex justify-center mt-12">
              <Link href="/customers" className="btn btn-black">
                Read all 30 stories <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-48">
          <FadeUp>
            <h2
              className="font-serif leading-tight mb-10 max-w-4xl"
              style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)", color: "var(--sp-white)" }}
            >
              Ready to dominate Google Maps?
            </h2>
          </FadeUp>
          <FadeIn delay={0.2}>
            <p className="font-sans text-sm leading-relaxed mb-10 max-w-md" style={{ color: "rgba(247,244,240,0.75)" }}>
              Your audit is free. Your results are real. Join 500+ local businesses who chose to go Beyond Basics.
            </p>
            <button onClick={onAuditClick} className="btn btn-white">
              Claim Free Audit <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
