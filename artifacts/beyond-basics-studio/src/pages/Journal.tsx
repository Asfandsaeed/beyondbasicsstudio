import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link, useParams, useLocation } from "wouter";
import { articles, Article } from "@/data/articles";
import SchemaMarkup from "@/components/SchemaMarkup";
import { usePageMeta } from "@/hooks/usePageMeta";

const BASE_URL = "https://beyondbasics.studio";

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

function toISO(dateStr: string): string {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.toISOString().split("T")[0];
}

function wordCount(article: Article): number {
  const text = article.sections.map(s => (s.heading ?? "") + " " + s.body).join(" ");
  return Math.round(text.split(/\s+/).filter(Boolean).length);
}

function getRelated(current: Article, next: Article | null): Article[] {
  const others = articles.filter(a => a.slug !== current.slug && a.slug !== (next?.slug ?? ""));
  const sameTag = others.filter(a => a.tag === current.tag);
  const rest = others.filter(a => a.tag !== current.tag);
  return [...sameTag, ...rest].slice(0, 2);
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <FadeIn delay={index * 0.06}>
      <Link href={`/journal/${article.slug}`}>
        <div className="group w-full text-left border-b flex flex-col h-full px-6 py-10 cursor-pointer" style={{ borderColor: "var(--sp-rule)" }}>
          <div className="mb-5">
            <span className="label block mb-1.5">{article.tag}</span>
            <span className="font-sans text-xs" style={{ color: "var(--sp-gray)" }}>{article.date} · {article.readTime}</span>
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
        </div>
      </Link>
    </FadeIn>
  );
}

function RelatedArticleRow({ article, index }: { article: Article; index: number }) {
  return (
    <FadeIn delay={index * 0.08}>
      <Link href={`/journal/${article.slug}`}>
        <div
          className="group py-6 border-b hover:opacity-60 transition-opacity duration-200 cursor-pointer
            grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-1.5
            md:grid-cols-12 md:gap-4 md:items-baseline"
          style={{ borderColor: "var(--sp-rule)" }}
        >
          <span className="font-sans text-xs self-start md:col-span-1 md:self-auto" style={{ color: "var(--sp-gray)" }}>{article.number}</span>
          <span className="label self-start md:col-span-2 md:self-auto">{article.tag}</span>
          <div className="flex items-center justify-end gap-2 self-start md:col-span-2 md:order-last md:self-auto">
            <span className="font-sans text-xs hidden md:inline" style={{ color: "var(--sp-gray)" }}>{article.readTime}</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-30 group-hover:opacity-80 transition-opacity" style={{ color: "var(--sp-black)" }} />
          </div>
          <span className="col-span-3 md:col-span-7 font-serif text-base lg:text-lg leading-snug" style={{ color: "var(--sp-black)" }}>{article.title}</span>
        </div>
      </Link>
    </FadeIn>
  );
}

