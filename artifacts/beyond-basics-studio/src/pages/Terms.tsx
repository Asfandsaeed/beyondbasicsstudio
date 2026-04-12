import { FadeUp, FadeIn } from "@/components/Animate";

export default function Terms() {
  const sections = [
    {
      title: "1. Services Overview",
      content: (
        <>
          <div className="overflow-x-auto mb-6">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--sp-rule)" }}>
                  {["Tier", "Price", "Key Features"].map((h) => (
                    <th key={h} className="text-left pb-4 label">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Basic", "$200/mo", "Single location. Daily auto + weekly manual audits. NAP monitoring (50 dirs). 1–2 posts/mo. Basic review monitoring. 1-page monthly report. Email support (48h)."],
                  ["Growth", "$500/mo", "Up to 5 locations. Everything in Basic. 4–8 posts + 2 videos/mo. Review automation (100 req/mo). Competitor analysis (10 rivals). Bi-weekly dashboard. Email/chat support (24h)."],
                  ["Premium", "$1,000/mo", "Up to 50 locations. Everything in Growth. Real-time 24/7 monitoring. 200+ review requests/mo. Sentiment analysis. 12+ posts + 360° tours. 100+ citations + schema. Custom KPI dashboard. Dedicated manager (2h phone support)."],
                ].map(([tier, price, features]) => (
                  <tr key={tier} className="border-b" style={{ borderColor: "var(--sp-rule)" }}>
                    <td className="py-4 font-serif text-lg" style={{ color: "var(--sp-black)" }}>{tier}</td>
                    <td className="py-4 font-sans text-sm" style={{ color: "var(--sp-gray)" }}>{price}</td>
                    <td className="py-4 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>{features}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="space-y-2">
            {[
              "Services start post-onboarding (GBP access granted, payment cleared).",
              "No setup fees; month-to-month with 30 days notice to cancel.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
                <span className="mt-2 w-1 h-px inline-block shrink-0" style={{ backgroundColor: "var(--sp-gray)" }} />
                {item}
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      title: "2. Your Obligations",
      content: (
        <ul className="space-y-2">
          {[
            "Provide accurate GBP access at owner or manager level.",
            "Supply assets (photos, logos) promptly upon request.",
            "Comply with Google policies — no fake reviews or spam.",
            "Respond to intake forms within 24–48 hours.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
              <span className="mt-2 w-1 h-px inline-block shrink-0" style={{ backgroundColor: "var(--sp-gray)" }} />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "3. Payments",
      content: (
        <ul className="space-y-2">
          {[
            "Billed monthly via Stripe (auto-recurring).",
            "Overdue accounts incur a 1.5% late fee and suspension after 7 days.",
            "Refunds: None after service delivery (e.g., first audit). Pro-rated on valid cancellations.",
            "Taxes are your responsibility.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
              <span className="mt-2 w-1 h-px inline-block shrink-0" style={{ backgroundColor: "var(--sp-gray)" }} />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "4. Intellectual Property",
      content: (
        <ul className="space-y-3">
          {[
            { label: "Our Rights", text: "All reports, strategies, and MapMaster™ AI outputs are proprietary to Beyond Basics Studio." },
            { label: "Your Rights", text: "You receive a limited licence to use deliverables (e.g., posts published to your GBP)." },
            { label: "Restrictions", text: "No reverse-engineering of our tools, processes, or outputs." },
          ].map(({ label, text }) => (
            <li key={label} className="flex items-start gap-3 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
              <span className="mt-2 w-1 h-px inline-block shrink-0" style={{ backgroundColor: "var(--sp-gray)" }} />
              <span><span className="font-medium" style={{ color: "var(--sp-black)" }}>{label}:</span> {text}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "5. Confidentiality",
      content: (
        <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
          Both parties agree to keep GBP strategies, client data, and pricing confidential for a period of 2 years following the end of the engagement.
        </p>
      ),
    },
    {
      title: "6. Warranties and Disclaimers",
      content: (
        <>
          <p className="font-sans text-sm leading-relaxed mb-3" style={{ color: "var(--sp-gray)" }}>
            Services are provided "as-is." We aim for strong results but cannot guarantee specific outcomes, as Google's algorithm and policies are subject to change without notice.
          </p>
          <p className="font-sans text-sm leading-relaxed mb-3" style={{ color: "var(--sp-gray)" }}>
            You warrant that you are the authorised owner or manager of the GBP profile(s) and that your use of our services complies with Google's policies.
          </p>
          <p className="font-sans text-sm leading-relaxed uppercase tracking-wide text-xs" style={{ color: "var(--sp-gray)", opacity: 0.6 }}>
            No other warranties — express or implied — are made.
          </p>
        </>
      ),
    },
    {
      title: "7. Limitation of Liability",
      content: (
        <ul className="space-y-2">
          {[
            "Our maximum liability is limited to fees paid in the prior 12 months.",
            "We are not liable for consequential damages including lost profits or ranking drops.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
              <span className="mt-2 w-1 h-px inline-block shrink-0" style={{ backgroundColor: "var(--sp-gray)" }} />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "8. Termination",
      content: (
        <ul className="space-y-3">
          {[
            { label: "By You", text: "30 days written notice via the client portal or email." },
            { label: "By Us", text: "Immediate termination for breach (e.g., non-payment, policy violation)." },
            { label: "Post-termination", text: "We will revoke GBP access and delete your data in accordance with our Privacy Policy." },
          ].map(({ label, text }) => (
            <li key={label} className="flex items-start gap-3 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
              <span className="mt-2 w-1 h-px inline-block shrink-0" style={{ backgroundColor: "var(--sp-gray)" }} />
              <span><span className="font-medium" style={{ color: "var(--sp-black)" }}>{label}:</span> {text}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "9. Governing Law",
      content: (
        <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
          These Terms are governed by the laws of the State of Delaware, USA, or your local equivalent where mandated. All disputes shall be resolved through binding arbitration.
        </p>
      ),
    },
    {
      title: "10. Miscellaneous",
      content: (
        <ul className="space-y-2">
          {[
            "These Terms constitute the entire agreement between you and Beyond Basics Studio.",
            "Updates will be posted to this page with a revised effective date.",
            "If any provision is found invalid, the remaining provisions remain in full effect.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
              <span className="mt-2 w-1 h-px inline-block shrink-0" style={{ backgroundColor: "var(--sp-gray)" }} />
              {item}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "var(--sp-white)" }}>
      {/* Header */}
      <section className="section-dark border-b" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-20">
          <FadeIn><p className="label mb-6" style={{ color: "rgba(247,244,240,0.35)" }}>Legal</p></FadeIn>
          <FadeUp>
            <h1
              className="font-serif leading-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", color: "var(--sp-white)" }}
            >
              Terms &amp; Conditions
            </h1>
          </FadeUp>
          <FadeIn delay={0.2}>
            <p className="font-sans text-sm mt-5" style={{ color: "rgba(247,244,240,0.35)" }}>
              Effective Date: April 12, 2026 · beyondbasicsstudio.com
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Intro */}
      <section className="section-light border-b" style={{ borderColor: "var(--sp-rule)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 py-16">
          <FadeIn>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
              These Terms and Conditions ("Terms") govern your access to and use of beyondbasicsstudio.com (the "Site") and services offered by Beyond Basics Studio ("we," "us," "our"), including GBP management tiers (Basic $200/mo, Growth $500/mo, Premium $1,000/mo). By signing up, submitting forms, or making payment, you agree to these Terms.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Sections */}
      <section className="section-light">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 pb-24">
          {sections.map((section, i) => (
            <div
              key={i}
              className="py-10 border-b"
              style={{ borderColor: "var(--sp-rule)" }}
            >
              <FadeUp>
                <h2
                  className="font-serif mb-6"
                  style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", color: "var(--sp-black)" }}
                >
                  {section.title}
                </h2>
              </FadeUp>
              <FadeIn delay={0.08}>{section.content}</FadeIn>
            </div>
          ))}

          {/* Contact */}
          <FadeIn>
            <div className="pt-10">
              <p className="label mb-4">Contact</p>
              <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
                For questions about these Terms, contact us at{" "}
                <a
                  href="mailto:hello@beyondbasicsstudio.com"
                  className="underline underline-offset-2 transition-opacity hover:opacity-60"
                  style={{ color: "var(--sp-black)" }}
                >
                  hello@beyondbasicsstudio.com
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
