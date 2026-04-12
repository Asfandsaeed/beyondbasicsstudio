import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Phone, Eye, Star, MapPin, ArrowUp } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>{children}</motion.div>;
}
function FI({ children, className }: { children: React.ReactNode; className?: string }) {
  return <motion.div variants={fadeUp} className={className}>{children}</motion.div>;
}

const cases = [
  {
    business: "Urban Pizza",
    type: "Restaurant",
    location: "Chicago, IL",
    before: { views: "180/mo", rank: "#14", reviews: "12", calls: "8/mo" },
    after: { views: "5,200/mo", rank: "#2", reviews: "214", calls: "268/mo" },
    quote: "We went from 8 calls a month to 268. Beyond Basics is the best investment we've ever made.",
    author: "Maria T., Owner",
    tier: "Growth",
    duration: "90 days",
    highlight: "+3,250% profile views",
  },
  {
    business: "Summit Dental",
    type: "Healthcare",
    location: "Denver, CO",
    before: { views: "320/mo", rank: "#9", reviews: "28", calls: "22/mo" },
    after: { views: "8,100/mo", rank: "#1", reviews: "312", calls: "190/mo" },
    quote: "From page 2 obscurity to the top spot. New patient bookings are up 750%.",
    author: "Dr. James R., Practice Owner",
    tier: "Premium",
    duration: "60 days",
    highlight: "#1 in Local Map Pack",
  },
  {
    business: "City Auto Repair",
    type: "Automotive",
    location: "Austin, TX",
    before: { views: "95/mo", rank: "#11", reviews: "6", calls: "5/mo" },
    after: { views: "3,800/mo", rank: "#3", reviews: "187", calls: "145/mo" },
    quote: "I thought GBP was just a listing. Turns out it's my biggest revenue driver now.",
    author: "Carlos M., Owner",
    tier: "Growth",
    duration: "120 days",
    highlight: "+2,800% call volume",
  },
  {
    business: "Harbor Cafe",
    type: "Cafe & Bakery",
    location: "Portland, OR",
    before: { views: "210/mo", rank: "#7", reviews: "19", calls: "12/mo" },
    after: { views: "6,400/mo", rank: "#1", reviews: "401", calls: "98/mo" },
    quote: "Our weekend wait times doubled. Best problem we've ever had.",
    author: "Sarah L., Co-owner",
    tier: "Premium",
    duration: "75 days",
    highlight: "400+ Google Reviews",
  },
  {
    business: "Metro Fitness",
    type: "Gym & Fitness",
    location: "Miami, FL",
    before: { views: "440/mo", rank: "#8", reviews: "31", calls: "18/mo" },
    after: { views: "9,200/mo", rank: "#2", reviews: "560", calls: "312/mo" },
    quote: "New membership signups from Google Maps increased 5x. The ROI is insane.",
    author: "Derek J., Marketing Director",
    tier: "Premium",
    duration: "90 days",
    highlight: "5x membership signups",
  },
  {
    business: "Peak Real Estate",
    type: "Real Estate",
    location: "Seattle, WA",
    before: { views: "120/mo", rank: "#15", reviews: "8", calls: "4/mo" },
    after: { views: "4,100/mo", rank: "#3", reviews: "143", calls: "89/mo" },
    quote: "We closed 4 listings in one month that came directly from Google Maps. Extraordinary.",
    author: "Amanda P., Principal Agent",
    tier: "Growth",
    duration: "105 days",
    highlight: "4 direct Map Pack closes",
  },
];

export default function CaseStudies({ onAuditClick }: { onAuditClick: () => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20">
        <Section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FI>
            <span className="text-blue-400 text-xs uppercase tracking-widest font-semibold">Proof</span>
            <h1 className="font-serif text-white mt-4 mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Real Results: GBP Transformations
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              No stock photos. No fabricated numbers. These are the actual before/after results from real clients who chose to dominate.
            </p>
          </FI>

          {/* Aggregate stats */}
          <FI className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: "500+", label: "Active Clients" },
              { value: "300%", label: "Avg Review Growth" },
              { value: "12x", label: "Avg Call Increase" },
              { value: "90", label: "Day Avg to Top 3" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-white font-bold font-serif text-4xl">{stat.value}</div>
                <div className="text-white/40 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </FI>
        </Section>
      </section>

      {/* Case Studies Grid */}
      <section className="section-light py-20">
        <Section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <FI key={i}>
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden card-hover cursor-default h-full flex flex-col">
                  {/* Before/after visual */}
                  <div className="bg-gradient-to-br from-gray-900 to-blue-950 p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-700/20 rounded-full blur-2xl" />
                    <div className="relative flex justify-between gap-4">
                      <div>
                        <p className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-2">Before</p>
                        <div className="space-y-1.5">
                          {[
                            { icon: Eye, label: c.before.views },
                            { icon: MapPin, label: c.before.rank + " Map Pack" },
                            { icon: Star, label: c.before.reviews + " reviews" },
                            { icon: Phone, label: c.before.calls + " calls" },
                          ].map((item, j) => (
                            <div key={j} className="flex items-center gap-1.5 text-white/50 text-xs">
                              <item.icon className="w-3 h-3" />
                              <span>{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <ArrowUp className="w-6 h-6 text-emerald-400" />
                        <span className="text-emerald-400 text-xs font-bold mt-1">{c.duration}</span>
                      </div>
                      <div>
                        <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">After</p>
                        <div className="space-y-1.5">
                          {[
                            { icon: Eye, label: c.after.views },
                            { icon: MapPin, label: c.after.rank + " Map Pack" },
                            { icon: Star, label: c.after.reviews + " reviews" },
                            { icon: Phone, label: c.after.calls + " calls" },
                          ].map((item, j) => (
                            <div key={j} className="flex items-center gap-1.5 text-white text-xs font-medium">
                              <item.icon className="w-3 h-3 text-emerald-400" />
                              <span>{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Highlight badge */}
                    <div className="mt-3 inline-block bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-0.5">
                      <span className="text-emerald-400 text-xs font-bold">{c.highlight}</span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-gray-900 font-bold">{c.business}</h3>
                        <p className="text-gray-500 text-xs">{c.type} · {c.location}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.tier === "Premium" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                        {c.tier}
                      </span>
                    </div>
                    <blockquote className="text-gray-600 text-sm italic leading-relaxed flex-1">
                      "{c.quote}"
                    </blockquote>
                    <p className="text-gray-400 text-xs mt-3 font-medium">— {c.author}</p>
                  </div>
                </div>
              </FI>
            ))}
          </div>
        </Section>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-24">
        <Section className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FI>
            <h2 className="font-serif text-white text-4xl mb-5">Your Success Story Starts Here</h2>
            <p className="text-white/60 text-lg mb-8">Every business on this page started exactly where you are now.</p>
            <button
              onClick={onAuditClick}
              className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-10 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-700/40 hover:-translate-y-0.5"
            >
              Claim Your Free Audit
            </button>
          </FI>
        </Section>
      </section>
    </div>
  );
}
