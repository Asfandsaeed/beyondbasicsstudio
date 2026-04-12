import { Link } from "wouter";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--sp-ink)", color: "var(--sp-white)" }}>
      {/* Big type */}
      <div className="border-b overflow-hidden" style={{ borderColor: "var(--sp-rule-d)" }}>
        <p
          className="font-serif leading-none px-6 lg:px-12 py-16 lg:py-24 select-none"
          style={{ fontSize: "clamp(3rem, 9vw, 9rem)", color: "rgba(247,244,240,0.06)", whiteSpace: "nowrap" }}
        >
          Beyond Basics Studio
        </p>
      </div>

      {/* Link columns */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-2xl mb-4" style={{ color: "var(--sp-white)" }}>
              Beyond Basics<br />Studio
            </p>
            <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: "rgba(247,244,240,0.4)" }}>
              Your GBP Unfair Advantage.<br />500+ profiles managed worldwide.
            </p>
            <Link href="/contact" className="btn btn-white" style={{ display: "inline-flex", padding: "0.5rem 1.25rem", fontSize: "0.75rem" }}>
              Free Audit →
            </Link>
          </div>

          {/* Navigate */}
          <div>
            <p className="label mb-5" style={{ color: "rgba(247,244,240,0.35)" }}>Navigate</p>
            <ul className="space-y-3">
              {[
                ["Home", "/"],
                ["Services", "/services"],
                ["Work", "/case-studies"],
                ["Journal", "/journal"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="font-sans text-sm transition-opacity hover:opacity-80" style={{ color: "rgba(247,244,240,0.45)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="label mb-5" style={{ color: "rgba(247,244,240,0.35)" }}>Services</p>
            <ul className="space-y-3">
              {[
                ["Basic — $200/mo", "/services"],
                ["Growth — $500/mo", "/services"],
                ["Premium — $1k/mo", "/services"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="font-sans text-sm transition-opacity hover:opacity-80" style={{ color: "rgba(247,244,240,0.45)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label mb-5" style={{ color: "rgba(247,244,240,0.35)" }}>Contact</p>
            <ul className="space-y-3">
              {[
                ["hello@beyondbasics.studio", "/contact"],
                ["Global — Worldwide", "/contact"],
                ["Free GBP Audit", "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="font-sans text-sm transition-opacity hover:opacity-80" style={{ color: "rgba(247,244,240,0.45)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "var(--sp-rule-d)" }}
        >
          <p className="font-sans text-xs" style={{ color: "rgba(247,244,240,0.2)" }}>
            © 2026 Beyond Basics Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="font-sans text-xs transition-opacity hover:opacity-60" style={{ color: "rgba(247,244,240,0.2)" }}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-sans text-xs transition-opacity hover:opacity-60" style={{ color: "rgba(247,244,240,0.2)" }}>
              Terms &amp; Conditions
            </Link>
            <Link href="/sitemap" className="font-sans text-xs transition-opacity hover:opacity-60" style={{ color: "rgba(247,244,240,0.2)" }}>
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
