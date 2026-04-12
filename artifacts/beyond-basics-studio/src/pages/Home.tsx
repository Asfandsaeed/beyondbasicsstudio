import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowDown, Star, TrendingUp, MapPin, Zap, Users, Award, BarChart3, ChevronRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

const pins = [
  { top: "18%", left: "15%", delay: "0s", size: 12 },
  { top: "30%", left: "72%", delay: "0.4s", size: 16 },
  { top: "55%", left: "25%", delay: "0.8s", size: 10 },
  { top: "65%", left: "80%", delay: "0.2s", size: 14 },
  { top: "20%", left: "45%", delay: "1.1s", size: 18 },
  { top: "75%", left: "55%", delay: "0.6s", size: 11 },
  { top: "40%", left: "88%", delay: "1.4s", size: 13 },
  { top: "10%", left: "62%", delay: "0.3s", size: 9 },
];

export default function Home({ onAuditClick }: { onAuditClick: () => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Animated pins */}
        <div className="absolute inset-0 pointer-events-none">
          {pins.map((pin, i) => (
            <div
              key={i}
              className="absolute"
              style={{ top: pin.top, left: pin.left }}
            >
              <div className="relative">
                <div
                  className="animate-ping-slow absolute inset-0 rounded-full bg-blue-500/30"
                  style={{ animationDelay: pin.delay, width: pin.size * 2, height: pin.size * 2, left: -pin.size / 2, top: -pin.size / 2 }}
                />
                <div
                  className="animate-float-pin bg-blue-700 rounded-full flex items-center justify-center animate-pulse-glow"
                  style={{
                    width: pin.size,
                    height: pin.size,
                    animationDelay: pin.delay,
                    animationDuration: `${3 + i * 0.5}s`
                  }}
                >
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "linear-gradient(rgba(30,64,175,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(30,64,175,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-700/20 border border-blue-700/30 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">500+ Profiles Managed Worldwide</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
          >
            Beyond Basics Studio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/70 text-xl sm:text-2xl leading-relaxed max-w-3xl mx-auto mb-4 font-light"
          >
            The GBP Agency Giving Local Businesses an{" "}
            <span className="text-white font-semibold">Unfair Advantage</span> on Google Maps
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-blue-400/80 text-base sm:text-lg mb-10"
          >
            From $200/mo: Basic upkeep to Premium domination. Triple your calls in 90 days.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-12 text-sm"
          >
            {[
              { value: "500+", label: "Profiles Managed" },
              { value: "300%", label: "Avg Review Growth" },
              { value: "Top 3", label: "Map Pack Guaranteed" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="text-white font-bold text-lg">{stat.value}</span>
                <span className="text-white/40">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={onAuditClick}
              className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:shadow-xl hover:shadow-blue-700/40 hover:-translate-y-0.5"
            >
              Claim Free GBP Audit
            </button>
            <Link
              href="/services"
              className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:bg-white/5 flex items-center justify-center gap-2"
            >
              View Our Tiers <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll arrow */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-down">
          <ArrowDown className="w-5 h-5 text-white/30" />
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="section-light py-14 overflow-hidden">
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeItem className="text-center mb-10">
            <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-8">Recognized by industry leaders</p>
          </FadeItem>
          <div className="flex overflow-hidden">
            <div className="flex gap-16 items-center animate-marquee whitespace-nowrap">
              {[
                "World's #1 GBP Agency",
                "Business Journal",
                "Local SEO Pro",
                "Google Verified Partner",
                "Map Pack Masters",
                "Agency of the Year",
                "World's #1 GBP Agency",
                "Business Journal",
                "Local SEO Pro",
                "Google Verified Partner",
                "Map Pack Masters",
                "Agency of the Year",
              ].map((badge, i) => (
                <span key={i} className="text-gray-400 font-semibold text-sm tracking-wide shrink-0">{badge}</span>
              ))}
            </div>
          </div>

          <FadeItem className="mt-14 max-w-2xl mx-auto text-center">
            <blockquote className="text-gray-700 text-xl italic font-serif leading-relaxed">
              "Beyond Basics turned our profile into a lead machine. We went from 20 calls a month to over 250 — in 60 days."
            </blockquote>
            <p className="text-gray-500 text-sm mt-3 font-medium">— Maria T., Owner, Urban Pizza</p>
          </FadeItem>
        </AnimatedSection>
      </section>

      {/* Awards */}
      <section className="section-dark py-20">
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeItem className="text-center mb-14">
            <span className="text-blue-400 text-xs uppercase tracking-widest font-semibold">Recognition</span>
            <h2 className="text-white text-4xl sm:text-5xl font-serif mt-3">Award-Winning Agency</h2>
          </FadeItem>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Award, title: "Local SEO Agency of Year", year: "2026", color: "text-yellow-400" },
              { icon: Star, title: "Best GBP Service", year: "2026", color: "text-blue-400" },
              { icon: Users, title: "Midsize Agency A-List", year: "2026", color: "text-emerald-400" },
              { icon: Zap, title: "AI Review Booster Award", year: "2026", color: "text-purple-400" },
            ].map((award, i) => (
              <FadeItem key={i}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center card-hover cursor-default">
                  <award.icon className={`w-8 h-8 ${award.color} mx-auto mb-4`} />
                  <p className="text-white font-semibold text-sm leading-snug mb-1">{award.title}</p>
                  <p className="text-white/40 text-xs">{award.year}</p>
                </div>
              </FadeItem>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Services Preview */}
      <section className="section-light py-20">
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeItem className="text-center mb-14">
            <span className="text-blue-700 text-xs uppercase tracking-widest font-semibold">What We Do</span>
            <h2 className="text-gray-900 text-4xl sm:text-5xl font-serif mt-3">Full-Spectrum GBP Mastery</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">We handle every dimension of your Google Business Profile so you can focus on serving customers.</p>
          </FadeItem>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                title: "GBP Strategy & Optimization",
                desc: "Complete profile overhaul, category optimization, attribute configuration, and ongoing performance monitoring to maximize your visibility.",
                color: "bg-blue-700"
              },
              {
                icon: Star,
                title: "Review & Reputation Mastery",
                desc: "Systematic review generation campaigns, AI-powered response management, and reputation monitoring across all platforms.",
                color: "bg-emerald-600"
              },
              {
                icon: TrendingUp,
                title: "Media & Local Domination",
                desc: "Professional photo management, Google Posts strategy, Q&A optimization, and local citation building for Map Pack dominance.",
                color: "bg-purple-700"
              },
            ].map((service, i) => (
              <FadeItem key={i}>
                <div className="bg-white border border-gray-200 rounded-2xl p-8 card-hover cursor-default h-full">
                  <div className={`${service.color} w-12 h-12 rounded-xl flex items-center justify-center mb-5`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-gray-900 font-bold text-lg mb-3">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </FadeItem>
            ))}
          </div>
          <FadeItem className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800 transition-colors"
            >
              View Full Services <ChevronRight className="w-4 h-4" />
            </Link>
          </FadeItem>
        </AnimatedSection>
      </section>

      {/* MapMaster AI Feature */}
      <section className="section-dark py-24">
        <AnimatedSection className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeItem>
              <span className="text-blue-400 text-xs uppercase tracking-widest font-semibold">Proprietary Technology</span>
              <h2 className="text-white text-4xl sm:text-5xl font-serif mt-4 mb-6">
                MapMaster<span className="text-blue-400">™</span> AI
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                Our proprietary AI engine deploys rapid GBP experiments autonomously — auto-posts timed for peak engagement, review prediction scoring, and map rank optimization algorithms that deliver 40% more visibility on average.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Auto-scheduled posts & updates",
                  "Predictive review generation",
                  "Map rank tracking & optimization",
                  "Competitor gap analysis",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={onAuditClick}
                className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-700/30 text-sm"
              >
                Learn More
              </button>
            </FadeItem>
            <FadeItem>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-700/20 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-700/20 border border-blue-700/30 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-white font-semibold">Live Map Rank Monitor</span>
                  </div>
                  {[
                    { keyword: "pizza near me", rank: "#2", change: "+5", up: true },
                    { keyword: "italian restaurant", rank: "#1", change: "+12", up: true },
                    { keyword: "lunch downtown", rank: "#3", change: "+8", up: true },
                  ].map((item) => (
                    <div key={item.keyword} className="flex items-center justify-between py-3 border-b border-white/5">
                      <span className="text-white/60 text-sm">{item.keyword}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400 text-xs">+{item.change}</span>
                        <span className="text-white font-bold text-sm">{item.rank}</span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-5 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <p className="text-emerald-400 text-xs font-semibold">Average: 40% visibility increase in 90 days</p>
                  </div>
                </div>
              </div>
            </FadeItem>
          </div>
        </AnimatedSection>
      </section>

      {/* Pricing */}
      <section className="section-light py-24" id="pricing">
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeItem className="text-center mb-14">
            <span className="text-blue-700 text-xs uppercase tracking-widest font-semibold">Simple Pricing</span>
            <h2 className="text-gray-900 text-4xl sm:text-5xl font-serif mt-3">Choose Your Tier</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">No hidden fees. No long-term contracts. Cancel anytime.</p>
          </FadeItem>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Basic",
                price: "$200",
                tagline: "Profile upkeep & visibility",
                features: ["1 GBP Location", "Monthly profile optimization", "4 Google Posts/mo", "Basic analytics report", "Email support", "Review response templates"],
                cta: "Start Basic",
                featured: false,
              },
              {
                name: "Growth",
                price: "$500",
                tagline: "Reviews, reach & results",
                features: ["Up to 3 Locations", "Everything in Basic", "Active review generation", "16 Posts/mo", "Local ads management", "Weekly performance reports", "Priority support", "Competitor tracking"],
                cta: "Start Growth",
                featured: true,
              },
              {
                name: "Premium",
                price: "$1,000",
                tagline: "Total domination mode",
                features: ["Unlimited Locations", "Everything in Growth", "MapMaster™ AI", "Dedicated account manager", "Daily posting", "Citation building", "Schema markup", "Monthly strategy call", "Custom reporting"],
                cta: "Start Premium",
                featured: false,
              },
            ].map((plan, i) => (
              <FadeItem key={i}>
                <div className={`relative rounded-2xl p-8 h-full flex flex-col ${
                  plan.featured
                    ? "bg-blue-700 text-white shadow-2xl shadow-blue-700/30 scale-105"
                    : "bg-white border border-gray-200"
                }`}>
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`font-bold text-xl mb-1 ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                    <p className={`text-sm mb-4 ${plan.featured ? "text-blue-200" : "text-gray-500"}`}>{plan.tagline}</p>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-5xl font-bold font-serif ${plan.featured ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                      <span className={`text-sm ${plan.featured ? "text-blue-200" : "text-gray-500"}`}>/mo</span>
                    </div>
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${plan.featured ? "bg-blue-200" : "bg-blue-600"}`} />
                        <span className={plan.featured ? "text-blue-100" : "text-gray-600"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={onAuditClick}
                    className={`w-full font-semibold py-3 rounded-xl transition-all duration-200 text-sm ${
                      plan.featured
                        ? "bg-white text-blue-700 hover:bg-blue-50"
                        : "bg-blue-700 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-700/30"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </FadeItem>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Client Logos */}
      <section className="section-dark py-16 overflow-hidden">
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeItem className="text-center mb-10">
            <p className="text-white/30 text-xs uppercase tracking-widest">Trusted by local businesses worldwide</p>
          </FadeItem>
          <div className="flex overflow-hidden">
            <div className="flex gap-16 items-center animate-marquee whitespace-nowrap">
              {[
                "Urban Pizza", "City Auto", "Summit Dental", "Harbor Cafe", "Metro Fitness",
                "Peak Real Estate", "Blue Ridge Bakery", "Coastal Law Group", "Sunset Spa",
                "Urban Pizza", "City Auto", "Summit Dental", "Harbor Cafe", "Metro Fitness",
                "Peak Real Estate", "Blue Ridge Bakery", "Coastal Law Group", "Sunset Spa",
              ].map((client, i) => (
                <span key={i} className="text-white/20 font-semibold text-sm tracking-wide shrink-0 hover:text-white/40 transition-colors cursor-default">{client}</span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* News */}
      <section className="section-light py-20">
        <AnimatedSection className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeItem className="text-center mb-14">
            <span className="text-blue-700 text-xs uppercase tracking-widest font-semibold">Insights</span>
            <h2 className="text-gray-900 text-4xl sm:text-5xl font-serif mt-3">From the Playbook</h2>
          </FadeItem>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: "Award",
                title: "Beyond Basics Wins Local Agency of Year 2026",
                excerpt: "For the second consecutive year, our team has been recognized for delivering extraordinary GBP results.",
                date: "March 2026",
                readTime: "3 min read",
              },
              {
                tag: "Case Study",
                title: "How We 5x'd a Client's Map Pack Rankings in 90 Days",
                excerpt: "The exact strategy behind our most dramatic ranking turnaround — from invisible to #1 in a competitive market.",
                date: "February 2026",
                readTime: "5 min read",
              },
              {
                tag: "Strategy",
                title: "The GBP Optimization Playbook for 2026",
                excerpt: "Google's algorithm changed. Here's what actually moves the needle today — straight from our data.",
                date: "January 2026",
                readTime: "8 min read",
              },
            ].map((article, i) => (
              <FadeItem key={i}>
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden card-hover cursor-default group">
                  <div className="bg-gradient-to-br from-gray-900 to-blue-900 h-44 flex items-center justify-center">
                    <BarChart3 className="w-12 h-12 text-blue-400/60" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">{article.tag}</span>
                      <span className="text-gray-400 text-xs">{article.date}</span>
                    </div>
                    <h3 className="text-gray-900 font-bold mb-2 leading-snug group-hover:text-blue-700 transition-colors">{article.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{article.excerpt}</p>
                    <p className="text-gray-400 text-xs mt-4">{article.readTime}</p>
                  </div>
                </div>
              </FadeItem>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Final CTA */}
      <section className="hero-gradient py-28">
        <AnimatedSection className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeItem>
            <h2 className="font-serif text-white mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Ready to Dominate Google Maps?
            </h2>
          </FadeItem>
          <FadeItem>
            <p className="text-white/60 text-xl mb-10 max-w-xl mx-auto">
              Join 500+ local businesses that have transformed their Google presence. Your audit is free. Your results are guaranteed.
            </p>
          </FadeItem>
          <FadeItem>
            <button
              onClick={onAuditClick}
              className="bg-blue-700 hover:bg-blue-600 text-white font-bold px-10 py-5 rounded-xl text-lg transition-all duration-200 hover:shadow-2xl hover:shadow-blue-700/40 hover:-translate-y-0.5"
            >
              Claim Your Free Audit
            </button>
          </FadeItem>
        </AnimatedSection>
      </section>
    </div>
  );
}
