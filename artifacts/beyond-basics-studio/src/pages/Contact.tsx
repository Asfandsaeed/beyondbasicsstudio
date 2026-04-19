import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { ArrowRight, Plus, Minus, CheckCircle, AlertCircle } from "lucide-react";
import SchemaMarkup from "@/components/SchemaMarkup";
import { usePageMeta } from "@/hooks/usePageMeta";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

const ease = [0.25, 0.1, 0.25, 1];
function FadeUp({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease, delay }} className={className}>{children}</motion.div>;
}
function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.7, ease: "easeOut", delay }} className={className}>{children}</motion.div>;
}

interface FormValues { name: string; email: string; phone?: string; gbpUrl: string; message?: string; tier: string; }

function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "var(--sp-rule)" }}>
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-5 text-left gap-6 group">
        <span className="font-serif text-xl sm:text-2xl group-hover:opacity-60 transition-opacity" style={{ color: "var(--sp-black)" }}>{q}</span>
        {open ? <Minus className="w-4 h-4 shrink-0" style={{ color: "var(--sp-gray)" }} /> : <Plus className="w-4 h-4 shrink-0" style={{ color: "var(--sp-gray)" }} />}
      </button>
      {open && <div className="pb-6 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>{a}</div>}
    </div>
  );
}

