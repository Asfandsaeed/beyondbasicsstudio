import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, Phone, Globe, CheckCircle, ChevronDown } from "lucide-react";

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

interface FormValues {
  name: string;
  email: string;
  phone: string;
  gbpUrl: string;
  message: string;
  tier: string;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-5 text-left group">
        <span className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors text-sm sm:text-base">{q}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 ml-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-5 text-gray-600 text-sm leading-relaxed">{a}</div>}
    </div>
  );
}

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<FormValues>();

  const onSubmit = async (_: FormValues) => {
    await new Promise(r => setTimeout(r, 1200));
  };

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20">
        <Section className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FI>
            <span className="text-blue-400 text-xs uppercase tracking-widest font-semibold">Contact</span>
            <h1 className="font-serif text-white mt-4 mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Ready to Dominate GBP? Let's Talk.
            </h1>
            <p className="text-white/60 text-lg">
              Fill out the form and our team will reach out within 24 hours with a custom strategy.
            </p>
          </FI>
        </Section>
      </section>

      {/* Contact section */}
      <section className="section-light py-20">
        <Section className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Form */}
            <FI className="md:col-span-3">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-gray-900 text-2xl font-bold mb-6">Send Us a Message</h2>
                {isSubmitSuccessful ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h3 className="text-gray-900 font-bold text-xl mb-2">Message Received!</h3>
                    <p className="text-gray-500 text-sm mb-6">We'll be in touch within 24 hours with your personalized GBP strategy.</p>
                    <button
                      onClick={() => reset()}
                      className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-700 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Full Name *</label>
                        <input
                          {...register("name", { required: "Required" })}
                          placeholder="Jane Smith"
                          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="text-gray-700 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Email *</label>
                        <input
                          {...register("email", { required: "Required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })}
                          type="email"
                          placeholder="jane@business.com"
                          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-700 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Phone</label>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Tier Interest</label>
                        <select
                          {...register("tier")}
                          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white"
                        >
                          <option value="">Select tier...</option>
                          <option value="basic">Basic — $200/mo</option>
                          <option value="growth">Growth — $500/mo</option>
                          <option value="premium">Premium — $1,000/mo</option>
                          <option value="unsure">Not sure yet</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-700 text-xs font-semibold uppercase tracking-wider mb-1.5 block">GBP Profile URL *</label>
                      <input
                        {...register("gbpUrl", { required: "Required" })}
                        placeholder="https://maps.google.com/..."
                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      />
                      {errors.gbpUrl && <p className="text-red-500 text-xs mt-1">{errors.gbpUrl.message}</p>}
                    </div>
                    <div>
                      <label className="text-gray-700 text-xs font-semibold uppercase tracking-wider mb-1.5 block">Message</label>
                      <textarea
                        {...register("message")}
                        rows={4}
                        placeholder="Tell us about your business and goals..."
                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-700/30 text-sm"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                    <p className="text-center text-gray-400 text-xs">We respond to all inquiries within 24 hours.</p>
                  </form>
                )}
              </div>
            </FI>

            {/* Contact Info */}
            <FI className="md:col-span-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Mail, label: "Email", value: "hello@beyondbasics.studio" },
                      { icon: Globe, label: "Headquarters", value: "Global — Serving Clients Worldwide" },
                      { icon: Phone, label: "Response Time", value: "Within 24 hours" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-blue-700" />
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{item.label}</p>
                          <p className="text-gray-900 text-sm font-medium mt-0.5">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-6 text-white">
                  <h4 className="font-bold mb-2">Prefer a call?</h4>
                  <p className="text-blue-200 text-sm mb-4">Book a free 30-minute strategy session with our team — we'll walk you through exactly what's possible for your GBP.</p>
                  <div className="bg-white/10 border border-white/20 rounded-lg p-3 text-center">
                    <p className="text-white text-sm font-semibold">Schedule via Calendly</p>
                    <p className="text-blue-300 text-xs mt-0.5">calendly.com/beyondbasics</p>
                  </div>
                </div>
              </div>
            </FI>
          </div>
        </Section>
      </section>

      {/* FAQ */}
      <section className="section-dark py-20">
        <Section className="max-w-3xl mx-auto px-4 sm:px-6">
          <FI className="text-center mb-12">
            <h2 className="text-white text-4xl font-serif">Frequently Asked Questions</h2>
          </FI>
          <FI>
            <div className="[&>div]:border-white/10 [&>div>button]:text-white [&>div>div]:text-white/60">
              {[
                { q: "What exactly is a Google Business Profile?", a: "A Google Business Profile (GBP, formerly Google My Business) is your free business listing on Google. It's what appears in Google Maps and local search results when people look for businesses like yours. A well-optimized GBP is the single highest-ROI local marketing asset available — yet most businesses manage it poorly." },
                { q: "How quickly will I see results?", a: "Most clients see measurable improvements in profile views and calls within the first 30 days. Map Pack ranking improvements typically happen within 60–90 days depending on competition. We track and report everything monthly so you can see exactly what's moving." },
                { q: "What are your pricing options?", a: "We offer three tiers: Basic ($200/mo) for single-location upkeep, Growth ($500/mo) for active review management and ads across up to 3 locations, and Premium ($1,000/mo) for full AI-powered domination across unlimited locations. All tiers are month-to-month — no contracts." },
                { q: "Can you manage multiple business locations?", a: "Absolutely. Growth handles up to 3 locations and Premium covers unlimited locations. We have clients managing 50+ locations on a single Premium plan. Each location gets its own optimization strategy tailored to its local competition." },
                { q: "Do you guarantee results?", a: "We guarantee Top 3 Map Pack placement on Premium. We also offer a full refund if you see zero improvement in your first 60 days on any plan — though in our history, that has never happened." },
              ].map((item, i) => (
                <FAQItem key={i} q={item.q} a={item.a} />
              ))}
            </div>
          </FI>
        </Section>
      </section>
    </div>
  );
}
