import { useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";
import { usePageMeta } from "@/hooks/usePageMeta";
import SchemaMarkup from "@/components/SchemaMarkup";

const ease = [0.25, 0.1, 0.25, 1];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, ease: "easeOut", delay }}>
      {children}
    </motion.div>
  );
}

const mainPages = [
  { label: "Home", href: "/", desc: "GBP management agency overview" },
  { label: "Services", href: "/services", desc: "Pricing tiers — Basic, Growth, Premium" },
  { label: "Customers", href: "/customers", desc: "30 full narrative case studies from real clients" },
  { label: "Journal", href: "/journal", desc: "Expert articles on GBP strategy and local SEO" },
  { label: "About", href: "/about", desc: "Our story, team, and mission" },
  { label: "Contact", href: "/contact", desc: "Get in touch or book a free audit" },
];

const serviceTiers = [
  { label: "Basic — $200/mo", href: "/services", desc: "1 location · weekly audits · 1–2 posts/mo" },
  { label: "Growth — $500/mo", href: "/services", desc: "Up to 5 locations · review automation · competitor tracking" },
  { label: "Premium — $1k/mo", href: "/services", desc: "Up to 50 locations · real-time 24/7 · dedicated manager" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy", desc: "How we collect and protect your data" },
  { label: "Terms & Conditions", href: "/terms", desc: "Terms of use for our website and services" },
  { label: "Sitemap", href: "/sitemap", desc: "Full index of all pages and articles" },
];

function SitemapGroup({
  label,
  items,
  delay = 0,
}: {
  label: string;
  items: { label: string; href: string; desc: string }[];
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <div className="mb-16">
        <p className="label mb-6" style={{ color: "var(--sp-gray)" }}>{label}</p>
        <ul className="divide-y" style={{ borderColor: "var(--sp-rule)" }}>
          {items.map((item) => (
            <li key={item.href + item.label}>
              <Link
                href={item.href}
                className="group flex items-center justify-between gap-6 py-4 hover:opacity-60 transition-opacity duration-200"
              >
                <div>
                  <span className="font-serif text-xl lg:text-2xl leading-snug block mb-0.5" style={{ color: "var(--sp-black)" }}>
                    {item.label}
                  </span>
                  <span className="font-sans text-xs" style={{ color: "var(--sp-gray)" }}>{item.desc}</span>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 opacity-25 group-hover:opacity-70 group-hover:translate-x-1 transition-all duration-200" style={{ color: "var(--sp-black)" }} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}

export default function Sitemap() {
  usePageMeta({ title: "Sitemap — Beyond Basics Studio", description: "A complete index of all pages, service tiers, articles, and legal documents on beyondbasicsstudio.com.", ogImage: "home.jpg", url: "/sitemap" });
  const articleItems = [...articles].reverse().map((a) => ({
    label: a.title,
    href: "/journal",
    desc: `${a.tag} · ${a.date} · ${a.readTime}`,
  }));

  return (
    <div style={{ backgroundColor: "var(--sp-white)" }}>
      <SchemaMarkup schema={[
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": "https://www.beyondbasicsstudio.com/sitemap",
          "name": "Sitemap — Beyond Basics Studio",
          "description": "A complete index of all pages, service tiers, articles, and legal documents on beyondbasicsstudio.com.",
          "isPartOf": { "@type": "WebSite", "url": "https://www.beyondbasicsstudio.com/" },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.beyondbasicsstudio.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sitemap", "item": "https://www.beyondbasicsstudio.com/sitemap" },
          ],
        },
      ]} />
      {/* Hero */}
      <section className="section-dark border-b" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <FadeIn>
            <p className="label mb-6" style={{ color: "rgba(247,244,240,0.7)" }}>Sitemap</p>
          </FadeIn>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="font-serif leading-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)", color: "var(--sp-white)" }}
          >
            Every page,<br />in one place.
          </motion.h1>
          <FadeIn delay={0.2}>
            <p className="font-sans text-sm leading-relaxed mt-8 max-w-md" style={{ color: "rgba(247,244,240,0.4)" }}>
              A complete index of all pages, service tiers, articles, and legal documents on beyondbasicsstudio.com.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Sitemap content */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
          <SitemapGroup label="Main Pages" items={mainPages} delay={0} />
          <SitemapGroup label="Service Tiers" items={serviceTiers} delay={0.05} />
          <SitemapGroup label="Journal — All Articles" items={articleItems} delay={0.1} />
          <SitemapGroup label="Legal" items={legal} delay={0.15} />
        </div>
      </section>
    </div>
  );
}
