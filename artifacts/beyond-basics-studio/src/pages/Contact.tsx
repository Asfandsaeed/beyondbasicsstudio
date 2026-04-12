import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { ArrowRight, Plus, Minus, CheckCircle } from "lucide-react";

const ease = [0.16, 1, 0.3, 1];
function FadeUp({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease, delay }} className={className}>{children}</motion.div>;
}
function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, ease: "easeOut", delay }} className={className}>{children}</motion.div>;
}

interface FormValues {
  name: string; email: string; phone: string;
  gbpUrl: string; message: string; tier: string;
}

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-5 text-left gap-6 group">
        <span className="font-display italic text-xl sm:text-2xl group-hover:opacity-70 transition-opacity" style={{ color: "var(--sf-cream)" }}>
          {q}
        </span>
        {open
          ? <Minus className="w-4 h-4 shrink-0 opacity-40" style={{ color: "var(--sf-cream)" }} />
          : <Plus className="w-4 h-4 shrink-0 opacity-40" style={{ color: "var(--sf-cream)" }} />
        }
      </button>
      {open && <div className="pb-6 font-sans text-sm leading-relaxed" style={{ color: "rgba(229,225,216,0.5)" }}>{a}</div>}
    </div>
  );
}

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<FormValues>();
  const onSubmit = async (_: FormValues) => { await new Promise(r => setTimeout(r, 1100)); };

  const inputCls = "w-full bg-transparent border-b py-3 font-sans text-sm outline-none transition-colors duration-200 placeholder:opacity-25";

  return (
    <div style={{ backgroundColor: "var(--sf-dark)", color: "var(--sf-cream)" }}>
      {/* Hero */}
      <section className="pt-36 pb-24 px-6 lg:px-10 border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <p className="tag mb-6" style={{ color: "rgba(229,225,216,0.4)" }}>Contact</p>
            <h1
              className="font-display font-semibold italic leading-tight"
              style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--sf-cream)" }}
            >
              Let's talk<br />domination.
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-24 px-6 lg:px-10 border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* Form */}
          <FadeUp>
            {isSubmitSuccessful ? (
              <div className="py-16">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgba(229,225,216,0.08)" }}
                >
                  <CheckCircle className="w-6 h-6" style={{ color: "rgba(180,210,170,0.8)" }} />
                </div>
                <h3 className="font-display font-semibold italic text-3xl mb-3" style={{ color: "var(--sf-cream)" }}>
                  We'll be in touch.
                </h3>
                <p className="font-sans text-sm mb-8" style={{ color: "rgba(229,225,216,0.45)" }}>
                  Expect a response within 24 hours with your personalised GBP strategy.
                </p>
                <button onClick={() => reset()} className="btn-outline-cream text-xs">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <p className="tag mb-4" style={{ color: "rgba(229,225,216,0.4)" }}>Send us a message</p>
                {[
                  { label: "Full Name", key: "name" as const, type: "text", placeholder: "Jane Smith", required: true },
                  { label: "Email Address", key: "email" as const, type: "email", placeholder: "jane@business.com", required: true },
                  { label: "Phone (optional)", key: "phone" as const, type: "tel", placeholder: "+1 555 000 0000", required: false },
                  { label: "GBP Profile URL", key: "gbpUrl" as const, type: "text", placeholder: "maps.google.com/...", required: true },
                ].map(({ label, key, type, placeholder, required }) => (
                  <div key={key}>
                    <label className="tag block mb-1" style={{ color: "rgba(229,225,216,0.35)" }}>{label}</label>
                    <input
                      {...register(key, required ? { required: "Required" } : {})}
                      type={type}
                      placeholder={placeholder}
                      className={inputCls}
                      style={{ color: "var(--sf-cream)", borderColor: "rgba(229,225,216,0.15)" }}
                    />
                    {errors[key] && <p className="font-sans text-xs mt-1" style={{ color: "#d4726a" }}>{errors[key]?.message}</p>}
                  </div>
                ))}

                <div>
                  <label className="tag block mb-1" style={{ color: "rgba(229,225,216,0.35)" }}>Tier Interest</label>
                  <select
                    {...register("tier")}
                    className={inputCls}
                    style={{ color: "var(--sf-cream)", borderColor: "rgba(229,225,216,0.15)", backgroundColor: "transparent" }}
                  >
                    <option value="" style={{ backgroundColor: "var(--sf-dark)" }}>Select a tier...</option>
                    <option value="basic" style={{ backgroundColor: "var(--sf-dark)" }}>Basic — $200/mo</option>
                    <option value="growth" style={{ backgroundColor: "var(--sf-dark)" }}>Growth — $500/mo</option>
                    <option value="premium" style={{ backgroundColor: "var(--sf-dark)" }}>Premium — $1,000/mo</option>
                    <option value="unsure" style={{ backgroundColor: "var(--sf-dark)" }}>Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label className="tag block mb-1" style={{ color: "rgba(229,225,216,0.35)" }}>Message</label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Tell us about your business and goals..."
                    className={inputCls}
                    style={{ color: "var(--sf-cream)", borderColor: "rgba(229,225,216,0.15)", resize: "none" }}
                  />
                </div>

                <div>
                  <button type="submit" disabled={isSubmitting} className="btn-cream disabled:opacity-50">
                    {isSubmitting ? "Sending..." : <><span>Send Message</span><ArrowRight className="w-3.5 h-3.5" /></>}
                  </button>
                  <p className="font-sans text-xs mt-4" style={{ color: "rgba(229,225,216,0.2)" }}>
                    We respond to all inquiries within 24 hours.
                  </p>
                </div>
              </form>
            )}
          </FadeUp>

          {/* Info */}
          <FadeIn delay={0.2}>
            <div className="space-y-12">
              <div>
                <p className="tag mb-6" style={{ color: "rgba(229,225,216,0.4)" }}>Contact Details</p>
                <div className="space-y-5">
                  {[
                    { label: "Email", value: "hello@beyondbasics.studio" },
                    { label: "Headquarters", value: "Global — serving clients worldwide" },
                    { label: "Response Time", value: "Within 24 hours" },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="tag mb-1" style={{ color: "rgba(229,225,216,0.3)" }}>{item.label}</p>
                      <p className="font-sans text-sm" style={{ color: "rgba(229,225,216,0.7)" }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="border p-8"
                style={{ borderColor: "rgba(229,225,216,0.12)", backgroundColor: "#363b32" }}
              >
                <p className="tag mb-4" style={{ color: "rgba(229,225,216,0.4)" }}>Prefer a call?</p>
                <p className="font-display italic text-xl leading-snug mb-5" style={{ color: "var(--sf-cream)" }}>
                  Book a free 30-minute strategy session with our team.
                </p>
                <p className="font-sans text-sm" style={{ color: "rgba(229,225,216,0.4)" }}>
                  calendly.com/beyondbasics
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <p className="tag mb-8" style={{ color: "rgba(229,225,216,0.4)" }}>Questions</p>
          </FadeUp>
          {[
            { q: "What exactly is a Google Business Profile?", a: "Your GBP is what appears in Google Maps and local search results. A well-optimised GBP is the highest-ROI local marketing asset available — yet most businesses manage it poorly. We fix that." },
            { q: "How quickly will I see results?", a: "Most clients see measurable improvements in profile views and calls within 30 days. Map Pack ranking improvements typically happen within 60–90 days. We track everything and report transparently." },
            { q: "What are your pricing options?", a: "Three tiers: Basic ($200/mo) for single-location upkeep, Growth ($500/mo) for active review management and ads across up to 3 locations, and Premium ($1,000/mo) for full AI-powered domination. All month-to-month." },
            { q: "Can you manage multiple locations?", a: "Yes. Growth covers up to 3 locations and Premium covers unlimited. We have clients on a single Premium plan managing 50+ locations, each with its own tailored strategy." },
            { q: "Do you guarantee results?", a: "We guarantee Top 3 Map Pack placement on Premium. We also offer a full refund if you see zero improvement in your first 60 days on any plan." },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <Accordion q={item.q} a={item.a} />
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
