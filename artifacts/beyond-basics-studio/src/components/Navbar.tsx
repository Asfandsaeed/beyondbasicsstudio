import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onAuditClick: () => void;
}

export default function Navbar({ onAuditClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkHero, setDarkHero] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // All pages have a dark hero — nav needs light text until scrolled
  const DARK_HERO_PAGES = ["/", "/services", "/case-studies", "/about", "/contact", "/journal", "/privacy", "/terms", "/sitemap", "/customers"];
  useEffect(() => {
    setDarkHero(DARK_HERO_PAGES.includes(location));
    setMenuOpen(false);
  }, [location]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/case-studies", label: "Work" },
    { href: "/customers", label: "Customers" },
    { href: "/journal", label: "Journal" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const onDark = darkHero && !scrolled;
  const activeColor = onDark ? "rgba(247,244,240,0.95)" : "var(--sp-black)";
  const inactiveColor = onDark ? "rgba(247,244,240,0.55)" : "rgba(17,17,17,0.60)";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(247,244,240,0.97)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--sp-rule)" : "none",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-2">
            <span
              className="font-serif text-xl tracking-tight leading-none"
              style={{ color: activeColor }}
            >
              BBS
            </span>
            <span
              className="font-sans text-xs tracking-widest uppercase"
              style={{ color: onDark ? "rgba(247,244,240,0.75)" : "var(--sp-gray)" }}
            >
              Studio
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: location === link.href ? activeColor : inactiveColor }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={onAuditClick}
              className="btn btn-outline-white"
              style={!onDark ? {
                color: "var(--sp-black)",
                borderColor: "rgba(17,17,17,0.3)",
              } : {}}
            >
              Free Audit
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            style={{ color: activeColor }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pt-6 pb-8 space-y-5 border-t"
          style={{ backgroundColor: "var(--sp-white)", borderColor: "var(--sp-rule)" }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block font-serif text-3xl"
              style={{ color: "var(--sp-black)" }}
            >
              {link.label}
            </Link>
          ))}
          <button onClick={() => { onAuditClick(); setMenuOpen(false); }} className="btn btn-black w-full justify-center mt-4">
            Free Audit
          </button>
        </div>
      )}
    </header>
  );
}
