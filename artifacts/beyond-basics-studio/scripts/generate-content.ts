/**
 * generate-content.ts
 * Runs via `tsx scripts/generate-content.ts` before every build.
 * Produces:
 *   public/llms-full.txt  — human/LLM-readable plain text of every page
 *   public/content.json   — structured JSON for JS-capable LLM environments
 *                           (accessible via window.__BBS_CONTENT__ once injected)
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { articles } from "../src/data/articles.js";
import { customers } from "../src/data/customers.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public");
mkdirSync(PUBLIC, { recursive: true });

// ─── Static page content ──────────────────────────────────────────────────────

const SITE = {
  name: "Beyond Basics Studio",
  url: "https://www.beyondbasicsstudio.com",
  email: "hello@beyondbasics.studio",
  phone: null,
  founded: "2021",
  offices: ["San Francisco", "Toronto", "London", "Dubai", "Beirut"],
  tagline: "We genuinely give a sh*t.",
  description:
    "Beyond Basics Studio is a Google Business Profile (GBP) management agency founded in 2021. We help local businesses dominate Google Maps and local search results through expert GBP optimisation, management, and strategy.",
};

const SERVICES = [
  {
    name: "Basic",
    price: "$200/month",
    locations: "1 location",
    tagline: "Foundational maintenance for single-location businesses.",
    features: [
      "Full GBP setup and optimisation",
      "Daily automated + weekly manual audits",
      "NAP monitoring across 50+ directories",
      "1–2 Google Posts per month",
      "Q&A seeding",
      "Basic review monitoring",
      "1-page monthly report",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "$500/month",
    locations: "Up to 5 locations",
    badge: "Most Popular",
    tagline:
      "Proactive growth for multi-service businesses targeting top-3.",
    features: [
      "Everything in Basic",
      "4–8 posts + 2 videos per month",
      "Review automation (100 requests/month)",
      "AI response templates",
      "Competitor gap analysis (10 rivals)",
      "Bi-weekly dashboard",
      "5-page performance report",
      "White-label review funnels + custom campaigns",
    ],
  },
  {
    name: "Premium",
    price: "$1,000/month",
    locations: "Up to 50 locations",
    tagline: "Enterprise-level GBP domination for multi-location brands.",
    features: [
      "Everything in Growth",
      "Real-time 24/7 monitoring",
      "200+ review requests/month",
      "Sentiment analysis",
      "White-label funnels",
      "12+ posts/month",
      "360° tours",
      "100+ citations + schema markup",
      "Custom KPI dashboard",
      "Dedicated account manager",
    ],
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    label: "GBP Audit",
    desc: "Full profile analysis, competitive landscape, and opportunity mapping.",
  },
  {
    step: "02",
    label: "Strategy",
    desc: "Custom domination roadmap built around your market and goals.",
  },
  {
    step: "03",
    label: "Implement",
    desc: "Full optimisation sprint across every profile signal and asset.",
  },
  {
    step: "04",
    label: "Optimise",
    desc: "Continuous AI tuning and transparent monthly reporting.",
  },
];

const SERVICES_FAQ = [
  {
    q: "What's included in the initial setup?",
    a: "We begin with a comprehensive audit of your existing GBP, competitive analysis, and a full optimisation sprint — categories, attributes, business description, photos, and service areas — all within the first week.",
  },
  {
    q: "How do you generate more reviews?",
    a: "We deploy proven post-transaction sequences via email and SMS, using Google's compliant review request methodology. Growth and Premium clients see an average 300% increase in monthly reviews within 60 days.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Absolutely. You can change tiers at any time with 30 days notice. Upgrades activate immediately; downgrades take effect at the next billing cycle. No penalties or lock-in.",
  },
  {
    q: "What reporting will I receive?",
    a: "Detailed performance reports covering: profile views, search impressions, direction requests, call clicks, photo views, review growth, and map rank trends — weekly or monthly depending on your tier.",
  },
];

const CONTACT_FAQ = [
  {
    q: "What exactly is a Google Business Profile?",
    a: "Your GBP is what appears in Google Maps and local search results. A well-optimised GBP is the highest-ROI local marketing asset available — yet most businesses manage it poorly. We fix that.",
  },
  {
    q: "How quickly will I see results?",
    a: "Most clients see measurable improvements in profile views and calls within 30 days. Map Pack ranking improvements typically happen within 60–90 days. We track everything and report transparently.",
  },
  {
    q: "What are your pricing options?",
    a: "Three tiers: Basic ($200/mo), Growth ($500/mo), and Premium ($1,000/mo). All are month-to-month with no lock-in.",
  },
  {
    q: "Can you manage multiple locations?",
    a: "Yes. Growth covers up to 5 locations and Premium covers up to 50. We have clients managing entire regional franchise networks on a single Premium plan.",
  },
];

const TEAM = [
  {
    name: "Marcus Chen",
    role: "CEO & Founder",
    bio: "Former Google local team lead with 10 years of algorithm expertise. Built Beyond Basics to give every local business the competitive intelligence only large brands enjoyed.",
  },
  {
    name: "Priya Sharma",
    role: "Head of GBP Operations",
    bio: "Managed over 1,200 GBP profiles across 40+ industries. The engine behind our 98% client retention rate.",
  },
  {
    name: "James O'Reilly",
    role: "AI Strategy Director",
    bio: "Built MapMaster™ from the ground up. Data scientist by training, local SEO obsessive by nature.",
  },
  {
    name: "Sofia Mendez",
    role: "Client Success Lead",
    bio: "The reason clients stay. Sofia ensures every client feels heard, sees results, and grows with us long term.",
  },
];

const ABOUT_VALUES = [
  {
    title: "Transparent Reporting",
    desc: "No smoke, no mirrors. Every metric is real, verifiable, and tied to your business growth.",
  },
  {
    title: "AI-Powered Precision",
    desc: "MapMaster™ runs 24/7, testing and optimising faster than any competitor can react.",
  },
  {
    title: "Results-First Culture",
    desc: "We celebrate outcomes — not activity. Our team is incentivised around your profile's actual performance.",
  },
];

const ABOUT_STATS = [
  { value: "500+", label: "Profiles Managed" },
  { value: "30+", label: "Countries Served" },
  { value: "98%", label: "Client Retention" },
  { value: "2021", label: "Year Founded" },
];

const CASE_STUDIES = [
  {
    business: "Urban Pizza",
    type: "Restaurant",
    location: "Chicago, IL",
    tier: "Growth",
    duration: "90 days",
    highlight: "+3,250% profile views",
    before: { views: "180/mo", rank: "#14", reviews: "12", calls: "8/mo" },
    after: { views: "5,200/mo", rank: "#2", reviews: "214", calls: "268/mo" },
    quote: "We went from 8 calls a month to 268. Best investment we've ever made.",
    author: "Maria T., Owner",
  },
  {
    business: "Summit Dental",
    type: "Healthcare",
    location: "Denver, CO",
    tier: "Premium",
    duration: "60 days",
    highlight: "#1 in Local Map Pack",
    before: { views: "320/mo", rank: "#9", reviews: "28", calls: "22/mo" },
    after: { views: "8,100/mo", rank: "#1", reviews: "312", calls: "190/mo" },
    quote: "From page-2 obscurity to the top spot. New patients up 750%.",
    author: "Dr. James R., Practice Owner",
  },
  {
    business: "City Auto Repair",
    type: "Automotive",
    location: "Austin, TX",
    tier: "Growth",
    duration: "120 days",
    highlight: "+2,800% call volume",
    before: { views: "95/mo", rank: "#11", reviews: "6", calls: "5/mo" },
    after: { views: "3,800/mo", rank: "#3", reviews: "187", calls: "145/mo" },
    quote: "I thought GBP was just a listing. It's now my biggest revenue driver.",
    author: "Carlos M., Owner",
  },
  {
    business: "Harbor Café",
    type: "Café & Bakery",
    location: "Portland, OR",
    tier: "Premium",
    duration: "75 days",
    highlight: "400+ Google Reviews",
    before: { views: "210/mo", rank: "#7", reviews: "19", calls: "12/mo" },
    after: { views: "6,400/mo", rank: "#1", reviews: "401", calls: "98/mo" },
    quote: "Our weekend wait times doubled. Best problem we've ever had.",
    author: "Sarah L., Co-owner",
  },
  {
    business: "Metro Fitness",
    type: "Gym & Fitness",
    location: "Miami, FL",
    tier: "Premium",
    duration: "90 days",
    highlight: "5× membership signups",
    before: { views: "440/mo", rank: "#8", reviews: "31", calls: "18/mo" },
    after: { views: "9,200/mo", rank: "#2", reviews: "560", calls: "312/mo" },
    quote: "New membership signups from Google Maps increased 5x. The ROI is insane.",
    author: "Derek J., Marketing Director",
  },
  {
    business: "Peak Real Estate",
    type: "Real Estate",
    location: "Seattle, WA",
    tier: "Growth",
    duration: "105 days",
    highlight: "4 direct Map Pack closes",
    before: { views: "120/mo", rank: "#15", reviews: "8", calls: "4/mo" },
    after: { views: "4,100/mo", rank: "#3", reviews: "143", calls: "89/mo" },
    quote: "We closed 4 listings in one month that came directly from Google Maps.",
    author: "Amanda P., Principal Agent",
  },
];

// ─── Content JSON ─────────────────────────────────────────────────────────────

const content = {
  meta: {
    generated: new Date().toISOString(),
    version: "1.0",
    description:
      "Complete structured content for beyondbasicsstudio.com. Available at window.__BBS_CONTENT__ when JS is executed on any page.",
  },
  site: SITE,
  pages: {
    home: {
      url: `${SITE.url}/`,
      headline: "Stop Losing Customers to Competitors Who Show Up First on Google Maps.",
      subheadline:
        "We manage, optimise, and dominate Google Business Profiles for local businesses ready to lead their market.",
      services: [
        {
          n: "01",
          title: "GBP Strategy & Optimisation",
          desc: "Full profile overhaul — category precision, attribute configuration, and continuous performance monitoring for maximum map visibility.",
        },
        {
          n: "02",
          title: "Review & Reputation Mastery",
          desc: "Systematic review generation and AI-powered responses. Clients typically see 300% growth within 60 days.",
        },
        {
          n: "03",
          title: "Content & Local Domination",
          desc: "Professional photo management, Google Posts strategy, Q&A optimisation, and citation building for sustained Map Pack dominance.",
        },
      ],
      stats: [
        { value: "500+", label: "Active Clients" },
        { value: "300%", label: "Avg Review Growth" },
        { value: "12×", label: "Avg Call Increase" },
        { value: "90", label: "Days to Top 3" },
      ],
    },
    services: {
      url: `${SITE.url}/services`,
      headline: "GBP tiers from Basic to Domination.",
      pricing: SERVICES,
      howItWorks: HOW_IT_WORKS,
      faq: SERVICES_FAQ,
    },
    caseStudies: {
      url: `${SITE.url}/case-studies`,
      headline: "Proof, not pitches.",
      description:
        "Actual before/after results from real clients who chose to stop being invisible on Google Maps.",
      stats: [
        { value: "500+", label: "Active Clients" },
        { value: "300%", label: "Avg Review Growth" },
        { value: "12×", label: "Avg Call Increase" },
        { value: "90", label: "Days to Top 3" },
      ],
      cases: CASE_STUDIES,
    },
    customers: {
      url: `${SITE.url}/customers`,
      headline: "Thirty stories. Zero guesswork.",
      description:
        "Every story here is real. Every business, every number, every quote.",
      stats: [
        { value: "30+", label: "Detailed Case Studies" },
        { value: "18", label: "Industries Covered" },
        { value: "340%", label: "Avg Inquiry Increase" },
        { value: "$1.2M", label: "Single Client Storm Season" },
      ],
      stories: customers.map((c) => ({
        id: c.id,
        business: c.business,
        owner: c.owner,
        type: c.type,
        location: c.location,
        tier: c.tier,
        subtitle: c.subtitle,
        highlight: c.highlight,
        intro: c.intro,
        story: c.story,
        quote1: c.quote1,
        quote2: c.quote2 ?? null,
        stats: c.stats,
      })),
    },
    journal: {
      url: `${SITE.url}/journal`,
      headline: "Insights on GBP management and local SEO.",
      articles: articles.map((a) => ({
        slug: a.slug,
        number: a.number,
        tag: a.tag,
        date: a.date,
        readTime: a.readTime,
        title: a.title,
        subtitle: a.subtitle,
        excerpt: a.excerpt,
        url: `${SITE.url}/journal/${a.slug}`,
        sections: a.sections.map((s) => ({
          heading: s.heading ?? null,
          body: s.body,
        })),
      })),
    },
    about: {
      url: `${SITE.url}/about`,
      headline: "Data-driven GBP experts since 2021.",
      story: [
        "In 2021, our founder Marcus Chen left his role on Google's local team after witnessing firsthand how a well-managed Google Business Profile could transform a local business — and how poorly most businesses managed theirs.",
        "The average local business leaves 70% of its Google Maps potential untouched. Not because they don't care — because they lack the time, expertise, and tools to do it right.",
        "Beyond Basics Studio was built to fix that. Today we manage 500+ profiles across 30+ countries, delivering results that most business owners thought were impossible.",
      ],
      stats: ABOUT_STATS,
      team: TEAM,
      values: ABOUT_VALUES,
    },
    contact: {
      url: `${SITE.url}/contact`,
      headline: "Let's talk domination.",
      email: SITE.email,
      offices: SITE.offices,
      responseTime: "Within 24 hours",
      calendly: "https://calendly.com/beyondbasicsstudio/30min",
      faq: CONTACT_FAQ,
    },
  },
};

// ─── Write content.json ───────────────────────────────────────────────────────

writeFileSync(
  join(PUBLIC, "content.json"),
  JSON.stringify(content, null, 2),
  "utf8"
);
console.log("✓ public/content.json written");

// ─── Write llms-full.txt ──────────────────────────────────────────────────────

function lines(...parts: string[]): string {
  return parts.join("\n");
}

const txt = lines(
  "# Beyond Basics Studio — Complete Site Content for LLMs",
  "",
  "> Generated: " + new Date().toISOString(),
  "> Source: beyondbasicsstudio.com/content.json (structured JSON version)",
  "> This file contains 100% of the site's text content — all pages, all articles in full, all customer stories.",
  "",
  "---",
  "",
  "## SITE",
  `Name: ${SITE.name}`,
  `URL: ${SITE.url}`,
  `Email: ${SITE.email}`,
  `Founded: ${SITE.founded}`,
  `Offices: ${SITE.offices.join(" · ")}`,
  `Description: ${SITE.description}`,
  "",
  "---",
  "",
  "## HOME PAGE",
  `URL: ${SITE.url}/`,
  "",
  "Headline: Stop Losing Customers to Competitors Who Show Up First on Google Maps.",
  "Subheadline: We manage, optimise, and dominate Google Business Profiles for local businesses ready to lead their market.",
  "",
  "Stats: 500+ Active Clients · 300% Avg Review Growth · 12× Avg Call Increase · 90 Days to Top 3",
  "",
  "Services:",
  "  01 — GBP Strategy & Optimisation: Full profile overhaul — category precision, attribute configuration, and continuous performance monitoring for maximum map visibility.",
  "  02 — Review & Reputation Mastery: Systematic review generation and AI-powered responses. Clients typically see 300% growth within 60 days.",
  "  03 — Content & Local Domination: Professional photo management, Google Posts strategy, Q&A optimisation, and citation building for sustained Map Pack dominance.",
  "",
  "---",
  "",
  "## SERVICES PAGE",
  `URL: ${SITE.url}/services`,
  "",
  ...SERVICES.flatMap((s) => [
    `### ${s.name} — ${s.price} (${s.locations})${(s as any).badge ? " [" + (s as any).badge + "]" : ""}`,
    s.tagline,
    ...s.features.map((f) => `  - ${f}`),
    "",
  ]),
  "How It Works:",
  ...HOW_IT_WORKS.map((h) => `  ${h.step} ${h.label}: ${h.desc}`),
  "",
  "FAQ:",
  ...SERVICES_FAQ.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, ""]),
  "",
  "---",
  "",
  "## CASE STUDIES PAGE",
  `URL: ${SITE.url}/case-studies`,
  "",
  ...CASE_STUDIES.flatMap((c) => [
    `### ${c.business} (${c.type}, ${c.location}) — ${c.tier} tier, ${c.duration}`,
    `Highlight: ${c.highlight}`,
    `Before: Views ${c.before.views} | Rank ${c.before.rank} | Reviews ${c.before.reviews} | Calls ${c.before.calls}`,
    `After:  Views ${c.after.views} | Rank ${c.after.rank} | Reviews ${c.after.reviews} | Calls ${c.after.calls}`,
    `Quote: "${c.quote}" — ${c.author}`,
    "",
  ]),
  "",
  "---",
  "",
  "## CUSTOMERS PAGE (30 Stories)",
  `URL: ${SITE.url}/customers`,
  "",
  ...customers.flatMap((c) => [
    `### ${c.business} (${c.type}, ${c.location}) — ${c.tier} tier`,
    `Owner: ${c.owner}`,
    `Highlight: ${c.highlight}`,
    `Intro: ${c.intro}`,
    "",
    "Story:",
    c.story,
    "",
    `Quote: "${c.quote1}" — ${c.owner}`,
    ...(c.quote2 ? [`Quote 2: "${c.quote2}"`] : []),
    "Stats: " + c.stats.map((s) => `${s.label}: ${s.value}`).join(" | "),
    "",
    "---",
    "",
  ]),
  "",
  "## JOURNAL PAGE (Full Article Bodies)",
  `URL: ${SITE.url}/journal`,
  "",
  ...articles.flatMap((a) => [
    `### Article ${a.number}: ${a.title}`,
    `URL: ${SITE.url}/journal/${a.slug}`,
    `Date: ${a.date} | Tag: ${a.tag} | Read time: ${a.readTime}`,
    `Subtitle: ${a.subtitle}`,
    `Excerpt: ${a.excerpt}`,
    "",
    ...a.sections.flatMap((s) => [
      ...(s.heading ? [`#### ${s.heading}`] : []),
      s.body,
      "",
    ]),
    "---",
    "",
  ]),
  "",
  "## ABOUT PAGE",
  `URL: ${SITE.url}/about`,
  "",
  "Our Story:",
  "In 2021, our founder Marcus Chen left his role on Google's local team after witnessing firsthand how a well-managed Google Business Profile could transform a local business — and how poorly most businesses managed theirs.",
  "",
  "The average local business leaves 70% of its Google Maps potential untouched. Not because they don't care — because they lack the time, expertise, and tools to do it right.",
  "",
  "Beyond Basics Studio was built to fix that. Today we manage 500+ profiles across 30+ countries, delivering results that most business owners thought were impossible.",
  "",
  `Stats: ${ABOUT_STATS.map((s) => `${s.value} ${s.label}`).join(" · ")}`,
  "",
  "Team:",
  ...TEAM.map((m) => `  ${m.name} — ${m.role}: ${m.bio}`),
  "",
  "Values:",
  ...ABOUT_VALUES.map((v) => `  ${v.title}: ${v.desc}`),
  "",
  "---",
  "",
  "## CONTACT PAGE",
  `URL: ${SITE.url}/contact`,
  "",
  `Email: ${SITE.email}`,
  `Offices: ${SITE.offices.join(" · ")}`,
  "Response Time: Within 24 hours",
  "Free 30-min strategy call: https://calendly.com/beyondbasicsstudio/30min",
  "",
  "FAQ:",
  ...CONTACT_FAQ.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, ""]),
  "",
  "---",
  "",
  "## PROPRIETARY TECHNOLOGY",
  "",
  "MapMaster™ — Beyond Basics Studio's proprietary AI platform. Runs 24/7, continuously testing and optimising GBP signals. Powers the review response system that increased average star ratings by 0.8 stars across 89 client profiles.",
  "",
  "---",
  "",
  "## SITEMAP",
  `${SITE.url}/`,
  `${SITE.url}/services`,
  `${SITE.url}/case-studies`,
  `${SITE.url}/customers`,
  `${SITE.url}/journal`,
  ...articles.map((a) => `${SITE.url}/journal/${a.slug}`),
  `${SITE.url}/about`,
  `${SITE.url}/contact`,
);

writeFileSync(join(PUBLIC, "llms-full.txt"), txt, "utf8");
console.log("✓ public/llms-full.txt written");
