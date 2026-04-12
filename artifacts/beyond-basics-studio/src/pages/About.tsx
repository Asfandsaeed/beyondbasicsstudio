import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

const team = [
  { name: "Marcus Chen", role: "CEO & Founder", initials: "MC", bio: "Former Google local team lead with 10 years of algorithm expertise. Built Beyond Basics to give every local business the competitive intelligence only large brands enjoyed." },
  { name: "Priya Sharma", role: "Head of GBP Operations", initials: "PS", bio: "Managed over 1,200 GBP profiles across 40+ industries. The engine behind our 98% client retention rate." },
  { name: "James O'Reilly", role: "AI Strategy Director", initials: "JO", bio: "Built MapMaster™ from the ground up. Data scientist by training, local SEO obsessive by nature." },
  { name: "Sofia Mendez", role: "Client Success Lead", initials: "SM", bio: "The reason clients stay. Sofia ensures every client feels heard, sees results, and grows with us long term." },
];

export default function About({ onAuditClick }: { onAuditClick: () => void }) {
  return (
    <div style={{ backgroundColor: "var(--sp-white)" }}>
      <SchemaMarkup schema={[
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.beyondbasicsstudio.com/" },
            { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.beyondbasicsstudio.com/about" }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "url": "https://www.beyondbasicsstudio.com/about",
          "name": "About Beyond Basics Studio — GBP Management Agency",
          "description": "Beyond Basics Studio is a data-driven Google Business Profile agency founded in 2025. We bring enterprise-level GBP expertise to local businesses worldwide.",
          "isPartOf": { "@type": "WebSite", "url": "https://www.beyondbasicsstudio.com/" }
        },
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Beyond Basics Studio",
          "url": "https://www.beyondbasicsstudio.com/",
          "logo": "https://www.beyondbasicsstudio.com/favicon.svg",
          "foundingDate": "2025",
          "email": "hello@beyondbasicsstudio.com",
          "description": "Google Business Profile management agency delivering data-driven local SEO, review generation, and map pack domination for businesses worldwide.",
          "employee": team.map(m => ({
            "@type": "Person",
            "name": m.name,
            "jobTitle": m.role,
            "worksFor": { "@type": "Organization", "name": "Beyond Basics Studio" }
          }))
        }
      ]} />

      {/* Hero */}
      <section className="section-dark border-b" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <FadeIn><p className="label mb-6" style={{ color: "rgba(247,244,240,0.35)" }}>About</p></FadeIn>
          <FadeUp>
            <h1 className="font-serif leading-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)", color: "var(--sp-white)" }}>
              Data-driven GBP<br />experts since 2025.
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* Story */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <FadeIn><p className="label mb-6">Our Story</p></FadeIn>
            <FadeUp>
              <h2 className="font-serif leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "var(--sp-black)" }}>
                Founded on an unfair truth.
              </h2>
            </FadeUp>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <FadeIn delay={0.15}>
              <div className="space-y-5">
                {[
                  "In 2025, our founder Marcus Chen left his role on Google's local team after witnessing firsthand how a well-managed Google Business Profile could transform a local business — and how poorly most businesses managed theirs.",
                  "The average local business leaves 70% of its Google Maps potential untouched. Not because they don't care — because they lack the time, expertise, and tools to do it right.",
                  "Beyond Basics Studio was built to fix that. Today we manage 500+ profiles across 30+ countries, delivering results that most business owners thought were impossible.",
                ].map((p, i) => (
                  <p key={i} className="font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>{p}</p>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b" style={{ backgroundColor: "var(--sp-cream)", borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4" style={{ borderRight: "1px solid var(--sp-rule)" }}>
          {[
            { value: "500+", label: "Profiles Managed" },
            { value: "30+", label: "Countries Served" },
            { value: "98%", label: "Client Retention" },
            { value: "2025", label: "Year Founded" },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="py-12 px-8 lg:px-12 border-l border-b md:border-b-0" style={{ borderColor: "var(--sp-rule)" }}>
                <p className="font-serif leading-none mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--sp-black)" }}>{s.value}</p>
                <p className="label">{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <FadeUp><p className="label mb-12">The Team</p></FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ backgroundColor: "var(--sp-rule)" }}>
            {team.map((m, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="section-light p-8">
                  <div className="w-12 h-12 border flex items-center justify-center mb-6" style={{ borderColor: "var(--sp-rule)" }}>
                    <span className="font-serif text-sm" style={{ color: "var(--sp-black)" }}>{m.initials}</span>
                  </div>
                  <h3 className="font-serif text-xl mb-0.5" style={{ color: "var(--sp-black)" }}>{m.name}</h3>
                  <p className="label mb-4">{m.role}</p>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>{m.bio}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-cream border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <FadeUp><p className="label mb-12">What We Stand For</p></FadeUp>
          {[
            { title: "Transparent Reporting", desc: "No smoke, no mirrors. Every metric is real, verifiable, and tied to your business growth." },
            { title: "AI-Powered Precision", desc: "MapMaster™ runs 24/7, testing and optimising faster than any competitor can react." },
            { title: "Results-First Culture", desc: "We celebrate outcomes — not activity. Our team is incentivised around your profile's actual performance." },
          ].map((v, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="grid md:grid-cols-12 gap-8 py-8 border-b items-start" style={{ borderColor: "var(--sp-rule)" }}>
                <div className="md:col-span-1">
                  <span className="font-sans text-xs" style={{ color: "var(--sp-gray)", opacity: 0.4 }}>0{i + 1}</span>
                </div>
                <h3 className="md:col-span-4 font-serif text-2xl lg:text-3xl" style={{ color: "var(--sp-black)" }}>{v.title}</h3>
                <p className="md:col-span-6 md:col-start-7 font-sans text-sm leading-relaxed self-center" style={{ color: "var(--sp-gray)" }}>{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-48">
          <FadeUp>
            <h2 className="font-serif leading-tight mb-10 max-w-3xl" style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", color: "var(--sp-white)" }}>
              Work with the best.
            </h2>
          </FadeUp>
          <FadeIn delay={0.2}>
            <p className="font-sans text-sm mb-10 max-w-md" style={{ color: "rgba(247,244,240,0.4)" }}>Our team is ready to take your GBP from overlooked to unstoppable.</p>
            <button onClick={onAuditClick} className="btn btn-white">Get Your Free Audit <ArrowRight className="w-3.5 h-3.5" /></button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
