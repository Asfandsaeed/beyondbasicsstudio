import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus, Search, Map, Rocket, BarChart3, Check, ChevronRight, RotateCcw } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";
import { usePageMeta } from "@/hooks/usePageMeta";

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
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
          <div className="pb-6 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>{a}</div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Plan Finder Quiz ──────────────────────────────────────────────────────────

const QUIZ_STEPS = [
  {
    q: "How many locations do you manage?",
    options: [
      { label: "Just 1", value: "basic" },
      { label: "2 – 5", value: "growth" },
      { label: "6 or more", value: "premium" },
    ],
  },
  {
    q: "What's your primary goal right now?",
    options: [
      { label: "Stay visible and consistent", value: "basic" },
      { label: "Break into the top 3 Map Pack", value: "growth" },
      { label: "Dominate an entire market or region", value: "premium" },
    ],
  },
  {
    q: "How involved do you want to be?",
    options: [
      { label: "Set it and forget it", value: "basic" },
      { label: "Regular check-ins and strategy calls", value: "growth" },
      { label: "A dedicated partner managing everything", value: "premium" },
    ],
  },
];

const PLAN_DETAILS: Record<string, { name: string; price: string; tagline: string; colour: string }> = {
  basic: { name: "Basic", price: "$200/mo", tagline: "Solid foundation for single-location businesses that need consistent visibility without complexity.", colour: "var(--sp-green)" },
  growth: { name: "Growth", price: "$500/mo", tagline: "The right tool for ambitious owners who want top-3 rankings and a review machine that runs itself.", colour: "var(--sp-green)" },
  premium: { name: "Premium", price: "$1,000/mo", tagline: "Enterprise-grade domination for multi-location brands or high-competition markets where second place costs real money.", colour: "var(--sp-green)" },
};