function ArticleView({ article, onBack, onAuditClick }: {
  article: Article;
  onBack: () => void;
  onAuditClick: () => void;
}) {
  const nextIndex = (articles.findIndex(a => a.slug === article.slug) + 1) % articles.length;
  const nextArticle = articles[nextIndex];
  const related = getRelated(article, nextArticle);
  const articleUrl = `${BASE_URL}/journal/${article.slug}`;

  return (
    <div style={{ backgroundColor: "var(--sp-white)" }}>
      <SchemaMarkup schema={[
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Journal", "item": `${BASE_URL}/journal` },
            { "@type": "ListItem", "position": 3, "name": article.title, "item": articleUrl },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": articleUrl,
          "headline": article.title,
          "description": article.excerpt,
          "url": articleUrl,
          "mainEntityOfPage": { "@type": "WebPage", "@id": articleUrl },
          "image": `${BASE_URL}/og/journal.jpg`,
          "author": {
            "@type": "Organization",
            "name": "Beyond Basics Studio",
            "url": `${BASE_URL}/`,
          },
          "publisher": {
            "@type": "Organization",
            "name": "Beyond Basics Studio",
            "url": `${BASE_URL}/`,
            "logo": { "@type": "ImageObject", "url": `${BASE_URL}/favicon.svg` },
          },
          "datePublished": toISO(article.date),
          "dateModified": toISO(article.date),
          "articleSection": article.tag,
          "wordCount": wordCount(article),
          "keywords": `Google Business Profile, GBP, local SEO, ${article.tag.toLowerCase()}, Map Pack, Google Maps`,
          "about": [
            { "@type": "Thing", "name": "Google Business Profile" },
            { "@type": "Thing", "name": "Local SEO" },
            { "@type": "Thing", "name": "Google Maps Marketing" },
          ],
          "isPartOf": { "@type": "Blog", "url": `${BASE_URL}/journal`, "name": "Beyond Basics Studio Journal" },
        },
      ]} />

      {/* Hero */}
      <section className="section-dark border-b" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            {/* Breadcrumb nav */}
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex items-center gap-2 list-none p-0 m-0">
                <li>
                  <Link href="/">
                    <span className="label opacity-40 hover:opacity-70 transition-opacity cursor-pointer" style={{ color: "var(--sp-white)" }}>Home</span>
                  </Link>
                </li>
                <li aria-hidden="true"><span className="label opacity-30" style={{ color: "var(--sp-white)" }}>/</span></li>
                <li>
                  <button onClick={onBack} className="label opacity-40 hover:opacity-70 transition-opacity" style={{ color: "var(--sp-white)" }}>
                    Journal
                  </button>
                </li>
                <li aria-hidden="true"><span className="label opacity-30" style={{ color: "var(--sp-white)" }}>/</span></li>
                <li aria-current="page"><span className="label opacity-60" style={{ color: "var(--sp-white)" }}>{article.tag}</span></li>
              </ol>
            </nav>

            <div className="flex items-center gap-4 mb-6">
              <span className="label" style={{ color: "rgba(247,244,240,0.7)" }}>{article.tag}</span>
              <span className="label" style={{ color: "rgba(247,244,240,0.45)" }}>·</span>
              <span className="label" style={{ color: "rgba(247,244,240,0.7)" }}>{article.date}</span>
              <span className="label" style={{ color: "rgba(247,244,240,0.45)" }}>·</span>
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
                  <h2 className="font-serif mb-5" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--sp-black)" }}>
                    {section.heading}
                  </h2>
                )}
                {section.body.split("\n\n").map((para, j) => (
                  <p key={j} className="font-sans text-sm leading-[1.85] mb-5" style={{ color: "var(--sp-gray)" }}>
                    {para}
                  </p>
                ))}
              </div>
            </FadeIn>
          ))}

          {/* Internal backlinks to key site sections */}
          <FadeIn delay={0.1}>
            <div className="mt-14 p-8 border" style={{ borderColor: "var(--sp-rule)", backgroundColor: "var(--sp-cream)" }}>
              <p className="label mb-5">Also from Beyond Basics Studio</p>
              <ul className="space-y-4">
                <li>
                  <Link href="/services">
                    <div className="flex items-start gap-3 group cursor-pointer">
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-40 group-hover:opacity-90 group-hover:translate-x-0.5 transition-all" style={{ color: "var(--sp-black)" }} />
                      <span className="font-sans text-sm group-hover:opacity-60 transition-opacity" style={{ color: "var(--sp-black)" }}>
                        GBP management plans — Basic $200/mo, Growth $500/mo, Premium $1,000/mo
                      </span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/customers">
                    <div className="flex items-start gap-3 group cursor-pointer">
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-40 group-hover:opacity-90 group-hover:translate-x-0.5 transition-all" style={{ color: "var(--sp-black)" }} />
                      <span className="font-sans text-sm group-hover:opacity-60 transition-opacity" style={{ color: "var(--sp-black)" }}>
                        30 case studies — real results from real clients across 15+ industries
                      </span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <div className="flex items-start gap-3 group cursor-pointer">
                      <ArrowRight className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-40 group-hover:opacity-90 group-hover:translate-x-0.5 transition-all" style={{ color: "var(--sp-black)" }} />
                      <span className="font-sans text-sm group-hover:opacity-60 transition-opacity" style={{ color: "var(--sp-black)" }}>
                        Get your free GBP audit — we'll identify what's suppressing your local ranking
                      </span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </FadeIn>

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

      {/* Related articles */}
      {related.length > 0 && (
        <section className="section-cream border-t" style={{ borderColor: "var(--sp-rule)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
            <FadeIn>
              <p className="label mb-2">Related Articles</p>
            </FadeIn>
            {related.map((a, i) => (
              <RelatedArticleRow key={a.slug} article={a} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Next article */}
      {nextArticle && (
        <section className="border-t section-light" style={{ borderColor: "var(--sp-rule)" }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
            <FadeIn>
              <p className="label mb-8">Next Article</p>
              <Link href={`/journal/${nextArticle.slug}`}>
                <div className="group text-left w-full sm:max-w-2xl flex items-start justify-between gap-8 cursor-pointer">
                  <div>
                    <span className="label block mb-3">{nextArticle.tag}</span>
                    <h3
                      className="font-serif leading-snug group-hover:opacity-60 transition-opacity duration-300"
                      style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)", color: "var(--sp-black)" }}
                    >
                      {nextArticle.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-5 h-5 shrink-0 mt-1 opacity-30 group-hover:opacity-80 group-hover:translate-x-1 transition-all duration-300" style={{ color: "var(--sp-black)" }} />
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Free audit CTA */}
      <section className="section-dark border-t" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <FadeUp>
            <h2 className="font-serif leading-tight max-w-xl" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "var(--sp-white)" }}>
              Ready to put this into practice?
            </h2>
          </FadeUp>
          <FadeIn delay={0.15} className="flex items-center gap-4 shrink-0">
            <button onClick={onAuditClick} className="btn btn-white">
              Free GBP Audit <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onBack}
              className="flex items-center gap-2 group label"
              style={{ color: "rgba(247,244,240,0.5)" }}
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-200" />
              Journal
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

export default function Journal({ onAuditClick }: { onAuditClick: () => void }) {
  const params = useParams<{ slug?: string }>();
  const [, navigate] = useLocation();

  const articleFromUrl = params.slug ? (articles.find(a => a.slug === params.slug) ?? null) : null;
  const [manualSelected, setManualSelected] = useState<Article | null>(null);
  const selected = articleFromUrl ?? manualSelected;

  usePageMeta(selected ? {
    title: `${selected.title} — Beyond Basics Studio`,
    description: selected.excerpt,
    ogImage: "journal.jpg",
    url: `/journal/${selected.slug}`,
  } : {
    title: "Journal — Beyond Basics Studio",
    description: "From the Playbook. 10 expert articles on Google Business Profile strategy, local SEO, review growth, and Map Pack domination.",
    ogImage: "journal.jpg",
    url: "/journal",
  });

  const handleSelect = (article: Article) => {
    navigate(`/journal/${article.slug}`);
    setManualSelected(article);
    window.scrollTo({ top: 0 });
  };

  const handleBack = () => {
    navigate("/journal");
    setManualSelected(null);
    window.scrollTo({ top: 0 });
  };

  if (selected) {
    return (
      <ArticleView
        article={selected}
        onBack={handleBack}
        onAuditClick={onAuditClick}
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
            { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
            { "@type": "ListItem", "position": 2, "name": "Journal", "item": `${BASE_URL}/journal` },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${BASE_URL}/journal`,
          "url": `${BASE_URL}/journal`,
          "name": "Journal — Beyond Basics Studio",
          "description": "Expert articles on Google Business Profile strategy, local SEO, review growth, and Map Pack domination from the team at Beyond Basics Studio.",
          "publisher": {
            "@type": "Organization",
            "name": "Beyond Basics Studio",
            "url": `${BASE_URL}/`,
            "logo": { "@type": "ImageObject", "url": `${BASE_URL}/favicon.svg` },
          },
          "blogPost": articles.map(a => ({
            "@type": "BlogPosting",
            "@id": `${BASE_URL}/journal/${a.slug}`,
            "headline": a.title,
            "description": a.excerpt,
            "url": `${BASE_URL}/journal/${a.slug}`,
            "datePublished": toISO(a.date),
            "dateModified": toISO(a.date),
            "wordCount": wordCount(a),
            "articleSection": a.tag,
            "author": { "@type": "Organization", "name": "Beyond Basics Studio" },
            "image": `${BASE_URL}/og/journal.jpg`,
          })),
        },
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
            <p className="font-sans text-sm leading-relaxed mt-8 max-w-md" style={{ color: "rgba(247,244,240,0.5)" }}>
              Expert articles on Google Business Profile strategy, local SEO, review growth, and Map Pack domination — from the team managing 500+ profiles across San Francisco, Toronto, London, Dubai, and Beirut.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <FadeIn><p className="label mb-10">Latest</p></FadeIn>
          <FadeUp>
            <Link href={`/journal/${featured.slug}`}>
              <div className="group text-left w-full cursor-pointer" onClick={() => setManualSelected(featured)}>
                <div className="grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-1">
                    <span className="font-sans text-xs" style={{ color: "var(--sp-gray)" }}>{featured.number}</span>
                  </div>
                  <div className="md:col-span-7">
                    <div className="flex items-center gap-4 mb-5">
                      <span className="label">{featured.tag}</span>
                      <span className="font-sans text-xs" style={{ color: "var(--sp-gray)" }}>{featured.date}</span>
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
              </div>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* All articles grid */}
      <section className="section-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <FadeIn><p className="label mb-2">All Articles</p></FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-px mt-4" style={{ backgroundColor: "var(--sp-rule)" }}>
            {rest.map((article, i) => (
              <div key={article.slug} className="section-cream" onClick={() => setManualSelected(article)}>
                <ArticleCard article={article} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article index */}
      <section className="section-light border-t border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <FadeIn><p className="label mb-10">Article Index</p></FadeIn>
          <ul className="divide-y" style={{ borderColor: "var(--sp-rule)" }}>
            {[...articles].reverse().map((article, i) => (
              <li key={article.slug}>
                <FadeIn delay={i * 0.04}>
                  <Link href={`/journal/${article.slug}`}>
                    <div
                      className="group w-full text-left py-5 hover:opacity-60 transition-opacity duration-200 cursor-pointer
                        grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-1.5
                        md:grid-cols-12 md:gap-4 md:items-baseline"
                      onClick={() => setManualSelected(article)}
                    >
                      <span className="font-sans text-xs self-start md:col-span-1 md:self-auto" style={{ color: "var(--sp-gray)" }}>{String(articles.length - i).padStart(2, "0")}</span>
                      <span className="label self-start md:col-span-2 md:self-auto">{article.tag}</span>
                      <span className="font-sans text-xs text-right self-start md:col-span-2 md:order-last md:self-auto" style={{ color: "var(--sp-gray)" }}>{article.readTime}</span>
                      <span className="col-span-3 md:col-span-7 font-serif text-base lg:text-lg leading-snug" style={{ color: "var(--sp-black)" }}>{article.title}</span>
                    </div>
                  </Link>
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
