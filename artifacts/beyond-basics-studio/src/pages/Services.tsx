import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, ChevronDown, MapPin, Star, TrendingUp, Zap, Shield, BarChart3, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function Section({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}
function FI({ children, className }: { children: React.ReactNode; className?: string }) {
  return <motion.div variants={fadeUp} className={className}>{children}</motion.div>;
}

function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left group"
      >
        <span className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{title}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-5 text-gray-600 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Services({ onAuditClick }: { onAuditClick: () => void }) {
  const tiers = [
    {
      name: "Basic",
      price: "$200/mo",
      color: "border-gray-200",
      badge: "",
      features: [
        "1 GBP Location",
        "Initial profile optimization",
        "4 Google Posts per month",
        "Business hours management",
        "Basic keyword optimization",
        "Monthly performance report",
        "Review response templates",
        "Email support",
      ],
    },
    {
      name: "Growth",
      price: "$500/mo",
      color: "border-blue-500",
      badge: "Most Popular",
      features: [
        "Up to 3 GBP Locations",
        "Everything in Basic",
        "Active review generation campaigns",
        "16 Google Posts per month",
        "Google Ads local campaigns",
        "Competitor gap analysis",
        "Weekly performance reports",
        "Photo management & optimization",
        "Priority email & chat support",
        "Citation building (20 directories)",
      ],
    },
    {
      name: "Premium",
      price: "$1,000/mo",
      color: "border-emerald-500",
      badge: "Full Domination",
      features: [
        "Unlimited GBP Locations",
        "Everything in Growth",
        "MapMaster™ AI engine",
        "Dedicated account manager",
        "Daily posting & updates",
        "Advanced citation building",
        "Schema markup implementation",
        "Monthly strategy call",
        "Custom performance dashboard",
        "Local link building",
        "Quarterly GBP audit",
        "24/7 priority support",
      ],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20 text-center">
        <Section className="max-w-3xl mx-auto px-4 sm:px-6">
          <FI>
            <span className="text-blue-400 text-xs uppercase tracking-widest font-semibold">Services</span>
            <h1 className="font-serif text-white mt-4 mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Our GBP Tiers: From Basic to Premium Domination
            </h1>
            <p className="text-white/60 text-lg">
              Every tier is built to move the needle. Choose based on your ambition.
            </p>
          </FI>
        </Section>
      </section>

      {/* Comparison Table */}
      <section className="section-light py-20">
        <Section className="max-w-6xl mx-auto px-4 sm:px-6">
          <FI className="text-center mb-12">
            <h2 className="text-gray-900 text-3xl font-serif">Feature Comparison</h2>
          </FI>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold w-1/2">Feature</th>
                  <th className="py-4 px-4 text-center text-gray-700 font-bold">Basic<br /><span className="font-normal text-gray-500">$200/mo</span></th>
                  <th className="py-4 px-4 text-center text-blue-700 font-bold bg-blue-50">Growth<br /><span className="font-normal text-blue-500">$500/mo</span></th>
                  <th className="py-4 px-4 text-center text-emerald-700 font-bold">Premium<br /><span className="font-normal text-emerald-500">$1,000/mo</span></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "GBP Locations", basic: "1", growth: "Up to 3", premium: "Unlimited" },
                  { feature: "Monthly Posts", basic: "4", growth: "16", premium: "Daily" },
                  { feature: "Profile Optimization", basic: true, growth: true, premium: true },
                  { feature: "Review Response", basic: "Templates", growth: "Active", premium: "AI-Powered" },
                  { feature: "Review Generation", basic: false, growth: true, premium: true },
                  { feature: "Google Ads", basic: false, growth: true, premium: true },
                  { feature: "Citation Building", basic: false, growth: "20 dirs", premium: "Unlimited" },
                  { feature: "MapMaster™ AI", basic: false, growth: false, premium: true },
                  { feature: "Dedicated Manager", basic: false, growth: false, premium: true },
                  { feature: "Reporting", basic: "Monthly", growth: "Weekly", premium: "Custom Dashboard" },
                  { feature: "Support", basic: "Email", growth: "Priority", premium: "24/7 Priority" },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                    <td className="py-3.5 px-6 text-gray-700 font-medium">{row.feature}</td>
                    {[row.basic, row.growth, row.premium].map((val, j) => (
                      <td key={j} className={`py-3.5 px-4 text-center ${j === 1 ? "bg-blue-50/50" : ""}`}>
                        {typeof val === "boolean" ? (
                          val
                            ? <CheckCircle className="w-4 h-4 text-emerald-500 mx-auto" />
                            : <span className="text-gray-300">—</span>
                        ) : (
                          <span className="text-gray-700 font-medium">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </section>

      {/* Tier Detail Accordions */}
      {tiers.map((tier, ti) => (
        <section key={ti} className={ti % 2 === 0 ? "section-dark py-16" : "section-light py-16"}>
          <Section className="max-w-3xl mx-auto px-4 sm:px-6">
            <FI>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className={`text-3xl font-serif font-bold ${ti % 2 === 0 ? "text-white" : "text-gray-900"}`}>
                    {tier.name} Plan
                  </h2>
                  <p className={`text-lg font-semibold mt-1 ${ti % 2 === 0 ? "text-blue-400" : "text-blue-700"}`}>{tier.price}</p>
                </div>
                {tier.badge && (
                  <span className="bg-emerald-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">{tier.badge}</span>
                )}
              </div>
              <div className={ti % 2 === 0 ? "border-white/10 divide-white/10 [&>div]:border-white/10 [&>div>button]:text-white [&>div>div]:text-white/60" : ""}>
                {[
                  { q: "What's included in the initial setup?", a: "We begin with a comprehensive audit of your existing GBP, competitive landscape analysis, and a full optimization sprint — categories, attributes, business description, photos, and service areas." },
                  { q: "How do you generate more reviews?", a: "We deploy proven post-transaction sequences via email and SMS, with Google's compliant review request methodology. Growth and Premium clients see an average 300% increase in monthly reviews within 60 days." },
                  { q: "What does 'Map Pack' mean?", a: "The Map Pack is the 3-business block that appears at the top of Google search results for local queries. Being in the top 3 drives the majority of local business leads — we specialize in getting and keeping you there." },
                  { q: "Can I upgrade or downgrade my plan?", a: "Absolutely. You can change tiers at any time with 30 days notice. Upgrades are activated immediately; downgrades take effect at your next billing cycle." },
                  { q: "What reporting will I receive?", a: "You'll receive detailed performance reports covering: profile views, search impressions, direction requests, call clicks, photo views, review growth, and map rank position trends." },
                  { q: "Do I need to provide anything?", a: "Just access to your GBP account and any brand assets you have. We handle everything else — no ongoing work required from you." },
                ].map((item) => (
                  <AccordionItem key={item.q} title={item.q}>{item.a}</AccordionItem>
                ))}
              </div>
              <button
                onClick={onAuditClick}
                className="mt-8 bg-blue-700 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                Choose {tier.name} Plan
              </button>
            </FI>
          </Section>
        </section>
      ))}

      {/* Onboarding Timeline */}
      <section className="section-light py-20">
        <Section className="max-w-5xl mx-auto px-4 sm:px-6">
          <FI className="text-center mb-14">
            <h2 className="text-gray-900 text-3xl font-serif">How We Work</h2>
            <p className="text-gray-500 mt-3">From zero to domination in 4 steps</p>
          </FI>
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200 hidden md:block" />
            <div className="grid md:grid-cols-5 gap-6 relative">
              {[
                { icon: BarChart3, label: "GBP Audit", step: "01", desc: "Full profile + competitor analysis" },
                { icon: TrendingUp, label: "Strategy", step: "02", desc: "Custom domination roadmap" },
                { icon: Zap, label: "Implement", step: "03", desc: "Full optimization & setup" },
                { icon: Star, label: "Optimize", step: "04", desc: "Continuous testing & AI tuning" },
                { icon: BarChart3, label: "Report", step: "05", desc: "Transparent results reporting" },
              ].map((step, i) => (
                <FI key={i} className="text-center">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 bg-blue-700 text-white rounded-2xl mx-auto mb-4">
                    <step.icon className="w-7 h-7" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-blue-700 rounded-full text-blue-700 text-[10px] font-bold flex items-center justify-center">{step.step}</span>
                  </div>
                  <h3 className="text-gray-900 font-bold mb-1">{step.label}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </FI>
              ))}
            </div>
          </div>
        </Section>
      </section>
    </div>
  );
}
