import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

const cases = [
  { business: "Urban Pizza", type: "Restaurant", location: "Chicago, IL", before: { views: "180/mo", rank: "#14", reviews: "12", calls: "8/mo" }, after: { views: "5,200/mo", rank: "#2", reviews: "214", calls: "268/mo" }, quote: "We went from 8 calls a month to 268. Best investment we've ever made.", author: "Maria T., Owner", tier: "Growth", duration: "90 days", highlight: "+3,250% profile views" },
  { business: "Summit Dental", type: "Healthcare", location: "Denver, CO", before: { views: "320/mo", rank: "#9", reviews: "28", calls: "22/mo" }, after: { views: "8,100/mo", rank: "#1", reviews: "312", calls: "190/mo" }, quote: "From page-2 obscurity to the top spot. New patients up 750%.", author: "Dr. James R., Practice Owner", tier: "Premium", duration: "60 days", highlight: "#1 in Local Map Pack" },
  { business: "City Auto Repair", type: "Automotive", location: "Austin, TX", before: { views: "95/mo", rank: "#11", reviews: "6", calls: "5/mo" }, after: { views: "3,800/mo", rank: "#3", reviews: "187", calls: "145/mo" }, quote: "I thought GBP was just a listing. It's now my biggest revenue driver.", author: "Carlos M., Owner", tier: "Growth", duration: "120 days", highlight: "+2,800% call volume" },
  { business: "Harbor Café", type: "Café & Bakery", location: "Portland, OR", before: { views: "210/mo", rank: "#7", reviews: "19", calls: "12/mo" }, after: { views: "6,400/mo", rank: "#1", reviews: "401", calls: "98/mo" }, quote: "Our weekend wait times doubled. Best problem we've ever had.", author: "Sarah L., Co-owner", tier: "Premium", duration: "75 days", highlight: "400+ Google Reviews" },
  { business: "Metro Fitness", type: "Gym & Fitness", location: "Miami, FL", before: { views: "440/mo", rank: "#8", reviews: "31", calls: "18/mo" }, after: { views: "9,200/mo", rank: "#2", reviews: "560", calls: "312/mo" }, quote: "New membership signups from Google Maps increased 5x. The ROI is insane.", author: "Derek J., Marketing Director", tier: "Premium", duration: "90 days", highlight: "5x membership signups" },
  { business: "Peak Real Estate", type: "Real Estate", location: "Seattle, WA", before: { views: "120/mo", rank: "#15", reviews: "8", calls: "4/mo" }, after: { views: "4,100/mo", rank: "#3", reviews: "143", calls: "89/mo" }, quote: "We closed 4 listings in one month that came directly from Google Maps.", author: "Amanda P., Principal Agent", tier: "Growth", duration: "105 days", highlight: "4 direct Map Pack closes" },
];

export default function CaseStudies({ onAuditClick }: { onAuditClick: () => void }) {
  usePageMeta({ title: "Work — Beyond Basics Studio", description: "Proof, not pitches. Actual before/after results from real clients who chose to stop being invisible on Google Maps.", ogImage: "work.jpg", url: "/case-studies" });
  return (
    <div style={{ backgroundColor: "var(--sp-white)" }}>
      <SchemaMarkup schema={[
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.beyondbasicsstudio.com/" },
            { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://www.beyondbasicsstudio.com/case-studies" }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": "https://www.beyondbasicsstudio.com/case-studies",
          "name": "GBP Case Studies & Client Results — Beyond Basics Studio",
          "description": "Real before/after results from local businesses who dominated Google Maps with Beyond Basics Studio. Restaurants, dental practices, gyms, and more.",
          "isPartOf": { "@type": "WebSite", "url": "https://www.beyondbasicsstudio.com/" }
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
              "publisher": { "@type": "Organization", "name": "Beyond Basics Studio", "url": "https://www.beyondbasicsstudio.com/" }
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

      {/* Case studies */}
      <section className="section-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <div className="space-y-px" style={{ borderTop: "1px solid var(--sp-rule)" }}>
            {cases.map((c, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="grid md:grid-cols-12 gap-px border-b" style={{ backgroundColor: "var(--sp-rule)", borderColor: "var(--sp-rule)" }}>
                  {/* Identity */}
                  <div className="md:col-span-4 section-light p-8">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-serif text-2xl" style={{ color: "var(--sp-black)" }}>{c.business}</span>
                      <span className="label px-2 py-0.5 border" style={{ borderColor: "var(--sp-rule)" }}>{c.tier}</span>
                    </div>
                    <p className="font-sans text-xs mb-1" style={{ color: "var(--sp-gray)" }}>{c.type} · {c.location}</p>
                    <p className="font-sans text-xs mb-6" style={{ color: "#2d6a4f" }}>{c.duration} · {c.highlight}</p>
                    <blockquote className="font-serif text-lg leading-snug mb-3" style={{ color: "var(--sp-black)" }}>"{c.quote}"</blockquote>
                    <p className="font-sans text-xs" style={{ color: "var(--sp-gray)" }}>— {c.author}</p>
                  </div>

                  {/* Before */}
                  <div className="md:col-span-3 section-cream p-8">
                    <p className="label mb-5" style={{ color: "var(--sp-gray)" }}>Before</p>
                    {[["Profile Views", c.before.views], ["Map Rank", c.before.rank], ["Reviews", c.before.reviews], ["Monthly Calls", c.before.calls]].map(([label, val]) => (
                      <div key={label} className="mb-4">
                        <p className="font-sans text-xs mb-0.5" style={{ color: "var(--sp-gray)" }}>{label}</p>
                        <p className="font-serif text-xl line-through decoration-1" style={{ color: "var(--sp-gray)" }}>{val}</p>
                      </div>
                    ))}
                  </div>

                  {/* After */}
                  <div className="md:col-span-5 section-light p-8">
                    <p className="label mb-5" style={{ color: "#2d6a4f" }}>After</p>
                    {[["Profile Views", c.after.views], ["Map Rank", c.after.rank], ["Reviews", c.after.reviews], ["Monthly Calls", c.after.calls]].map(([label, val]) => (
                      <div key={label} className="mb-4">
                        <p className="font-sans text-xs mb-0.5" style={{ color: "var(--sp-gray)" }}>{label}</p>
                        <p className="font-serif text-xl" style={{ color: "var(--sp-black)" }}>{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