export default function Contact() {
  usePageMeta({ title: "Contact — Beyond Basics Studio", description: "Let's talk domination. Get your free GBP audit and start your journey to the top of Google Maps.", ogImage: "contact.jpg", url: "/contact" });

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>();
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");

  const inputCls = "w-full bg-transparent border-b py-3 font-sans text-sm outline-none transition-colors duration-200 placeholder:opacity-25";
  const inputStyle = { color: "var(--sp-black)", borderColor: "var(--sp-rule)" };

  const onSubmit = async (data: FormValues) => {
    setSubmitState("idle");
    if (!FORMSPREE_ID) {
      await new Promise(r => setTimeout(r, 600));
      setSubmitState("success");
      return;
    }
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitState("success");
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div style={{ backgroundColor: "var(--sp-white)" }}>
      <SchemaMarkup schema={[
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.beyondbasicsstudio.com/" },
            { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.beyondbasicsstudio.com/contact" }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "url": "https://www.beyondbasicsstudio.com/contact",
          "name": "Contact Beyond Basics Studio — Get Your Free GBP Audit",
          "description": "Request a free Google Business Profile audit from Beyond Basics Studio. We'll identify exactly what's holding your local ranking back — within 24 hours.",
          "isPartOf": { "@type": "WebSite", "url": "https://www.beyondbasicsstudio.com/" },
          "mainEntity": {
            "@type": "Organization",
            "name": "Beyond Basics Studio",
            "email": "hello@beyondbasicsstudio.com",
            "url": "https://www.beyondbasicsstudio.com/"
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What exactly is a Google Business Profile?",
              "acceptedAnswer": { "@type": "Answer", "text": "Your GBP is what appears in Google Maps and local search results. A well-optimised GBP is the highest-ROI local marketing asset available — yet most businesses manage it poorly. We fix that." }
            },
            {
              "@type": "Question",
              "name": "How quickly will I see results?",
              "acceptedAnswer": { "@type": "Answer", "text": "Most clients see measurable improvements in profile views and calls within 30 days. Map Pack ranking improvements typically happen within 60–90 days. We track everything and report transparently." }
            },
            {
              "@type": "Question",
              "name": "What are your pricing options?",
              "acceptedAnswer": { "@type": "Answer", "text": "Three tiers: Basic ($200/mo), Growth ($500/mo), and Premium ($1,000/mo). All are month-to-month with no lock-in." }
            },
            {
              "@type": "Question",
              "name": "Can you manage multiple locations?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes. Growth covers up to 5 locations and Premium covers up to 50. We have clients managing entire regional franchise networks on a single Premium plan." }
            },
          ]
        }
      ]} />

      {/* Hero */}
      <section className="section-dark border-b" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-24">
          <FadeIn><p className="label mb-6" style={{ color: "rgba(247,244,240,0.7)" }}>Contact</p></FadeIn>
          <FadeUp>
            <h1 className="font-serif leading-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)", color: "var(--sp-white)" }}>
              Let's talk<br />domination.
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* Contact */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32 grid md:grid-cols-2 gap-16 lg:gap-24">

          {/* Form */}
          <FadeUp>
            {submitState === "success" ? (
              <div className="py-12">
                <div className="w-10 h-10 border flex items-center justify-center mb-6" style={{ borderColor: "var(--sp-rule)" }}>
                  <CheckCircle className="w-5 h-5" style={{ color: "var(--sp-black)" }} />
                </div>
                <h3 className="font-serif text-3xl mb-3" style={{ color: "var(--sp-black)" }}>We'll be in touch.</h3>
                <p className="font-sans text-sm mb-8" style={{ color: "var(--sp-gray)" }}>
                  Your message is on its way. Expect a response within 24 hours with your personalised GBP strategy.
                </p>
                <button onClick={() => { setSubmitState("idle"); reset(); }} className="btn btn-outline">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
                <p className="label mb-4">Send us a message</p>

                {submitState === "error" && (
                  <div className="flex items-start gap-3 p-4 border" style={{ borderColor: "var(--sp-rule)", backgroundColor: "var(--sp-cream)" }}>
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--sp-black)" }} />
                    <p className="font-sans text-sm" style={{ color: "var(--sp-gray)" }}>
                      Something went wrong. Please try again or email us at{" "}
                      <a href="mailto:hello@beyondbasicsstudio.com" className="underline underline-offset-2" style={{ color: "var(--sp-black)" }}>
                        hello@beyondbasicsstudio.com
                      </a>.
                    </p>
                  </div>
                )}

                {[
                  { label: "Full Name", key: "name" as const, type: "text", placeholder: "Jane Smith", required: true },
                  { label: "Email Address", key: "email" as const, type: "email", placeholder: "jane@business.com", required: true },
                  { label: "Phone (optional)", key: "phone" as const, type: "tel", placeholder: "+1 555 000 0000", required: false },
                  { label: "GBP Profile URL", key: "gbpUrl" as const, type: "text", placeholder: "maps.google.com/...", required: true },
                ].map(({ label, key, type, placeholder, required }) => (
                  <div key={key}>
                    <label htmlFor={`field-${key}`} className="label block mb-1">{label}</label>
                    <input
                      id={`field-${key}`}
                      {...register(key, required ? { required: "This field is required" } : {})}
                      type={type}
                      placeholder={placeholder}
                      className={inputCls}
                      style={inputStyle}
                      autoComplete={key === "email" ? "email" : key === "name" ? "name" : key === "phone" ? "tel" : "off"}
                    />
                    {errors[key] && (
                      <p className="font-sans text-xs mt-1" style={{ color: "#c0392b" }} role="alert">{errors[key]?.message}</p>
                    )}
                  </div>
                ))}

                <div>
                  <label htmlFor="field-tier" className="label block mb-1">Tier Interest</label>
                  <select id="field-tier" {...register("tier")} className={inputCls} style={{ ...inputStyle, backgroundColor: "transparent" }}>
                    <option value="">Select a tier...</option>
                    <option value="basic">Basic — $200/mo (1 location)</option>
                    <option value="growth">Growth — $500/mo (up to 5)</option>
                    <option value="premium">Premium — $1,000/mo (up to 50)</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="field-message" className="label block mb-1">Message (optional)</label>
                  <textarea
                    id="field-message"
                    {...register("message")}
                    rows={4}
                    placeholder="Tell us about your business and goals..."
                    className={inputCls}
                    style={{ ...inputStyle, resize: "none" }}
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-black disabled:opacity-50">
                  {isSubmitting ? "Sending…" : <><span>Send Message</span><ArrowRight className="w-3.5 h-3.5" /></>}
                </button>
              </form>
            )}
          </FadeUp>

          {/* Info */}
          <FadeIn delay={0.15}>
            <div className="space-y-12">
              <div>
                <p className="label mb-6">Contact Details</p>
                {[
                  { label: "Email", value: "hello@beyondbasics.studio" },
                  { label: "Offices", value: "San Francisco · Toronto · London · Dubai · Beirut" },
                  { label: "Response Time", value: "Within 24 hours" },
                ].map((item) => (
                  <div key={item.label} className="py-4 border-b" style={{ borderColor: "var(--sp-rule)" }}>
                    <p className="label mb-1">{item.label}</p>
                    <p className="font-sans text-sm" style={{ color: "var(--sp-black)" }}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="border p-8" style={{ borderColor: "var(--sp-rule)", backgroundColor: "var(--sp-cream)" }}>
                <p className="label mb-4">Prefer a call?</p>
                <p className="font-serif text-xl leading-snug mb-5" style={{ color: "var(--sp-black)" }}>Book a free 30-minute strategy session with our team.</p>
                <a href="https://calendly.com/beyondbasicsstudio/30min" target="_blank" rel="noopener noreferrer" className="font-sans text-sm" style={{ color: "var(--sp-gray)" }}>calendly.com/beyondbasicsstudio/30min</a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-cream">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-24">
          <FadeUp><p className="label mb-12">Questions</p></FadeUp>
          {[
            { q: "What exactly is a Google Business Profile?", a: "Your GBP is what appears in Google Maps and local search results. A well-optimised GBP is the highest-ROI local marketing asset available — yet most businesses manage it poorly. We fix that." },
            { q: "How quickly will I see results?", a: "Most clients see measurable improvements in profile views and calls within 30 days. Map Pack ranking improvements typically happen within 60–90 days. We track everything and report transparently." },
            { q: "What are your pricing options?", a: "Three tiers: Basic ($200/mo), Growth ($500/mo), and Premium ($1,000/mo). All are month-to-month with no lock-in." },
            { q: "Can you manage multiple locations?", a: "Yes. Growth covers up to 5 locations and Premium covers up to 50. We have clients managing entire regional franchise networks on a single Premium plan." },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.05}><Accordion q={item.q} a={item.a} /></FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
