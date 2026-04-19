import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { articles, Article } from "@/data/articles";
import SchemaMarkup from "@/components/SchemaMarkup";
import { usePageMeta } from "@/hooks/usePageMeta";

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

function ArticleCard({ article, onClick, index }: { article: Article; onClick: () => void; index: number }) {
  return (
    <FadeIn delay={index * 0.06}>
      <button
        onClick={onClick}
        className="group w-full text-left border-b flex flex-col h-full px-6 py-10"
        style={{ borderColor: "var(--sp-rule)" }}
      >
        <div className="mb-5">
          <span className="label block mb-1.5" style={{ color: "var(--sp-gray)" }}>{article.tag}</span>
          <span className="font-sans text-xs" style={{ color: "var(--sp-gray)", opacity: 0.45 }}>{article.date} · {article.readTime}</span>
        </div>
        <h2
          className="font-serif leading-snug mb-4 group-hover:opacity-60 transition-opacity duration-300 flex-1"
          style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", color: "var(--sp-black)" }}
        >
          {article.title}
        </h2>
        <p className="font-sans text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: "var(--sp-gray)" }}>
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2">
          <span className="label" style={{ color: "var(--sp-black)" }}>Read Article</span>
          <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" style={{ color: "var(--sp-black)" }} />
        </div>
      </button>
    </FadeIn>
  );
}

