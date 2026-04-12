import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onAuditClick: () => void;
}

export default function Navbar({ onAuditClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/case-studies", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b"
          : ""
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(44,49,41,0.97)" : "transparent",
        borderColor: "rgba(229,225,216,0.1)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-baseline gap-1.5">
            <span
              className="font-display text-xl md:text-2xl font-semibold leading-none tracking-tight"
              style={{ color: "var(--sf-cream)" }}
            >
              BBS
            </span>
            <span
              className="font-sans text-xs tracking-widest uppercase opacity-50"
              style={{ color: "var(--sf-cream)" }}
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
                className={`font-sans text-xs tracking-widest uppercase transition-opacity duration-200 ${
                  location === link.href ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
                style={{ color: "var(--sf-cream)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={onAuditClick}
              className="btn-outline-cream text-xs"
              style={{ color: "var(--sf-cream)", borderColor: "rgba(229,225,216,0.35)" }}
            >
              Free Audit
            </button>
          </div>

          {/* Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden opacity-70 hover:opacity-100 transition-opacity"
            style={{ color: "var(--sf-cream)" }}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t px-6 py-8 space-y-6"
          style={{ backgroundColor: "var(--sf-dark)", borderColor: "rgba(229,225,216,0.1)" }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block font-display text-3xl font-semibold"
              style={{ color: "var(--sf-cream)" }}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => { onAuditClick(); setMenuOpen(false); }}
            className="btn-outline-cream w-full justify-center mt-4"
          >
            Get Free Audit
          </button>
        </div>
      )}
    </header>
  );
}
