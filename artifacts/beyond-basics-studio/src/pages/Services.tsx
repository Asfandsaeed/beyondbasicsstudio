import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Plus, Minus } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";

const ease = [0.25, 0.1, 0.25, 1];
function FadeUp({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease, delay }} className={className}>{children}</motion.div>;
}
function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, ease: "easeOut", delay }} className={className}>{children}</motion.div>;
}

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "var(--sp-rule)" }}>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-5 text-left gap-6 group">
        <span className="font-serif text-xl sm:text-2xl group-hover:opacity-60 transition-opacity" style={{ color: "var(--sp-black)" }}>{q}</span>
        {open ? <Minus className="w-4 h-4 shrink-0" style={{ color: "var(--sp-gray)" }} /> : <Plus className="w-4 h-4 shrink-0" style={{ color: "var(--sp-gray)" }} />}
      </button>
      {open && <div className="pb-6 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>{a}</div>}
    </div>
  );
}

export default function Services({ onAuditClick }: { onAuditClick: () => void }) {
  return (
    <div style={{ backgroundColor: "var(--sp-white)" }}>
      <SchemaMarkup schema={[
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.beyondbasicsstudio.com/" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.beyondbasicsstudio.com/services" }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": "https://www.beyondbasicsstudio.com/services",
          "name": "GBP Management Services — Beyond Basics Studio",
          "description": "Full-spectrum Google Business Profile management tiers: Basic ($200/mo), Growth ($500/mo), and Premium ($1,000/mo) for single to enterprise-level local businesses.",
          "isPartOf": { "@type": "WebSite", "url": "https://www.beyondbasicsstudio.com/" }
        },
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "GBP Management Service Tiers",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "Service",
                "name": "Basic GBP Management",
                "description": "Single-location GBP maintenance. Daily automated + weekly manual audits, NAP monitoring across 50 directories, 1–2 Google Posts/month, Q&A seeding, basic review monitoring, 1-page monthly report, email support.",
                "offers": { "@type": "Offer", "price": "200", "priceCurrency": "USD", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "200", "priceCurrency": "USD", "unitText": "month" } }
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "Service",
                "name": "Growth GBP Management",
                "description": "Up to 5 locations. Includes everything in Basic plus 4–8 posts and 2 videos/month, review automation (100 requests/month), AI response templates, competitor gap analysis (10 rivals), bi-weekly dashboard, 5-page report.",
                "offers": { "@type": "Offer", "price": "500", "priceCurrency": "USD", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "500", "priceCurrency": "USD", "unitText": "month" } }
              }
            },
            {
              "@type": "ListItem",
              "position": 3,
              "item": {
                "@type": "Service",
                "name": "Premium GBP Management",
                "description": "Up to 50 locations. Real-time 24/7 monitoring, 200+ review requests/month, sentiment analysis, white-label funnels, 12+ posts/month, 360° tours, 100+ citations + schema markup, custom KPI dashboard, dedicated account manager.",
                "offers": { "@type": "Offer", "price": "1000", "priceCurrency": "USD", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "1000", "priceCurrency": "USD", "unitText": "month" } }
              }
            }
          ]
        }
      ]} />

      {/* Hero */}
      <section className="section-dark border-b" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <FadeIn><p className="label mb-6" style={{ color: "rgba(247,244,240,0.35)" }}>Services</p></FadeIn>
          <FadeUp>
            <h1 className="font-serif leading-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)", color: "var(--sp-white)" }}>
              GBP Tiers: Basic<br />to Domination.
            </h1>
          </FadeUp>
          <FadeIn delay={0.2}>
            <p className="font-sans text-sm leading-relaxed mt-8 max-w-md" style={{ color: "rgba(247,244,240,0.4)" }}>
              Every tier is engineered to move the needle. Choose based on your ambition — not your budget.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Feature table */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <FadeUp><p className="label mb-12">Feature Comparison</p></FadeUp>
          <FadeIn>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--sp-rule)" }}>
                    <th className="text-left pb-6 label w-[38%]">Feature</th>
                    {["Basic · $200", "Growth · $500", "Premium · $1k"].map(h => (
                      <th key={h} className="pb-6 font-serif text-xl text-center" style={{ color: "var(--sp-black)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Profile Audits", "Weekly + daily auto", "Daily + spam removal", "Real-time 24/7"],
                    ["NAP Monitoring", "50 directories", "100+ directories", "Full + suppression"],
                    ["Categories/Attributes", "10 categories", "20+ attributes", "Custom + voice search"],
                    ["Photos / Video", "20+ initial photos", "2 videos/mo + rotations", "Unlimited + 360° tours"],
                    ["Google Posts", "1–2/month", "4–8/month + events", "12+/month + live streams"],
                    ["Q&A Management", "5 seeded", "20+ answered/month", "Proactive + AI"],
                    ["Products / Menu", "—", "50 listings", "Schema + e-commerce"],
                    ["Review Monitoring", "Basic tracking", "50+/mo + templates", "200+ requests + sentiment"],
                    ["Review Responses", "—", "AI-personalized (24h)", "Custom + white-label"],
                    ["Keyword Tracking", "—", "Top 20 local terms", "Full pack + A/B tests"],
                    ["Competitor Analysis", "—", "10 rivals", "50+ + quarterly dives"],
                    ["Multi-Location", "Single only", "Up to 5", "Up to 50"],
                    ["Reporting", "1-page monthly", "Bi-weekly + 5-page", "Custom KPI + 20-page"],
                    ["Support", "Email (48h)", "Email/chat (24h)", "Dedicated + phone (2h)"],
                    ["Citations / SEO", "—", "Basic tweaks", "100+ builds + schema"],
                  ].map(([feat, b, g, p], i) => (
                    <tr key={i} className="border-b" style={{ borderColor: "var(--sp-rule)" }}>
                      <td className="py-4 font-sans text-sm" style={{ color: "var(--sp-gray)" }}>{feat}</td>
                      {[b, g, p].map((val, j) => (
                        <td key={j} className="py-4 text-center font-sans text-sm" style={{ color: val === "—" ? "rgba(17,17,17,0.2)" : "var(--sp-gray)" }}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tier cards */}
      <section className="section-cream border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <FadeUp><p className="label mb-12">Plans</p></FadeUp>
          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: "var(--sp-rule)" }}>
            {[
              { name: "Basic", price: "$200", note: "/mo", tagline: "Foundational maintenance for single-location businesses.",
                features: [
                  "Single GBP location",
                  "Full initial optimisation (20+ photos, description, URLs)",
                  "Daily automated + weekly manual profile audit",
                  "NAP monitoring across 50 directories",
                  "1–2 Google Posts/month with images & CTAs",
                  "Q&A seeding (5 proactive answers)",
                  "Basic review monitoring",
                  "Monthly 1-page PDF report",
                  "Email support (48h response)",
                ] },
              { name: "Growth", price: "$500", note: "/mo", badge: "Popular", tagline: "Proactive growth for multi-service businesses targeting top-3.",
                features: [
                  "Up to 5 GBP locations",
                  "Everything in Basic",
                  "Daily manual checks + automated review tracking",
                  "Review monitoring (50+/month) with AI response templates",
                  "Review request automation — 100 requests/month",
                  "Negative review triage & Google escalation",
                  "4–8 Google Posts/month + 2 videos/month",
                  "Product/menu listings (up to 50 items)",
                  "Competitor gap analysis (10 rivals)",
                  "Bi-weekly performance dashboard + 5-page report",
                  "Top 20 local keyword tracker",
                  "Email/chat support (24h) + quarterly strategy call",
                ] },
              { name: "Premium", price: "$1,000", note: "/mo", tagline: "Enterprise-level domination for high-competition markets.",
                features: [
                  "Up to 50 GBP locations",
                  "Everything in Growth",
                  "Real-time 24/7 monitoring with Slack/Teams alerts",
                  "200+ review requests/month (SMS, QR, widgets)",
                  "Sentiment analysis on 100% of reviews",
                  "White-label review funnels + custom campaigns",
                  "12+ Posts/month + video series (4/month)",
                  "360° virtual tour upload & optimisation",
                  "Deep SEO audit: schema markup + 100+ citations",
                  "Custom KPI dashboard (Data Studio) + 20-page report",
                  "Revenue attribution & competitor benchmarking (50+ rivals)",
                  "Dedicated account manager — weekly calls + phone (2h)",
                  "Crisis management for negative viral reviews",
                ] },
            ].map((plan, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="section-light p-8 lg:p-10 flex flex-col" style={{ minHeight: "500px" }}>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-serif text-2xl" style={{ color: "var(--sp-black)" }}>{plan.name}</span>
                      {(plan as any).badge && (
                        <span className="label px-2 py-0.5 border" style={{ borderColor: "var(--sp-rule)" }}>{(plan as any).badge}</span>
                      )}
                    </div>
                    <p className="font-sans text-xs mb-5" style={{ color: "var(--sp-gray)" }}>{plan.tagline}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--sp-black)" }}>{plan.price}</span>
                      <span className="font-sans text-xs" style={{ color: "var(--sp-gray)" }}>{plan.note}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1 border-t pt-6 mb-8" style={{ borderColor: "var(--sp-rule)" }}>
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-3 font-sans text-sm" style={{ color: "var(--sp-gray)" }}>
                        <span className="mt-2 w-1 h-px inline-block shrink-0" style={{ backgroundColor: "var(--sp-gray)" }} />{f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={onAuditClick} className="btn btn-outline w-full justify-center">Start {plan.name}</button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <FadeUp>
            <p className="label mb-4">Process</p>
            <h2 className="font-serif leading-tight mb-16" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--sp-black)" }}>
              From zero to domination<br />in four steps.
            </h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "var(--sp-rule)" }}>
            {[
              { step: "01", label: "GBP Audit", desc: "Full profile analysis, competitive landscape, and opportunity mapping." },
              { step: "02", label: "Strategy", desc: "Custom domination roadmap built around your market and goals." },
              { step: "03", label: "Implement", desc: "Full optimisation sprint across every profile signal and asset." },
              { step: "04", label: "Optimise", desc: "Continuous AI tuning and transparent monthly reporting." },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="section-light p-8">
                  <span className="font-sans text-5xl font-light mb-6 block" style={{ color: "var(--sp-rule)", lineHeight: 1 }}>{s.step}</span>
                  <h3 className="font-serif text-2xl mb-3" style={{ color: "var(--sp-black)" }}>{s.label}</h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-24">
          <FadeUp><p className="label mb-12">Questions</p></FadeUp>
          {[
            { q: "What's included in the initial setup?", a: "We begin with a comprehensive audit of your existing GBP, competitive analysis, and a full optimisation sprint — categories, attributes, business description, photos, and service areas — all within the first week." },
            { q: "How do you generate more reviews?", a: "We deploy proven post-transaction sequences via email and SMS, using Google's compliant review request methodology. Growth and Premium clients see an average 300% increase in monthly reviews within 60 days." },
            { q: "Can I upgrade or downgrade my plan?", a: "Absolutely. You can change tiers at any time with 30 days notice. Upgrades activate immediately; downgrades take effect at the next billing cycle. No penalties or lock-in." },
            { q: "What reporting will I receive?", a: "Detailed performance reports covering: profile views, search impressions, direction requests, call clicks, photo views, review growth, and map rank trends — weekly or monthly depending on your tier." },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.05}><Accordion q={item.q} a={item.a} /></FadeIn>
          ))}
          <div className="mt-12">
            <FadeIn><button onClick={onAuditClick} className="btn btn-black">Start with a Free Audit <ArrowRight className="w-3.5 h-3.5" /></button></FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
