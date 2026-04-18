import { FadeUp, FadeIn } from "@/components/Animate";
import SchemaMarkup from "@/components/SchemaMarkup";
import { usePageMeta } from "@/hooks/usePageMeta";

export default function PrivacyPolicy() {
  usePageMeta({ title: "Privacy Policy — Beyond Basics Studio", description: "How Beyond Basics Studio collects, uses, and protects your personal and business data.", ogImage: "home.jpg", url: "/privacy" });
  const sections = [
    {
      title: "1. Information We Collect",
      content: (
        <>
          <p className="font-sans text-sm leading-relaxed mb-4" style={{ color: "var(--sp-gray)" }}>
            We collect the following types of information:
          </p>
          <ul className="space-y-4">
            {[
              { label: "Personal Information", text: "Name, email address, phone number, business name, GBP URL, payment details (processed via Stripe), and tier selection (Basic $200/mo, Growth $500/mo, Premium $1,000/mo) submitted via forms, audits, or onboarding." },
              { label: "Usage Data", text: "IP address, browser type, pages visited, time spent, and referral sources via cookies and analytics (Google Analytics)." },
              { label: "Business Data", text: "GBP profile details, review links, photos, and performance metrics you provide or we access with permission." },
              { label: "Communication Data", text: "Emails, chat logs, call notes, and feedback from onboarding workflows." },
            ].map(({ label, text }) => (
              <li key={label} className="grid grid-cols-12 gap-4">
                <span className="col-span-3 font-sans text-xs font-medium pt-0.5" style={{ color: "var(--sp-black)" }}>{label}</span>
                <span className="col-span-9 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>{text}</span>
              </li>
            ))}
          </ul>
          <p className="font-sans text-sm leading-relaxed mt-4" style={{ color: "var(--sp-gray)" }}>
            We do not collect sensitive information (e.g., financial account numbers beyond payment tokens) or data from children under 13.
          </p>
        </>
      ),
    },
    {
      title: "2. How We Use Your Information",
      content: (
        <ul className="space-y-2">
          {[
            "Provide GBP services: profile audits, optimisations, posts, review management, reporting.",
            "Process payments and manage subscriptions.",
            "Communicate updates, results, and marketing (unsubscribe anytime).",
            "Improve services via analytics and AI tools like MapMaster™.",
            "Comply with laws and prevent fraud.",
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
      title: "3. Cookies and Tracking",
      content: (
        <>
          <p className="font-sans text-sm leading-relaxed mb-4" style={{ color: "var(--sp-gray)" }}>Our Site uses:</p>
          <ul className="space-y-3">
            {[
              { label: "Essential Cookies", text: "For navigation, forms, and modals." },
              { label: "Analytics Cookies", text: "Google Analytics (anonymised) to track performance." },
              { label: "Marketing Cookies", text: "For retargeting (opt-out via browser settings)." },
            ].map(({ label, text }) => (
              <li key={label} className="flex items-start gap-3 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
                <span className="mt-2 w-1 h-px inline-block shrink-0" style={{ backgroundColor: "var(--sp-gray)" }} />
                <span><span className="font-medium" style={{ color: "var(--sp-black)" }}>{label}:</span> {text}</span>
              </li>
            ))}
          </ul>
          <p className="font-sans text-sm leading-relaxed mt-4" style={{ color: "var(--sp-gray)" }}>
            Manage preferences in your browser settings.
          </p>
        </>
      ),
    },
    {
      title: "4. Sharing Your Information",
      content: (
        <>
          <p className="font-sans text-sm leading-relaxed mb-4" style={{ color: "var(--sp-gray)" }}>We share data only as needed:</p>
          <ul className="space-y-3">
            {[
              { label: "Service Providers", text: "Stripe (payments), Google Workspace (storage), Zapier (automation), EmailJS/Netlify (forms)." },
              { label: "Legal", text: "With authorities if required (e.g., subpoenas)." },
              { label: "Business Transfers", text: "In mergers or acquisitions." },
            ].map(({ label, text }) => (
              <li key={label} className="flex items-start gap-3 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
                <span className="mt-2 w-1 h-px inline-block shrink-0" style={{ backgroundColor: "var(--sp-gray)" }} />
                <span><span className="font-medium" style={{ color: "var(--sp-black)" }}>{label}:</span> {text}</span>
              </li>
            ))}
          </ul>
          <p className="font-sans text-sm leading-relaxed mt-4" style={{ color: "var(--sp-gray)" }}>
            We do not sell your data to third parties.
          </p>
        </>
      ),
    },
    {
      title: "5. Data Security",
      content: (
        <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
          We use HTTPS, encryption, access controls, and regular audits to protect your data. However, no system is 100% secure. For concerns, contact us at{" "}
          <a href="mailto:hello@beyondbasicsstudio.com" className="underline underline-offset-2" style={{ color: "var(--sp-black)" }}>
            hello@beyondbasicsstudio.com
          </a>.
        </p>
      ),
    },
    {
      title: "6. Your Rights",
      content: (
        <>
          <p className="font-sans text-sm leading-relaxed mb-4" style={{ color: "var(--sp-gray)" }}>Depending on your location, you may:</p>
          <ul className="space-y-2 mb-4">
            {[
              "Access, correct, delete, or export your data.",
              "Opt out of marketing communications.",
              "Withdraw GBP access at any time.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
                <span className="mt-2 w-1 h-px inline-block shrink-0" style={{ backgroundColor: "var(--sp-gray)" }} />
                {item}
              </li>
            ))}
          </ul>
          <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
            To make a request, email{" "}
            <a href="mailto:hello@beyondbasicsstudio.com" className="underline underline-offset-2" style={{ color: "var(--sp-black)" }}>
              hello@beyondbasicsstudio.com
            </a>. We respond within 30 days.
          </p>
        </>
      ),
    },
    {
      title: "7. International Transfers",
      content: (
        <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
          Our global operations may involve data transfers to providers outside your country (e.g., US-based services). We ensure equivalent protections are in place in all cases.
        </p>
      ),
    },
    {
      title: "8. Retention",
      content: (
        <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
          We retain data for as long as necessary to provide our services — typically up to 7 years post-termination for financial and compliance records — after which it is securely deleted.
        </p>
      ),
    },
    {
      title: "9. Changes to This Policy",
      content: (
        <p className="font-sans text-sm leading-relaxed" style={{ color: "var(--sp-gray)" }}>
          We may update this policy periodically. Please check the effective date above. Continued use of the Site following any changes constitutes your acceptance of the updated policy.
        </p>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "var(--sp-white)" }}>
      <SchemaMarkup schema={[
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.beyondbasicsstudio.com/" },
            { "@type": "ListItem", "position": 2, "name": "Privacy Policy", "item": "https://www.beyondbasicsstudio.com/privacy" }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": "https://www.beyondbasicsstudio.com/privacy",
          "name": "Privacy Policy — Beyond Basics Studio",
          "description": "How Beyond Basics Studio collects, uses, and protects your personal data in accordance with GDPR and applicable privacy laws.",
          "datePublished": "2026-04-12",
          "dateModified": "2026-04-12",
          "isPartOf": { "@type": "WebSite", "url": "https://www.beyondbasicsstudio.com/" },
          "publisher": {
            "@type": "Organization",
            "name": "Beyond Basics Studio",
            "url": "https://www.beyondbasicsstudio.com/"
          }
        }
      ]} />

      {/* Header */}
      <section className="section-dark border-b" style={{ borderColor: "var(--sp-rule-d)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-36 pb-20">
          <FadeIn><p className="label mb-6" style={{ color: "rgba(247,244,240,0.35)" }}>Legal</p></FadeIn>
          <FadeUp>
            <h1
              className="font-serif leading-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", color: "var(--sp-white)" }}
            >
              Privacy Policy
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
              At Beyond Basics Studio ("we," "us," or "our"), operating at beyondbasicsstudio.com (the "Site"), we prioritise your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our Site, use our Google Business Profile (GBP) management services, or interact with us. By using our Site or services, you consent to these practices.
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
                For any privacy-related questions or requests, reach us at{" "}
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
