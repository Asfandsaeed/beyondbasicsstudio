import { Link } from "wouter";

export default function Footer() {
  return (
    <footer
      className="overflow-hidden"
      style={{ backgroundColor: "var(--sf-dark)", borderTop: "1px solid rgba(229,225,216,0.1)" }}
    >
      {/* Big type statement */}
      <div className="px-6 lg:px-10 pt-16 pb-0 border-b" style={{ borderColor: "rgba(229,225,216,0.1)" }}>
        <p
          className="font-display font-semibold italic leading-none tracking-tight overflow-hidden"
          style={{
            color: "var(--sf-cream)",
            fontSize: "clamp(3rem, 10vw, 9rem)",
            opacity: 0.08,
            whiteSpace: "nowrap",
          }}
        >
          Beyond Basics Studio
        </p>
      </div>

      {/* Links grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 mb-16">
          <div className="col-span-2 md:col-span-1">
            <p
              className="font-display text-2xl font-semibold italic mb-4 leading-tight"
              style={{ color: "var(--sf-cream)" }}
            >
              Beyond Basics<br />Studio
            </p>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(229,225,216,0.45)" }}>
              Your GBP Unfair Advantage. We help local businesses dominate Google Maps worldwide.
            </p>
            <div className="flex gap-4 mt-6">
              {["LinkedIn", "Twitter", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-sans text-xs tracking-widest uppercase transition-opacity hover:opacity-100"
                  style={{ color: "rgba(229,225,216,0.35)" }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="tag mb-5" style={{ color: "var(--sf-cream)" }}>Services</p>
            <ul className="space-y-3">
              {["Basic Plan", "Growth Plan", "Premium Plan", "GBP Audits", "Review Management"].map((item) => (
                <li key={item}>
                  <Link
                    href="/services"
                    className="font-sans text-sm transition-opacity hover:opacity-100"
                    style={{ color: "rgba(229,225,216,0.45)" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="tag mb-5" style={{ color: "var(--sf-cream)" }}>Company</p>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Careers", href: "/contact" },
                { label: "GBP Tips Blog", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm transition-opacity hover:opacity-100"
                    style={{ color: "rgba(229,225,216,0.45)" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="tag mb-5" style={{ color: "var(--sf-cream)" }}>Contact</p>
            <ul className="space-y-3">
              <li className="font-sans text-sm" style={{ color: "rgba(229,225,216,0.45)" }}>
                <a href="mailto:hello@beyondbasics.studio" className="hover:opacity-100 transition-opacity">
                  hello@beyondbasics.studio
                </a>
              </li>
              <li className="font-sans text-sm" style={{ color: "rgba(229,225,216,0.45)" }}>Global HQ</li>
              <li className="font-sans text-sm" style={{ color: "rgba(229,225,216,0.45)" }}>Serving clients worldwide</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "rgba(229,225,216,0.1)" }}
        >
          <p className="font-sans text-xs" style={{ color: "rgba(229,225,216,0.25)" }}>
            &copy; 2026 Beyond Basics Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-sans text-xs transition-opacity hover:opacity-60"
                style={{ color: "rgba(229,225,216,0.25)" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
