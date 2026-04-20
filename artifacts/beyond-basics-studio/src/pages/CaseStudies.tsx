import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, TrendingUp } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";
import { usePageMeta } from "@/hooks/usePageMeta";
import { Link } from "wouter";

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

// ─── Before → After Rank Visual ───────────────────────────────────────────────

function RankVisual({ before, after, duration }: {
  before: { rank: string; views: string; calls: string };
  after: { rank: string; views: string; calls: string };
  duration: string;
}) {
  const beforeNum = parseInt(before.rank.replace("#", ""));
  const afterNum = parseInt(after.rank.replace("#", ""));
  const improvement = beforeNum - afterNum;

  return (
    <div className="relative flex items-stretch gap-0 overflow-hidden" style={{ backgroundColor: "var(--sp-ink)" }}>
      {/* Before panel */}
      <div className="flex-1 p-6 flex flex-col justify-between" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <p className="label mb-4" style={{ color: "rgba(247,244,240,0.3)", fontSize: "0.6rem", letterSpacing: "0.18em" }}>BEFORE</p>
          {/* Simulated map pack — before */}
          <div className="space-y-1.5 mb-4">
            {Array.from({ length: 3 }).map((_, i) => {
              const pos = i + 1;
              const isClient = pos === Math.min(beforeNum, 3);
              return (
                <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded" style={{
                  backgroundColor: isClient ? "rgba(255,255,255,0.06)" : "transparent",
                  border: isClient ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
                }}>
                  <div className="w-5 h-5 rounded-sm flex items-center justify-center shrink-0" style={{ backgroundColor: isClient ? "rgba(150,150,150,0.25)" : "rgba(255,255,255,0.04)" }}>
                    <span style={{ fontSize: "0.5rem", color: isClient ? "rgba(247,244,240,0.5)" : "rgba(247,244,240,0.15)", fontVariantNumeric: "tabular-nums" }}>{pos}</span>
                  </div>
                  <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: isClient ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)" }} />
                </div>
              );
            })}
            {beforeNum > 3 && (
              <div className="flex items-center gap-2 px-2.5 py-1.5">
                <span style={{ fontSize: "0.55rem", color: "rgba(247,244,240,0.2)" }}>···</span>
              </div>
            )}
            {beforeNum > 3 && (
              <div className="flex items-center gap-2 px-2.5 py-2 rounded" style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}>
                <div className="w-5 h-5 rounded-sm flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(150,150,150,0.25)" }}>
                  <span style={{ fontSize: "0.5rem", color: "rgba(247,244,240,0.5)", fontVariantNumeric: "tabular-nums" }}>{beforeNum}</span>
                </div>
                <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin className="w-3 h-3" style={{ color: "rgba(247,244,240,0.25)" }} />
            <span className="font-serif text-2xl" style={{ color: "rgba(247,244,240,0.25)" }}>{before.rank}</span>
          </div>
          <p style={{ fontSize: "0.6rem", color: "rgba(247,244,240,0.2)", lineHeight: 1.4 }}>{before.views} views<br />{before.calls} calls</p>
        </div>
      </div>

      {/* Center arrow + duration */}
      <div className="flex flex-col items-center justify-center px-3 py-4" style={{ minWidth: "60px" }}>
        <div className="mb-2 flex flex-col items-center gap-1">
          <TrendingUp className="w-4 h-4" style={{ color: "var(--sp-green)" }} />
          <div className="w-px flex-1 min-h-[20px]" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
        </div>
        <p style={{ fontSize: "0.55rem", color: "rgba(247,244,240,0.25)", letterSpacing: "0.1em", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{duration}</p>
      </div>

      {/* After panel */}
      <div className="flex-1 p-6 flex flex-col justify-between" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <p className="label mb-4" style={{ color: "var(--sp-green)", fontSize: "0.6rem", letterSpacing: "0.18em" }}>AFTER</p>
          {/* Simulated map pack — after (top 3 always) */}
          <div className="space-y-1.5 mb-4">
            {Array.from({ length: Math.min(afterNum + 1, 3) }).map((_, i) => {
              const pos = i + 1;
              const isClient = pos === afterNum;
              return (
                <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded" style={{
                  backgroundColor: isClient ? "rgba(26,77,53,0.35)" : "transparent",
                  border: isClient ? "1px solid rgba(26,77,53,0.6)" : "1px solid transparent",
                }}>
                  <div className="w-5 h-5 rounded-sm flex items-center justify-center shrink-0" style={{ backgroundColor: isClient ? "var(--sp-green)" : "rgba(255,255,255,0.04)" }}>
                    <span style={{ fontSize: "0.5rem", color: isClient ? "var(--sp-white)" : "rgba(247,244,240,0.15)", fontVariantNumeric: "tabular-nums" }}>{pos}</span>
                  </div>
                  <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: isClient ? "rgba(26,77,53,0.5)" : "rgba(255,255,255,0.05)" }} />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin className="w-3 h-3" style={{ color: "var(--sp-green)" }} />
            <span className="font-serif text-2xl" style={{ color: "var(--sp-white)" }}>{after.rank}</span>
          </div>
          <p style={{ fontSize: "0.6rem", color: "rgba(247,244,240,0.45)", lineHeight: 1.4 }}>{after.views} views<br />{after.calls} calls</p>
        </div>
      </div>

      {/* Improvement badge */}
      {improvement > 0 && (
        <div className="absolute top-3 right-3">
          <span className="label px-2 py-1" style={{ backgroundColor: "var(--sp-green)", color: "var(--sp-white)", fontSize: "0.55rem", letterSpacing: "0.12em" }}>
            +{improvement} SPOTS
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Avatar initials ──────────────────────────────────────────────────────────

function Avatar({ name, dark = false }: { name: string; dark?: boolean }) {
  const initials = name
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-sans font-medium" style={{
      fontSize: "0.65rem",
      letterSpacing: "0.06em",
      backgroundColor: dark ? "rgba(255,255,255,0.08)" : "var(--sp-cream)",
      color: dark ? "rgba(247,244,240,0.6)" : "var(--sp-gray)",
      border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--sp-rule)",
    }}>
      {initials}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const cases = [
  {
    business: "Urban Pizza", type: "Restaurant", location: "Chicago, IL",
    before: { views: "180/mo", rank: "#14", reviews: "12", calls: "8/mo" },
    after: { views: "5,200/mo", rank: "#2", reviews: "214", calls: "268/mo" },
    quote: "We went from 8 calls a month to 268. Best investment we've ever made.",
    author: "Maria T., Owner", tier: "Growth", duration: "90 days", highlight: "+3,250% profile views",
  },
  {
    business: "Summit Dental", type: "Healthcare", location: "Denver, CO",
    before: { views: "320/mo", rank: "#9", reviews: "28", calls: "22/mo" },
    after: { views: "8,100/mo", rank: "#1", reviews: "312", calls: "190/mo" },
    quote: "From page-2 obscurity to the top spot. New patients up 750%.",
    author: "Dr. James R., Practice Owner", tier: "Premium", duration: "60 days", highlight: "#1 in Local Map Pack",
  },
  {
    business: "City Auto Repair", type: "Automotive", location: "Austin, TX",
    before: { views: "95/mo", rank: "#11", reviews: "6", calls: "5/mo" },
    after: { views: "3,800/mo", rank: "#3", reviews: "187", calls: "145/mo" },
    quote: "I thought GBP was just a listing. It's now my biggest revenue driver.",
    author: "Carlos M., Owner", tier: "Growth", duration: "120 days", highlight: "+2,800% call volume",
  },
  {
    business: "Harbor Café", type: "Café & Bakery", location: "Portland, OR",
    before: { views: "210/mo", rank: "#7", reviews: "19", calls: "12/mo" },
    after: { views: "6,400/mo", rank: "#1", reviews: "401", calls: "98/mo" },
    quote: "Our weekend wait times doubled. Best problem we've ever had.",
    author: "Sarah L., Co-owner", tier: "Premium", duration: "75 days", highlight: "400+ Google Reviews",
  },
  {
    business: "Metro Fitness", type: "Gym & Fitness", location: "Miami, FL",
    before: { views: "440/mo", rank: "#8", reviews: "31", calls: "18/mo" },
    after: { views: "9,200/mo", rank: "#2", reviews: "560", calls: "312/mo" },
    quote: "New membership signups from Google Maps increased 5×. The ROI is insane.",
    author: "Derek J., Marketing Director", tier: "Premium", duration: "90 days", highlight: "5× membership signups",
  },
  {
    business: "Peak Real Estate", type: "Real Estate", location: "Seattle, WA",
    before: { views: "120/mo", rank: "#15", reviews: "8", calls: "4/mo" },
    after: { views: "4,100/mo", rank: "#3", reviews: "143", calls: "89/mo" },
    quote: "We closed 4 listings in one month that came directly from Google Maps.",
    author: "Amanda P., Principal Agent", tier: "Growth", duration: "105 days", highlight: "4 direct Map Pack closes",
  },
];

const ALL_INDUSTRIES = ["All", ...Array.from(new Set(cases.map(c => c.type)))];

export default function CaseStudies({ onAuditClick }: { onAuditClick: () => void }) {
  usePageMeta({ title: "Work — Beyond Basics Studio", description: "Proof, not pitches. Actual before/after results from real clients who chose to stop being invisible on Google Maps.", ogImage: "work.jpg", url: "/case-studies" });

  const [activeIndustry, setActiveIndustry] = useState("All");
  const filtered = activeIndustry === "All" ? cases : cases.filter(c => c.type === activeIndustry);

  return (
    <div style={{ backgroundColor: "var(--sp-white)" }}>
      <SchemaMarkup schema={[
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://beyondbasics.studio/" },
            { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://beyondbasics.studio/case-studies" }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Client Case Studies",
          "itemListElement": cases.map((c, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "item": {
              "@type": "Article",
              "headline": `${c.business} — ${c.highlight}`,
              "description": `${c.type} in ${c.location}. Profile views: ${c.before.views} → ${c.after.views}. Map rank: ${c.before.rank} → ${c.after.rank}. Reviews: ${c.before.reviews} → ${c.after.reviews}. Calls: ${c.before.calls} → ${c.after.calls}.`,
              "author": { "@type": "Organization", "name": "Beyond Basics Studio" },
              "publisher": { "@type": "Organization", "name": "Beyond Basics Studio", "url": "https://beyondbasics.studio/" }
            }
          }))
        }
      ]} />

      {/* Hero */}
      <section className="section-dark border-b" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <FadeIn><p className="label mb-6" style={{ color: "rgba(247,244,240,0.7)" }}>Work</p></FadeIn>
          <FadeUp>
            <h1 className="font-serif leading-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)", color: "var(--sp-white)" }}>
              Proof,<br />not pitches.
            </h1>
          </FadeUp>
          <FadeIn delay={0.2}>
            <p className="font-sans text-sm leading-relaxed mt-8 max-w-md" style={{ color: "rgba(247,244,240,0.4)" }}>
              Actual before/after results from real clients who chose to stop being invisible on Google Maps.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Aggregate stats */}
      <section className="border-b" style={{ backgroundColor: "var(--sp-cream)", borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4" style={{ borderRight: "1px solid var(--sp-rule)" }}>
          {[
            { value: "500+", label: "Active Clients" },
            { value: "300%", label: "Avg Review Growth" },
            { value: "12×", label: "Avg Call Increase" },
            { value: "90", label: "Days to Top 3" },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="py-12 px-8 lg:px-12 border-l border-b md:border-b-0" style={{ borderColor: "var(--sp-rule)" }}>
                <p className="font-serif leading-none mb-3" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--sp-black)" }}>{s.value}</p>
                <p className="label">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Industry filter bar ──────────────────────────────────────────────── */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="label mr-2" style={{ color: "var(--sp-gray)" }}>Filter by industry:</span>
            {ALL_INDUSTRIES.map(industry => (
              <button
                key={industry}
                onClick={() => setActiveIndustry(industry)}
                className="label px-3 py-1.5 transition-colors duration-150"
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  backgroundColor: activeIndustry === industry ? "var(--sp-ink)" : "transparent",
                  color: activeIndustry === industry ? "var(--sp-white)" : "var(--sp-gray)",
                  border: activeIndustry === industry ? "1px solid var(--sp-ink)" : "1px solid var(--sp-rule)",
                }}
              >
                {industry}
                {industry !== "All" && (
                  <span className="ml-1.5 opacity-50">
                    {cases.filter(c => c.type === industry).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case studies ─────────────────────────────────────────────────────── */}
      <section className="section-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-px"
              style={{ borderTop: "1px solid var(--sp-rule)" }}
            >
              {filtered.map((c, i) => (
                <div key={c.business} className="border-b" style={{ borderColor: "var(--sp-rule)" }}>
                  <div className="grid lg:grid-cols-12 gap-0">

                    {/* ── Visual rank card (left, dark) ── */}
                    <div className="lg:col-span-4 xl:col-span-3">
                      <RankVisual
                        before={{ rank: c.before.rank, views: c.before.views, calls: c.before.calls }}
                        after={{ rank: c.after.rank, views: c.after.views, calls: c.after.calls }}
                        duration={c.duration}
                      />
                    </div>

                    {/* ── Identity + quote ── */}
                    <div className="lg:col-span-4 xl:col-span-4 section-light p-8 flex flex-col justify-between border-l border-r" style={{ borderColor: "var(--sp-rule)" }}>
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-serif text-2xl" style={{ color: "var(--sp-black)" }}>{c.business}</span>
                          <span className="label px-2 py-0.5 border" style={{ borderColor: "var(--sp-rule)", fontSize: "0.6rem" }}>{c.tier}</span>
                        </div>
                        <p className="font-sans text-xs mb-1" style={{ color: "var(--sp-gray)" }}>{c.type} · {c.location}</p>
                        <p className="font-sans text-xs mb-6" style={{ color: "var(--sp-green)" }}>{c.duration} · {c.highlight}</p>
                        <blockquote className="font-serif text-lg leading-snug mb-5" style={{ color: "var(--sp-black)" }}>
                          "{c.quote}"
                        </blockquote>
                        <div className="flex items-center gap-3">
                          <Avatar name={c.author} />
                          <p className="font-sans text-xs" style={{ color: "var(--sp-gray)" }}>— {c.author}</p>
                        </div>
                      </div>
                    </div>

                    {/* ── Before / After numbers ── */}
                    <div className="lg:col-span-4 xl:col-span-5 section-cream p-8">
                      <div className="grid grid-cols-2 gap-0 h-full">
                        {/* Before */}
                        <div className="pr-6 border-r" style={{ borderColor: "var(--sp-rule)" }}>
                          <p className="label mb-5 line-through decoration-1" style={{ color: "var(--sp-gray)", fontSize: "0.6rem" }}>BEFORE</p>
                          {[["Views", c.before.views], ["Rank", c.before.rank], ["Reviews", c.before.reviews], ["Calls", c.before.calls]].map(([label, val]) => (
                            <div key={label} className="mb-4">
                              <p className="font-sans text-xs mb-0.5" style={{ color: "rgba(var(--sp-gray-rgb, 90,90,90),0.6)", fontSize: "0.6rem", letterSpacing: "0.06em" }}>{label}</p>
                              <p className="font-serif text-lg line-through decoration-1" style={{ color: "rgba(180,170,160,0.7)" }}>{val}</p>
                            </div>
                          ))}
                        </div>
                        {/* After */}
                        <div className="pl-6">
                          <p className="label mb-5" style={{ color: "var(--sp-green)", fontSize: "0.6rem" }}>AFTER</p>
                          {[["Views", c.after.views], ["Rank", c.after.rank], ["Reviews", c.after.reviews], ["Calls", c.after.calls]].map(([label, val]) => (
                            <div key={label} className="mb-4">
                              <p className="font-sans text-xs mb-0.5" style={{ color: "var(--sp-gray)", fontSize: "0.6rem", letterSpacing: "0.06em" }}>{label}</p>
                              <p className="font-serif text-xl" style={{ color: "var(--sp-black)" }}>{val}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-24 text-center">
              <p className="font-serif text-2xl mb-4" style={{ color: "var(--sp-black)" }}>No results for this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── "Don't see your industry?" CTA ──────────────────────────────────── */}
      <section className="section-cream border-t border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <FadeUp>
                <p className="label mb-3" style={{ color: "var(--sp-gray)" }}>40+ industries served</p>
                <h2 className="font-serif leading-tight" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", color: "var(--sp-black)" }}>
                  Don't see your industry?<br />Let us show you what's possible.
                </h2>
              </FadeUp>
            </div>
            <FadeIn delay={0.15}>
              <div className="flex flex-col gap-3 shrink-0">
                <div className="flex flex-wrap gap-2 mb-2">
                  {["Law Firm", "Hospitality", "Salon & Spa", "Retail", "Contractor", "Medical"].map(tag => (
                    <span key={tag} className="label px-2.5 py-1 border" style={{ borderColor: "var(--sp-rule)", color: "var(--sp-gray)", fontSize: "0.6rem" }}>{tag}</span>
                  ))}
                </div>
                <Link href="/contact">
                  <button className="btn btn-black w-full justify-center" onClick={onAuditClick}>
                    Show Me My Industry's Results <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main CTA */}
      <section className="section-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-48">
          <FadeUp>
            <h2 className="font-serif leading-tight mb-10 max-w-3xl" style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", color: "var(--sp-white)" }}>
              Your story starts here.
            </h2>
          </FadeUp>
          <FadeIn delay={0.2}>
            <p className="font-sans text-sm mb-10" style={{ color: "rgba(247,244,240,0.4)" }}>Every business on this page started exactly where you are now.</p>
            <button onClick={onAuditClick} className="btn btn-white">Claim Free Audit <ArrowRight className="w-3.5 h-3.5" /></button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
