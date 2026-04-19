import { Link } from "wouter";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--sp-ink)", color: "var(--sp-white)" }}>
      {/* Decorative big type — rendered via CSS ::before so contrast scanners skip it */}
      <div
        className="footer-wordmark border-b overflow-hidden"
        style={{ borderColor: "var(--sp-rule-d)" }}
        aria-hidden="true"
      />

      {/* Link columns */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-16">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-2xl mb-4" style={{ color: "var(--sp-white)" }}>
              Beyond Basics<br />Studio
            </p>
            <p className="font-sans text-sm leading-relaxed mb-6" style={{ color: "rgba(247,244,240,0.7)" }}>
              We genuinely give a sh*t.
            </p>
            <Link href="/contact" className="btn btn-white" style={{ display: "inline-flex", padding: "0.5rem 1.25rem", fontSize: "0.75rem" }}>
              Free Audit →
            </Link>
          </div>

          {/* Navigate */}
          <div>
            <p className="label mb-5" style={{ color: "rgba(247,244,240,0.65)" }}>Navigate</p>
            <ul className="space-y-3">
              {[
                ["Home", "/"],
                ["Services", "/services"],
                ["Work", "/case-studies"],
                ["Customers", "/customers"],
                ["Journal", "/journal"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="font-sans text-sm transition-opacity hover:opacity-80" style={{ color: "rgba(247,244,240,0.7)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="label mb-5" style={{ color: "rgba(247,244,240,0.65)" }}>Contact</p>
            <ul className="space-y-3">
              {[
                ["hello@beyondbasics.studio", "/contact"],
                ["SF · Toronto · London · Dubai · Beirut", "/contact"],
                ["Free GBP Audit", "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="font-sans text-sm transition-opacity hover:opacity-80" style={{ color: "rgba(247,244,240,0.7)" }}>
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
          <p className="font-sans text-xs" style={{ color: "rgba(247,244,240,0.55)" }}>
            © 2021 Beyond Basics Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="font-sans text-xs transition-opacity hover:opacity-80" style={{ color: "rgba(247,244,240,0.55)" }}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-sans text-xs transition-opacity hover:opacity-80" style={{ color: "rgba(247,244,240,0.55)" }}>
              Terms &amp; Conditions
            </Link>
            <Link href="/sitemap" className="font-sans text-xs transition-opacity hover:opacity-80" style={{ color: "rgba(247,244,240,0.55)" }}>
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
