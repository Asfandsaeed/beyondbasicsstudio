import { Link } from "wouter";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--sp-ink)", color: "var(--sp-white)" }}>
      {/* Big type */}
      <div
        className="border-b overflow-hidden"
        style={{ borderColor: "var(--sp-rule-d)" }}
      >
        <p
          className="font-serif leading-none px-6 lg:px-12 py-16 lg:py-24 select-none"
          style={{
            fontSize: "clamp(3rem, 9vw, 9rem)",
            color: "rgba(247,244,240,0.06)",
            whiteSpace: "nowrap",
          }}
        >
          Beyond Basics Studio
        </p>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-2xl mb-4" style={{ color: "var(--sp-white)" }}>
              Beyond Basics<br />Studio
            </p>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(247,244,240,0.4)" }}>
              Your GBP Unfair Advantage. 500+ profiles managed worldwide.
            </p>
          </div>

          {[
            {
              heading: "Services",
              links: [["Basic — $200/mo", "/services"], ["Growth — $500/mo", "/services"], ["Premium — $1k/mo", "/services"], ["Free Audit", "/contact"]],
            },
            {
              heading: "Company",
              links: [["About", "/about"], ["Work", "/case-studies"], ["Contact", "/contact"]],
            },
            {
              heading: "Contact",
              links: [["hello@beyondbasics.studio", "/contact"], ["Global — Worldwide", "/contact"]],
            },
          ].map((col) => (
            <div key={col.heading}>
              <p className="label mb-5" style={{ color: "rgba(247,244,240,0.35)" }}>{col.heading}</p>
              <ul className="space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="font-sans text-sm transition-opacity hover:opacity-80" style={{ color: "rgba(247,244,240,0.45)" }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "var(--sp-rule-d)" }}
        >
          <p className="font-sans text-xs" style={{ color: "rgba(247,244,240,0.2)" }}>
            © 2026 Beyond Basics Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
              <Link href="/privacy" className="font-sans text-xs transition-opacity hover:opacity-60" style={{ color: "rgba(247,244,240,0.2)" }}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
