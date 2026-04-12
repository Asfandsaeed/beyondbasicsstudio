import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, TrendingUp, Users, Target, Globe } from "lucide-react";

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

const team = [
  {
    name: "Marcus Chen",
    role: "CEO & Founder",
    bio: "Former Google local team lead with 10 years of algorithm expertise. Built Beyond Basics to give every local business the unfair advantage he saw only large brands enjoying.",
    initials: "MC",
    color: "bg-blue-700",
  },
  {
    name: "Priya Sharma",
    role: "Head of GBP Operations",
    bio: "Managed over 1,200 GBP profiles across 40+ industries. She's the engine behind our 98% client retention rate.",
    initials: "PS",
    color: "bg-emerald-600",
  },
  {
    name: "James O'Reilly",
    role: "AI Strategy Director",
    bio: "Built MapMaster™ from the ground up. Data scientist by training, local SEO obsessive by choice. Believes every data point is a clue to more visibility.",
    initials: "JO",
    color: "bg-purple-700",
  },
  {
    name: "Sofia Mendez",
    role: "Client Success Lead",
    bio: "The reason our clients stay. Sofia ensures every client feels heard, sees results, and grows with us over the long term.",
    initials: "SM",
    color: "bg-rose-600",
  },
];

export default function About({ onAuditClick }: { onAuditClick: () => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20">
        <Section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FI>
            <span className="text-blue-400 text-xs uppercase tracking-widest font-semibold">About Us</span>
            <h1 className="font-serif text-white mt-4 mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Data-Driven GBP Experts
            </h1>
            <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
              We exist because local businesses deserve the same competitive intelligence that enterprise brands take for granted.
            </p>
          </FI>
        </Section>
      </section>

      {/* Story */}
      <section className="section-light py-20">
        <Section className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FI>
              <span className="text-blue-700 text-xs uppercase tracking-widest font-semibold">Our Story</span>
              <h2 className="text-gray-900 text-3xl font-serif mt-3 mb-5">Founded on an Unfair Truth</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                In 2025, our founder Marcus Chen left his role on Google's local team having witnessed firsthand how a well-managed Google Business Profile could transform a local business — and how poorly most businesses managed theirs.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                The average local business leaves 70% of its Google Maps potential untouched. Not because they don't care — because they don't have the time, expertise, or tools to do it right.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Beyond Basics Studio was built to fix that. Today we manage 500+ profiles across 30+ countries, delivering results that most business owners thought were impossible.
              </p>
            </FI>
            <FI>
              <div className="bg-gradient-to-br from-gray-900 to-blue-950 rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "500+", label: "Profiles Managed", icon: Globe },
                    { value: "30+", label: "Countries Served", icon: Target },
                    { value: "98%", label: "Client Retention", icon: Users },
                    { value: "2025", label: "Founded", icon: TrendingUp },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-3xl font-bold font-serif">{stat.value}</div>
                      <div className="text-white/50 text-sm mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FI>
          </div>
        </Section>
      </section>

      {/* Team */}
      <section className="section-dark py-20">
        <Section className="max-w-6xl mx-auto px-4 sm:px-6">
          <FI className="text-center mb-14">
            <span className="text-blue-400 text-xs uppercase tracking-widest font-semibold">The Team</span>
            <h2 className="text-white text-4xl font-serif mt-3">The People Behind Your Results</h2>
          </FI>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <FI key={i}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center card-hover cursor-default">
                  <div className={`w-16 h-16 ${member.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-white font-bold text-xl">{member.initials}</span>
                  </div>
                  <h3 className="text-white font-bold mb-0.5">{member.name}</h3>
                  <p className="text-blue-400 text-xs font-semibold mb-3">{member.role}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </FI>
            ))}
          </div>
        </Section>
      </section>

      {/* Values */}
      <section className="section-light py-20">
        <Section className="max-w-5xl mx-auto px-4 sm:px-6">
          <FI className="text-center mb-14">
            <span className="text-blue-700 text-xs uppercase tracking-widest font-semibold">What We Stand For</span>
            <h2 className="text-gray-900 text-4xl font-serif mt-3">Our Core Values</h2>
          </FI>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Transparent Reporting",
                desc: "No smoke and mirrors. Every metric we report is real, verifiable, and tied to your business growth. You always know exactly what you're paying for.",
                color: "bg-blue-700",
              },
              {
                icon: Zap,
                title: "AI-Powered Precision",
                desc: "Our MapMaster™ AI engine runs 24/7, constantly testing and optimizing your profile. We move faster than competitors can react.",
                color: "bg-purple-700",
              },
              {
                icon: TrendingUp,
                title: "Results-First Culture",
                desc: "We don't celebrate activity. We celebrate outcomes. Our entire team is incentivized around your profile's performance, not vanity metrics.",
                color: "bg-emerald-600",
              },
            ].map((val, i) => (
              <FI key={i}>
                <div className="bg-white border border-gray-200 rounded-2xl p-8 card-hover cursor-default">
                  <div className={`${val.color} w-12 h-12 rounded-xl flex items-center justify-center mb-5`}>
                    <val.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg mb-3">{val.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
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
            <h2 className="font-serif text-white text-4xl mb-5">Work With the Best</h2>
            <p className="text-white/60 text-lg mb-8">
              Our team is ready to take your GBP from overlooked to unstoppable.
            </p>
            <button
              onClick={onAuditClick}
              className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-10 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-700/40"
            >
              Get Your Free Audit
            </button>
          </FI>
        </Section>
      </section>
    </div>
  );
}
