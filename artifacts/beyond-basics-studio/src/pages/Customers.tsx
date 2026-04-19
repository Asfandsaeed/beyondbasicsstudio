import { useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Plus, Minus } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";
import { usePageMeta } from "@/hooks/usePageMeta";
import { customers, CustomerCase } from "@/data/customers";

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

const tierColor = { Basic: "#1a4d35", Growth: "#163d2a", Premium: "#226040" };

function CustomerCard({ c, index }: { c: CustomerCase; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <FadeIn delay={index * 0.02}>
      <div className="border-b" style={{ borderColor: "var(--sp-rule)" }}>
        {/* Collapsed row */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left py-8 grid md:grid-cols-12 gap-6 items-start group"
          aria-expanded={open}
        >
          {/* Identity */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-serif text-2xl" style={{ color: "var(--sp-black)" }}>{c.business}</span>
              <span
                className="label px-2 py-0.5 border"
                style={{ borderColor: "var(--sp-rule)", color: "var(--sp-gray)", fontSize: "0.625rem" }}
              >{c.tier}</span>
            </div>
            <p className="font-sans text-xs" style={{ color: "var(--sp-gray)" }}>
              {c.type} · {c.location}
            </p>
          </div>

          {/* Subtitle + Highlight */}
          <div className="md:col-span-5">
            <p className="font-serif text-lg leading-snug mb-1" style={{ color: tierColor[c.tier] }}>{c.subtitle}</p>
            <p className="font-sans text-xs" style={{ color: "var(--sp-gray)" }}>{c.highlight}</p>
          </div>

          {/* Toggle */}
          <div className="md:col-span-3 flex justify-end items-start pt-1">
            <span className="font-sans text-xs mr-4 hidden md:block transition-opacity group-hover:opacity-70" style={{ color: "var(--sp-gray)" }}>
              {open ? "Close" : "Read story"}
            </span>
            <div
              className="w-7 h-7 border rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
              style={{ borderColor: "var(--sp-rule)", color: "var(--sp-black)" }}
            >
              {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
            </div>
          </div>
        </button>

        {/* Expanded story */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <div className="pb-12 grid md:grid-cols-12 gap-8 md:gap-12">
                {/* Story */}
                <div className="md:col-span-7">
                  <p className="font-sans text-xs mb-6 uppercase tracking-widest" style={{ color: "var(--sp-gray)", opacity: 0.5 }}>{c.owner}</p>
                  {c.story.split("\n\n").map((para, i) => (
                    <p key={i} className="font-sans text-sm leading-relaxed mb-4" style={{ color: "var(--sp-gray)" }}>{para}</p>
                  ))}

                  {/* Quotes */}
                  <div className="mt-8 space-y-6">
                    <blockquote className="pl-6 border-l-2" style={{ borderColor: tierColor[c.tier] }}>
                      <p className="font-serif text-xl leading-snug" style={{ color: "var(--sp-black)" }}>"{c.quote1}"</p>
                      <p className="font-sans text-xs mt-3" style={{ color: "var(--sp-gray)" }}>— {c.owner}, {c.business}</p>
                    </blockquote>
                    {c.quote2 && (
                      <blockquote className="pl-6 border-l-2" style={{ borderColor: "var(--sp-rule)" }}>
                        <p className="font-serif text-lg leading-snug italic" style={{ color: "var(--sp-gray)" }}>"{c.quote2}"</p>
                      </blockquote>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="md:col-span-5">
                  <p className="label mb-5" style={{ color: tierColor[c.tier] }}>The Numbers</p>
                  <div className="grid grid-cols-2 gap-px" style={{ backgroundColor: "var(--sp-rule)" }}>
                    {c.stats.map((s) => (
                      <div key={s.label} className="p-5" style={{ backgroundColor: "var(--sp-white)" }}>
                        <p className="font-serif leading-none mb-2" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", color: "var(--sp-black)" }}>{s.value}</p>
                        <p className="font-sans text-xs" style={{ color: "var(--sp-gray)" }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

const industries = ["All", ...Array.from(new Set(customers.map(c => c.type))).sort()];

export default function Customers({ onAuditClick }: { onAuditClick: () => void }) {
  usePageMeta({
    title: "Customers — Beyond Basics Studio",
    description: "30 real stories of local businesses that stopped being invisible on Google Maps. Restaurants, dental practices, law firms, gyms, hotels, and more.",
    ogImage: "home.jpg",
    url: "/customers",
  });

  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? customers : customers.filter(c => c.type === filter);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.beyondbasicsstudio.com/" },
        { "@type": "ListItem", "position": 2, "name": "Customers", "item": "https://www.beyondbasicsstudio.com/customers" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": "https://www.beyondbasicsstudio.com/customers",
      "name": "Customer Stories — Beyond Basics Studio",
      "description": "30 detailed case studies from local businesses that dominated Google Maps with Beyond Basics Studio.",
      "isPartOf": { "@type": "WebSite", "url": "https://www.beyondbasicsstudio.com/" },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Beyond Basics Studio Customer Case Studies",
      "numberOfItems": customers.length,
      "itemListElement": customers.map((c, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "CaseStudy",
          "name": `${c.business} — ${c.subtitle}`,
          "description": c.intro,
          "author": { "@type": "Organization", "name": "Beyond Basics Studio" },
          "about": { "@type": "LocalBusiness", "name": c.business, "address": c.location },
        },
      })),
    },
    ...customers.map(c => ({
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "Organization",
        "name": "Beyond Basics Studio",
        "url": "https://www.beyondbasicsstudio.com/",
      },
      "author": { "@type": "Person", "name": c.owner },
      "reviewBody": c.quote1,
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
    })),
  ];

  return (
    <div style={{ backgroundColor: "var(--sp-white)" }}>
      <SchemaMarkup schema={schema} />

      {/* Hero */}
      <section className="section-dark border-b" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <FadeIn>
            <p className="label mb-6" style={{ color: "rgba(247,244,240,0.35)" }}>Customers</p>
          </FadeIn>
          <FadeUp>
            <h1 className="font-serif leading-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)", color: "var(--sp-white)" }}>
              Thirty stories.<br />Zero guesswork.
            </h1>
          </FadeUp>
          <FadeIn delay={0.2}>
            <p className="font-sans text-sm leading-relaxed mt-8 max-w-lg" style={{ color: "rgba(247,244,240,0.4)" }}>
              Every story here is real. Every business, every number, every quote. This is what happens when a local business decides to stop being invisible on Google Maps.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Aggregate stats strip */}
      <section className="border-b" style={{ backgroundColor: "var(--sp-cream)", borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4" style={{ borderRight: "1px solid var(--sp-rule)" }}>
          {[
            { value: "30+", label: "Detailed Case Studies" },
            { value: "18", label: "Industries Covered" },
            { value: "340%", label: "Avg Inquiry Increase" },
            { value: "$1.2M", label: "Single Client Storm Season" },
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

      {/* Industry filter */}
      <section className="border-b" style={{ borderColor: "var(--sp-rule)", backgroundColor: "var(--sp-white)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-wrap gap-2">
            {industries.map(ind => (
              <button
                key={ind}
                onClick={() => setFilter(ind)}
                className="font-sans text-xs px-3 py-1.5 border transition-all duration-200"
                style={{
                  borderColor: filter === ind ? "var(--sp-black)" : "var(--sp-rule)",
                  backgroundColor: filter === ind ? "var(--sp-black)" : "transparent",
                  color: filter === ind ? "var(--sp-white)" : "var(--sp-gray)",
                }}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies list */}
      <section className="section-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div style={{ borderTop: "1px solid var(--sp-rule)" }}>
            <AnimatePresence mode="wait">
              <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                {filtered.map((c, i) => (
                  <CustomerCard key={c.id} c={c} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <p className="font-sans text-sm py-16 text-center" style={{ color: "var(--sp-gray)" }}>No results for this filter.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-48">
          <FadeUp>
            <h2 className="font-serif leading-tight mb-10 max-w-3xl" style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", color: "var(--sp-white)" }}>
              Your business, next.
            </h2>
          </FadeUp>
          <FadeIn delay={0.2}>
            <p className="font-sans text-sm mb-10 max-w-md" style={{ color: "rgba(247,244,240,0.4)" }}>
              Every business on this page started exactly where you are. The GBP audit is free, takes 48 hours, and shows you exactly what's costing you customers.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={onAuditClick} className="btn btn-white">
                Get Free Audit <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link href="/services" className="btn" style={{ border: "1px solid rgba(247,244,240,0.15)", color: "rgba(247,244,240,0.6)", background: "transparent" }}>
                See Pricing <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