function tally(answers: string[]): string {
  const counts: Record<string, number> = { basic: 0, growth: 0, premium: 0 };
  answers.forEach(a => { if (counts[a] !== undefined) counts[a]++; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function PlanFinder({ onAuditClick }: { onAuditClick: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = step === QUIZ_STEPS.length;
  const result = done ? tally(answers) : null;
  const plan = result ? PLAN_DETAILS[result] : null;

  function choose(val: string) {
    const next = [...answers, val];
    setAnswers(next);
    setStep(step + 1);
  }
  function reset() { setStep(0); setAnswers([]); }

  return (
    <div className="border" style={{ borderColor: "var(--sp-rule)", backgroundColor: "var(--sp-white)" }}>
      {/* Header */}
      <div className="border-b px-8 py-6 flex items-center justify-between" style={{ borderColor: "var(--sp-rule)" }}>
        <p className="label">Which plan is right for me?</p>
        {step > 0 && !done && (
          <button onClick={reset} className="label flex items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
            <RotateCcw className="w-3 h-3" /> Restart
          </button>
        )}
      </div>

      <div className="px-8 py-10">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
              {/* Progress */}
              <div className="flex gap-1.5 mb-8">
                {QUIZ_STEPS.map((_, i) => (
                  <div key={i} className="h-px flex-1 transition-colors duration-300" style={{ backgroundColor: i <= step ? "var(--sp-black)" : "var(--sp-rule)" }} />
                ))}
              </div>
              <p className="label mb-5" style={{ color: "var(--sp-gray)" }}>Question {step + 1} of {QUIZ_STEPS.length}</p>
              <h3 className="font-serif text-2xl sm:text-3xl mb-8" style={{ color: "var(--sp-black)" }}>{QUIZ_STEPS[step].q}</h3>
              <div className="flex flex-col gap-3">
                {QUIZ_STEPS[step].options.map(opt => (
                  <button key={opt.value} onClick={() => choose(opt.value)}
                    className="flex items-center justify-between px-6 py-4 border text-left transition-colors group hover:border-current"
                    style={{ borderColor: "var(--sp-rule)", color: "var(--sp-black)" }}>
                    <span className="font-sans text-sm">{opt.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <p className="label mb-2" style={{ color: "var(--sp-gray)" }}>Our recommendation</p>
              <h3 className="font-serif leading-tight mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--sp-green)" }}>
                {plan!.name} Plan
              </h3>
              <p className="font-sans text-sm mb-1" style={{ color: "var(--sp-gray)" }}>{plan!.price} · No lock-in</p>
              <p className="font-sans text-sm leading-relaxed mt-4 mb-8 max-w-md" style={{ color: "var(--sp-gray)" }}>{plan!.tagline}</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={onAuditClick} className="btn btn-black">Get Started — Free Audit <ArrowRight className="w-3.5 h-3.5" /></button>
                <button onClick={reset} className="btn btn-outline flex items-center gap-2"><RotateCcw className="w-3 h-3" /> Retake</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Tier cards ────────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: "Basic",
    price: "$200",
    note: "/mo",
    locations: "1 location",
    tagline: "Foundational maintenance for single-location businesses.",
    badge: null,
    dark: false,
    features: [
      "Full initial profile optimisation",
      "Daily auto + weekly manual audit",
      "NAP monitoring across 50+ directories",
      "1–2 Google Posts/month with images & CTAs",
      "Q&A seeding (5 proactive answers)",
      "Basic review monitoring",
      "Monthly 1-page PDF report",
      "Email support (48h)",
    ],
    cta: "Start Basic",
  },
  {
    name: "Growth",
    price: "$500",
    note: "/mo",
    locations: "Up to 5 locations",
    tagline: "Proactive growth for multi-service businesses targeting top-3.",
    badge: "Most Popular",
    dark: false,
    features: [
      "Everything in Basic",
      "4–8 Google Posts/month + 2 videos",
      "Review automation — 100 requests/month",
      "AI-personalised review responses (24h)",
      "Negative review triage + Google escalation",
      "Product/menu listings (up to 50 items)",
      "Competitor gap analysis (10 rivals)",
      "Bi-weekly dashboard + 5-page report",
      "Top 20 local keyword tracker",
      "Email/chat support (24h) + quarterly call",
    ],
    cta: "Start Growth",
  },
  {
    name: "Premium",
    price: "$1,000",
    note: "/mo",
    locations: "Up to 50 locations",
    tagline: "Enterprise domination for high-competition markets.",
    badge: null,
    dark: true,
    features: [
      "Everything in Growth",
      "Real-time 24/7 monitoring + Slack alerts",
      "200+ review requests/month (SMS, QR, widgets)",
      "Sentiment analysis on 100% of reviews",
      "White-label review funnels + campaigns",
      "12+ Posts/month + video series (4/month)",
      "360° virtual tour upload & optimisation",
      "100+ citations + schema markup",
      "Custom KPI dashboard + 20-page report",
      "Revenue attribution & 50+ rival benchmarking",
      "Dedicated account manager + weekly calls",
      "Crisis management for viral negative reviews",
    ],
    cta: "Start Premium",
  },
];

export default function Services({ onAuditClick }: { onAuditClick: () => void }) {
  usePageMeta({ title: "Services — Beyond Basics Studio", description: "GBP tiers from Basic to Domination. Every tier is engineered to move the needle. Choose based on your ambition — not your budget.", ogImage: "services.jpg", url: "/services" });

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
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "What's included in the initial setup?", "acceptedAnswer": { "@type": "Answer", "text": "We begin with a comprehensive audit of your existing GBP, competitive analysis, and a full optimisation sprint — categories, attributes, business description, photos, and service areas — all within the first week. No setup fee." } },
            { "@type": "Question", "name": "How do you generate more reviews?", "acceptedAnswer": { "@type": "Answer", "text": "We deploy proven post-transaction sequences via email and SMS, using Google's compliant review request methodology. Growth and Premium clients see an average 300% increase in monthly reviews within 60 days." } },
            { "@type": "Question", "name": "How long until I see results?", "acceptedAnswer": { "@type": "Answer", "text": "Most clients see measurable improvements in profile views and call volume within 30 days. Map Pack ranking improvements typically arrive within 60–90 days. We track and report on everything transparently." } },
            { "@type": "Question", "name": "What if my GBP gets suspended?", "acceptedAnswer": { "@type": "Answer", "text": "Suspension recovery is included on all plans. We've successfully reinstated 43 suspended profiles with a 91% success rate. If your profile is suspended while under our management, we handle the reinstatement process at no additional cost." } },
          ]
        }
      ]} />

      {/* Hero */}
      <section className="section-dark border-b" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <FadeIn><p className="label mb-6" style={{ color: "rgba(247,244,240,0.7)" }}>Services</p></FadeIn>
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

      {/* ── Tier Cards ─────────────────────────────────────────────────────── */}
      <section className="section-cream border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <FadeUp><p className="label mb-12">Plans</p></FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <FadeIn key={plan.name} delay={i * 0.1}>
                <div
                  className="flex flex-col h-full relative"
                  style={{
                    backgroundColor: plan.dark ? "var(--sp-ink)" : "var(--sp-white)",
                    border: plan.badge
                      ? "2px solid var(--sp-green)"
                      : plan.dark
                      ? "2px solid rgba(255,255,255,0.08)"
                      : "1px solid var(--sp-rule)",
                  }}
                >
                  {/* Most Popular badge */}
                  {plan.badge && (
                    <div className="absolute -top-px left-0 right-0 flex justify-center">
                      <span className="label px-4 py-1.5 text-xs" style={{ backgroundColor: "var(--sp-green)", color: "var(--sp-white)", letterSpacing: "0.14em" }}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className={`p-8 lg:p-10 flex flex-col flex-1 ${plan.badge ? "pt-10" : ""}`}>
                    {/* Header */}
                    <div className="mb-8">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="font-serif text-2xl" style={{ color: plan.dark ? "var(--sp-white)" : "var(--sp-black)" }}>{plan.name}</span>
                        <span className="label text-xs" style={{ color: plan.dark ? "rgba(247,244,240,0.4)" : "var(--sp-gray)" }}>{plan.locations}</span>
                      </div>
                      <p className="font-sans text-xs leading-relaxed mb-6" style={{ color: plan.dark ? "rgba(247,244,240,0.45)" : "var(--sp-gray)" }}>{plan.tagline}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif leading-none" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: plan.dark ? "var(--sp-white)" : plan.badge ? "var(--sp-green)" : "var(--sp-black)" }}>{plan.price}</span>
                        <span className="font-sans text-xs" style={{ color: plan.dark ? "rgba(247,244,240,0.4)" : "var(--sp-gray)" }}>{plan.note}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="space-y-3 flex-1 border-t pt-6 mb-8" style={{ borderColor: plan.dark ? "rgba(255,255,255,0.08)" : "var(--sp-rule)" }}>
                      {plan.features.map(f => (
                        <li key={f} className="flex items-start gap-3 font-sans text-sm">
                          <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: plan.dark ? "rgba(247,244,240,0.35)" : plan.badge ? "var(--sp-green)" : "var(--sp-gray)" }} />
                          <span style={{ color: plan.dark ? "rgba(247,244,240,0.6)" : "var(--sp-gray)" }}>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <button
                      onClick={onAuditClick}
                      className="btn w-full justify-center"
                      style={
                        plan.dark
                          ? { backgroundColor: "var(--sp-white)", color: "var(--sp-ink)", border: "none" }
                          : plan.badge
                          ? { backgroundColor: "var(--sp-green)", color: "var(--sp-white)", border: "none" }
                          : { backgroundColor: "transparent", color: "var(--sp-black)", border: "1px solid var(--sp-rule)" }
                      }
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plan Finder Quiz ────────────────────────────────────────────────── */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-24">
          <FadeUp>
            <p className="label mb-4">Not sure?</p>
            <h2 className="font-serif leading-tight mb-12" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--sp-black)" }}>
              Find the right plan in 30 seconds.
            </h2>
          </FadeUp>
          <FadeIn delay={0.1}>
            <PlanFinder onAuditClick={onAuditClick} />
          </FadeIn>
        </div>
      </section>

      {/* ── How It Works — horizontal timeline ─────────────────────────────── */}
      <section className="section-cream border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <FadeUp>
            <p className="label mb-4">Process</p>
            <h2 className="font-serif leading-tight mb-16" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--sp-black)" }}>
              From zero to domination<br />in four steps.
            </h2>
          </FadeUp>

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:block">
            {/* Connecting line */}
            <div className="relative">
              <div className="absolute top-8 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px" style={{ backgroundColor: "var(--sp-rule)" }} />
              <div className="grid grid-cols-4 gap-0">
                {[
                  { step: "01", label: "GBP Audit", desc: "Full profile analysis, competitive landscape mapping, and opportunity identification.", Icon: Search },
                  { step: "02", label: "Strategy", desc: "Custom domination roadmap built around your exact market, competition, and goals.", Icon: Map },
                  { step: "03", label: "Implement", desc: "Full optimisation sprint across every profile signal — categories, photos, posts, Q&A.", Icon: Rocket },
                  { step: "04", label: "Optimise", desc: "Continuous AI tuning, proactive posting, and transparent monthly reporting.", Icon: BarChart3 },
                ].map((s, i) => (
                  <FadeIn key={s.step} delay={i * 0.1}>
                    <div className="px-8 flex flex-col items-center text-center">
                      {/* Icon circle on the line */}
                      <div className="relative z-10 w-16 h-16 rounded-full border-2 flex items-center justify-center mb-6" style={{ backgroundColor: "var(--sp-cream)", borderColor: "var(--sp-rule)" }}>
                        <s.Icon className="w-6 h-6" style={{ color: "var(--sp-green)" }} />
                      </div>
                      <span className="label mb-2" style={{ color: "var(--sp-gray)" }}>{s.step}</span>
                      <h3 className="font-serif text-2xl mb-3" style={{ color: "var(--sp-black)" }}>{s.label}</h3>
                      <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>{s.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: vertical list */}
          <div className="lg:hidden flex flex-col gap-0 border-l-2" style={{ borderColor: "var(--sp-rule)" }}>
            {[
              { step: "01", label: "GBP Audit", desc: "Full profile analysis, competitive landscape mapping, and opportunity identification.", Icon: Search },
              { step: "02", label: "Strategy", desc: "Custom domination roadmap built around your exact market, competition, and goals.", Icon: Map },
              { step: "03", label: "Implement", desc: "Full optimisation sprint across every profile signal — categories, photos, posts, Q&A.", Icon: Rocket },
              { step: "04", label: "Optimise", desc: "Continuous AI tuning, proactive posting, and transparent monthly reporting.", Icon: BarChart3 },
            ].map((s, i) => (
              <FadeIn key={s.step} delay={i * 0.08}>
                <div className="pl-8 pb-10 relative">
                  <div className="absolute -left-[1.125rem] top-0 w-9 h-9 rounded-full border-2 flex items-center justify-center" style={{ backgroundColor: "var(--sp-cream)", borderColor: "var(--sp-rule)" }}>
                    <s.Icon className="w-4 h-4" style={{ color: "var(--sp-green)" }} />
                  </div>
                  <span className="label mb-1 block" style={{ color: "var(--sp-gray)" }}>{s.step}</span>
                  <h3 className="font-serif text-2xl mb-2" style={{ color: "var(--sp-black)" }}>{s.label}</h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature comparison table ────────────────────────────────────────── */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <FadeUp><p className="label mb-12">Feature Comparison</p></FadeUp>
          <FadeIn>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--sp-rule)" }}>
                    <th className="text-left pb-6 label w-[38%]">Feature</th>
                    <th className="pb-6 font-serif text-xl text-center" style={{ color: "var(--sp-black)" }}>Basic · $200</th>
                    <th className="pb-6 text-center">
                      <span className="font-serif text-xl" style={{ color: "var(--sp-green)" }}>Growth · $500</span>
                      <span className="ml-2 label px-1.5 py-0.5 text-xs" style={{ backgroundColor: "var(--sp-green)", color: "var(--sp-white)", verticalAlign: "middle" }}>★</span>
                    </th>
                    <th className="pb-6 font-serif text-xl text-center" style={{ color: "var(--sp-black)" }}>Premium · $1k</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Locations", "1", "Up to 5", "Up to 50"],
                    ["Profile Audits", "Weekly + daily auto", "Daily + spam removal", "Real-time 24/7"],
                    ["NAP Monitoring", "50 directories", "100+ directories", "Full + suppression"],
                    ["Photos / Video", "20+ initial photos", "2 videos/mo + rotations", "Unlimited + 360° tours"],
                    ["Google Posts", "1–2/month", "4–8/month + events", "12+/month + live streams"],
                    ["Q&A Management", "5 seeded", "20+ answered/month", "Proactive + AI"],
                    ["Products / Menu", "—", "50 listings", "Schema + e-commerce"],
                    ["Review Requests", "—", "100/month", "200+/month"],
                    ["Review Responses", "—", "AI-personalized (24h)", "Custom + white-label"],
                    ["Keyword Tracking", "—", "Top 20 local terms", "Full pack + A/B tests"],
                    ["Competitor Analysis", "—", "10 rivals", "50+ + quarterly dives"],
                    ["Reporting", "1-page monthly", "Bi-weekly + 5-page", "Custom KPI + 20-page"],
                    ["Support", "Email (48h)", "Email/chat (24h)", "Dedicated + phone (2h)"],
                    ["Citations / Schema", "—", "Basic tweaks", "100+ builds + schema"],
                    ["Suspension Recovery", "Included", "Included", "Priority + crisis mgmt"],
                  ].map(([feat, b, g, p], i) => (
                    <tr key={i} className="border-b" style={{ borderColor: "var(--sp-rule)" }}>
                      <td className="py-4 font-sans text-sm" style={{ color: "var(--sp-gray)" }}>{feat}</td>
                      <td className="py-4 text-center font-sans text-sm" style={{ color: b === "—" ? "var(--sp-rule)" : "var(--sp-gray)" }}>{b}</td>
                      <td className="py-4 text-center font-sans text-sm font-medium" style={{ color: g === "—" ? "var(--sp-rule)" : "var(--sp-green)" }}>{g}</td>
                      <td className="py-4 text-center font-sans text-sm" style={{ color: p === "—" ? "var(--sp-rule)" : "var(--sp-gray)" }}>{p}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── In-house vs Premium ─────────────────────────────────────────────── */}
      <section className="section-dark border-b" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-24">
          <FadeUp>
            <p className="label mb-4" style={{ color: "rgba(247,244,240,0.5)" }}>The real cost question</p>
            <h2 className="font-serif leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--sp-white)" }}>
              What an in-house hire<br />actually costs you.
            </h2>
            <p className="font-sans text-sm leading-relaxed mb-16 max-w-lg" style={{ color: "rgba(247,244,240,0.45)" }}>
              Many businesses assume hiring internally is cheaper. The math rarely holds up.
            </p>
          </FadeUp>

          <FadeIn>
            <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: "rgba(255,255,255,0.07)" }}>
              {/* In-house column */}
              <div className="p-8 lg:p-10" style={{ backgroundColor: "var(--sp-ink)" }}>
                <p className="label mb-6" style={{ color: "rgba(247,244,240,0.4)" }}>In-House GBP Manager</p>
                <div className="space-y-4 mb-8">
                  {[
                    ["Base salary (entry-level)", "$52,000/yr"],
                    ["Payroll taxes + benefits", "$12,000/yr"],
                    ["GBP tools & software", "$3,600/yr"],
                    ["Training & conferences", "$2,000/yr"],
                    ["Management overhead", "$4,000/yr"],
                    ["Recruitment cost (one-time)", "$8,000"],
                  ].map(([label, val]) => (
                    <div key={label} className="flex items-baseline justify-between gap-4 border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <span className="font-sans text-sm" style={{ color: "rgba(247,244,240,0.5)" }}>{label}</span>
                      <span className="font-sans text-sm shrink-0" style={{ color: "rgba(247,244,240,0.7)" }}>{val}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <p className="label mb-1" style={{ color: "rgba(247,244,240,0.4)" }}>Total Year 1</p>
                  <p className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "rgba(247,244,240,0.5)" }}>$81,600</p>
                </div>
              </div>

              {/* Premium column */}
              <div className="p-8 lg:p-10 relative" style={{ backgroundColor: "var(--sp-ink)" }}>
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ backgroundColor: "var(--sp-green)" }} />
                <p className="label mb-6" style={{ color: "rgba(247,244,240,0.4)" }}>Beyond Basics Premium</p>
                <div className="space-y-4 mb-8">
                  {[
                    ["Monthly fee × 12", "$12,000/yr"],
                    ["Setup fee", "$0"],
                    ["Tools & software", "$0 — included"],
                    ["Dedicated account manager", "Included"],
                    ["24/7 monitoring + alerts", "Included"],
                    ["Proven team of 4+ specialists", "Included"],
                  ].map(([label, val]) => (
                    <div key={label} className="flex items-baseline justify-between gap-4 border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <span className="font-sans text-sm" style={{ color: "rgba(247,244,240,0.5)" }}>{label}</span>
                      <span className="font-sans text-sm shrink-0" style={{ color: "var(--sp-white)" }}>{val}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <p className="label mb-1" style={{ color: "var(--sp-green)" }}>Total Year 1</p>
                  <p className="font-serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--sp-white)" }}>$12,000</p>
                </div>
              </div>
            </div>

            {/* Savings callout */}
            <div className="mt-px p-8 text-center" style={{ backgroundColor: "rgba(26,77,53,0.25)", border: "1px solid var(--sp-green)" }}>
              <p className="label mb-2" style={{ color: "var(--sp-green)" }}>You save</p>
              <p className="font-serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--sp-white)" }}>$69,600</p>
              <p className="font-sans text-sm mt-2" style={{ color: "rgba(247,244,240,0.4)" }}>in Year 1 alone — and our team has managed 500+ profiles vs. a new hire learning on the job.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="section-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-24">
          <FadeUp><p className="label mb-12">Questions</p></FadeUp>
          {[
            {
              q: "What's included in the initial setup?",
              a: "We begin with a comprehensive audit of your existing GBP, competitive analysis, and a full optimisation sprint — categories, attributes, business description, photos, and service areas — all within the first week. There is no setup fee; setup is included in your first month.",
            },
            {
              q: "How long until I see results?",
              a: "Most clients see measurable improvements in profile views and call volume within 30 days of the initial optimisation. Map Pack ranking improvements typically arrive within 60–90 days. We track every metric and report transparently — no vanity numbers.",
            },
            {
              q: "How do you generate more reviews?",
              a: "We deploy proven post-transaction review request sequences via email and SMS, using Google's compliant methodology. Growth and Premium clients see an average 300% increase in monthly reviews within 60 days. We never incentivise reviews or use tactics that violate Google's terms.",
            },
            {
              q: "What if my GBP profile gets suspended?",
              a: "Suspension recovery is included on all plans at no extra cost. Since 2021 we've managed recovery for 43 suspended profiles with a 91% success rate — most reinstated within 30 days. Premium clients receive priority handling and a dedicated crisis escalation contact.",
            },
            {
              q: "Can I upgrade or downgrade my plan?",
              a: "Absolutely. You can change tiers at any time with 30 days notice. Upgrades activate immediately; downgrades take effect at the next billing cycle. No penalties, no lock-in, no nonsense.",
            },
            {
              q: "Do you work with businesses that have no GBP profile yet?",
              a: "Yes. We handle the entire setup from scratch — verification, category selection, service area configuration, and initial content — as part of your first month at no additional fee.",
            },
            {
              q: "What industries do you work with?",
              a: "Our client roster covers 18+ industries: restaurants, dental and medical practices, law firms, auto repair, fitness studios, salons, real estate, e-commerce with physical locations, hospitality, and more. The Customers page has 30 detailed case studies across these categories.",
            },
            {
              q: "What reporting will I receive?",
              a: "All plans include performance reports covering profile views, search impressions, direction requests, call clicks, photo views, review growth, and map rank trends. Basic gets a 1-page monthly PDF. Growth gets a bi-weekly dashboard plus a 5-page report. Premium gets a fully custom KPI dashboard and a 20-page monthly report with revenue attribution.",
            },
            {
              q: "Is there a contract or lock-in period?",
              a: "No contracts. No lock-in. All plans run month-to-month. The only commitment is 30 days notice for cancellations or downgrades — which we ask for so we can hand off your profile cleanly without anything falling through the cracks.",
            },
            {
              q: "How is this different from doing it ourselves?",
              a: "Doing GBP well requires daily vigilance, knowledge of algorithm changes, review response craft, content strategy, competitor monitoring, and technical SEO — across every category signal Google uses. Most business owners spend 2–4 hours per week doing it inconsistently. We do it full-time, for 500+ profiles, and our team has institutional knowledge that individual operators simply can't replicate.",
            },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.04}><Accordion q={item.q} a={item.a} /></FadeIn>
          ))}
          <div className="mt-12">
            <FadeIn>
              <button onClick={onAuditClick} className="btn btn-black">
                Start with a Free Audit <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