function ArticleView({ article, onBack, onNext, nextArticle }: {
  article: Article;
  onBack: () => void;
  onNext: () => void;
  nextArticle: Article | null;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [article.slug]);

  return (
    <div style={{ backgroundColor: "var(--sp-white)" }}>
      <SchemaMarkup schema={{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.excerpt,
        "author": { "@type": "Organization", "name": "Beyond Basics Studio" },
        "publisher": { "@type": "Organization", "name": "Beyond Basics Studio", "url": "https://www.beyondbasicsstudio.com/" },
        "datePublished": article.date,
        "mainEntityOfPage": `https://www.beyondbasicsstudio.com/journal/${article.slug}`,
        "articleSection": article.tag,
        "keywords": `Google Business Profile, GBP, local SEO, ${article.tag.toLowerCase()}`,
      }} />

      {/* Hero */}
      <section className="section-dark border-b" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <button
              onClick={onBack}
              className="flex items-center gap-2 mb-10 group"
              style={{ color: "rgba(247,244,240,0.4)" }}
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="label">Journal</span>
            </button>
            <div className="flex items-center gap-4 mb-6">
              <span className="label" style={{ color: "rgba(247,244,240,0.7)" }}>{article.tag}</span>
              <span className="label" style={{ color: "rgba(247,244,240,0.55)" }}>·</span>
              <span className="label" style={{ color: "rgba(247,244,240,0.7)" }}>{article.date}</span>
              <span className="label" style={{ color: "rgba(247,244,240,0.55)" }}>·</span>
              <span className="label" style={{ color: "rgba(247,244,240,0.7)" }}>{article.readTime}</span>
            </div>
            <h1
              className="font-serif leading-tight mb-5 max-w-4xl"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", color: "var(--sp-white)" }}
            >
              {article.title}
            </h1>
            <p className="font-sans text-sm max-w-2xl" style={{ color: "rgba(247,244,240,0.45)" }}>
              {article.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="section-light">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-20">
          {article.sections.map((section, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div className={i > 0 ? "mt-12" : ""}>
                {section.heading && (
                  <h2
                    className="font-serif mb-5"
                    style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--sp-black)" }}
                  >
                    {section.heading}
                  </h2>
                )}
                {section.body.split("\n\n").map((para, j) => (
                  <p
                    key={j}
                    className="font-sans text-sm leading-[1.85] mb-5"
                    style={{ color: "var(--sp-gray)" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </FadeIn>
          ))}

          {/* Byline */}
          <FadeIn>
            <div className="mt-16 pt-8 border-t" style={{ borderColor: "var(--sp-rule)" }}>
              <p className="label mb-1">Beyond Basics Studio</p>
              <p className="font-sans text-xs" style={{ color: "var(--sp-gray)" }}>
                {article.date} · {article.readTime}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Next article */}
      {nextArticle && (
        <section className="border-t section-cream" style={{ borderColor: "var(--sp-rule)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
            <FadeIn>
              <p className="label mb-8" style={{ color: "var(--sp-gray)" }}>Next Article</p>
              <button
                onClick={onNext}
                className="group text-left w-full sm:max-w-2xl flex items-start justify-between gap-8"
              >
                <div>
                  <span className="label block mb-3" style={{ color: "var(--sp-gray)" }}>{nextArticle.tag}</span>
                  <h3
                    className="font-serif leading-snug group-hover:opacity-60 transition-opacity duration-300"
                    style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)", color: "var(--sp-black)" }}
                  >
                    {nextArticle.title}
                  </h3>
                </div>
                <ArrowRight className="w-5 h-5 shrink-0 mt-1 opacity-30 group-hover:opacity-80 group-hover:translate-x-1 transition-all duration-300" style={{ color: "var(--sp-black)" }} />
              </button>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Back to journal */}
      <section className="section-dark border-t" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 flex items-center justify-between gap-6">
          <FadeIn>
            <button
              onClick={onBack}
              className="flex items-center gap-2 group label"
              style={{ color: "rgba(247,244,240,0.5)" }}
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Journal
            </button>
          </FadeIn>
          <FadeIn delay={0.1}>
            <span className="font-serif text-2xl" style={{ color: "rgba(247,244,240,0.12)" }} aria-hidden="true">BBS</span>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

export default function Journal({ onAuditClick }: { onAuditClick: () => void }) {
  usePageMeta({ title: "Journal — Beyond Basics Studio", description: "From the Playbook. 10 expert articles on Google Business Profile strategy, local SEO, review growth, and Map Pack domination.", ogImage: "journal.jpg", url: "/journal" });
  const [selected, setSelected] = useState<Article | null>(null);

  const handleSelect = (article: Article) => {
    setSelected(article);
    window.scrollTo({ top: 0 });
  };

  const handleBack = () => {
    setSelected(null);
    window.scrollTo({ top: 0 });
  };

  const handleNext = () => {
    if (!selected) return;
    const currentIndex = articles.findIndex(a => a.slug === selected.slug);
    const nextIndex = (currentIndex + 1) % articles.length;
    handleSelect(articles[nextIndex]);
  };

  const nextArticle = selected
    ? articles[(articles.findIndex(a => a.slug === selected.slug) + 1) % articles.length]
    : null;

  if (selected) {
    return (
      <ArticleView
        article={selected}
        onBack={handleBack}
        onNext={handleNext}
        nextArticle={nextArticle}
      />
    );
  }

  const featured = articles[articles.length - 1];
  const rest = articles.slice(0, articles.length - 1).reverse();

  return (
    <div style={{ backgroundColor: "var(--sp-white)" }}>
      <SchemaMarkup schema={[
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.beyondbasicsstudio.com/" },
            { "@type": "ListItem", "position": 2, "name": "Journal", "item": "https://www.beyondbasicsstudio.com/journal" }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          "url": "https://www.beyondbasicsstudio.com/journal",
          "name": "Journal — Beyond Basics Studio",
          "description": "Expert articles on Google Business Profile strategy, local SEO, review growth, and Map Pack domination from the team at Beyond Basics Studio.",
          "publisher": { "@type": "Organization", "name": "Beyond Basics Studio", "url": "https://www.beyondbasicsstudio.com/" },
          "blogPost": articles.map(a => ({
            "@type": "BlogPosting",
            "headline": a.title,
            "description": a.excerpt,
            "datePublished": a.date,
            "author": { "@type": "Organization", "name": "Beyond Basics Studio" },
            "url": `https://www.beyondbasicsstudio.com/journal/${a.slug}`,
          }))
        }
      ]} />

      {/* Hero */}
      <section className="section-dark border-b" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <FadeIn><p className="label mb-6" style={{ color: "rgba(247,244,240,0.7)" }}>Journal</p></FadeIn>
          <FadeUp>
            <h1 className="font-serif leading-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)", color: "var(--sp-white)" }}>
              From the<br />Playbook.
            </h1>
          </FadeUp>
          <FadeIn delay={0.2}>
            <p className="font-sans text-sm leading-relaxed mt-8 max-w-md" style={{ color: "rgba(247,244,240,0.4)" }}>
              10 expert articles on Google Business Profile strategy, local SEO, review growth, and Map Pack domination — from the team managing 500+ profiles worldwide.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <FadeIn><p className="label mb-10" style={{ color: "var(--sp-gray)" }}>Latest</p></FadeIn>
          <FadeUp>
            <button
              onClick={() => handleSelect(featured)}
              className="group text-left w-full"
            >
              <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-1">
                  <span className="font-sans text-xs" style={{ color: "var(--sp-gray)", opacity: 0.4 }}>{featured.number}</span>
                </div>
                <div className="md:col-span-7">
                  <div className="flex items-center gap-4 mb-5">
                    <span className="label" style={{ color: "var(--sp-gray)" }}>{featured.tag}</span>
                    <span className="font-sans text-xs" style={{ color: "var(--sp-gray)", opacity: 0.5 }}>{featured.date}</span>
                  </div>
                  <h2
                    className="font-serif leading-tight group-hover:opacity-60 transition-opacity duration-300 mb-4"
                    style={{ fontSize: "clamp(1.75rem, 4vw, 3.5rem)", color: "var(--sp-black)" }}
                  >
                    {featured.title}
                  </h2>
                </div>
                <div className="md:col-span-4">
                  <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: "var(--sp-gray)" }}>
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="label" style={{ color: "var(--sp-black)" }}>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" style={{ color: "var(--sp-black)" }} />
                  </div>
                </div>
              </div>
            </button>
          </FadeUp>
        </div>
      </section>

      {/* All articles */}
      <section className="section-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <FadeIn><p className="label mb-2" style={{ color: "var(--sp-gray)" }}>All Articles</p></FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-px mt-4" style={{ backgroundColor: "var(--sp-rule)" }}>
            {rest.map((article, i) => (
              <div key={article.slug} className="section-cream">
                <ArticleCard article={article} onClick={() => handleSelect(article)} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article index / sitemap */}
      <section className="section-light border-t border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <FadeIn><p className="label mb-10" style={{ color: "var(--sp-gray)" }}>Article Index</p></FadeIn>
          <ul className="divide-y" style={{ borderColor: "var(--sp-rule)" }}>
            {[...articles].reverse().map((article, i) => (
              <li key={article.slug}>
                <FadeIn delay={i * 0.04}>
                  <button
                    onClick={() => { handleSelect(article); }}
                    className="group w-full text-left grid grid-cols-12 items-baseline gap-4 py-5 hover:opacity-60 transition-opacity duration-200"
                  >
                    <span className="col-span-1 font-sans text-xs" style={{ color: "var(--sp-gray)", opacity: 0.4 }}>{String(articles.length - i).padStart(2, "0")}</span>
                    <span className="col-span-2 label" style={{ color: "var(--sp-gray)" }}>{article.tag}</span>
                    <span className="col-span-7 font-serif text-base lg:text-lg leading-snug" style={{ color: "var(--sp-black)" }}>{article.title}</span>
                    <span className="col-span-2 font-sans text-xs text-right" style={{ color: "var(--sp-gray)", opacity: 0.45 }}>{article.readTime}</span>
                  </button>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark border-t" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
          <FadeUp>
            <h2 className="font-serif leading-tight mb-8 max-w-2xl" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "var(--sp-white)" }}>
              Ready to put this into practice?
            </h2>
          </FadeUp>
          <FadeIn delay={0.15}>
            <button onClick={onAuditClick} className="btn btn-white">
              Get Your Free GBP Audit <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
