import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const DARK_HERO_PAGES = ["/", "/services", "/about", "/contact", "/journal", "/privacy", "/terms", "/sitemap", "/customers"];
  useEffect(() => {
    setDarkHero(DARK_HERO_PAGES.includes(location));
    setMenuOpen(false);
  }, [location]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/customers", label: "Customers" },
    { href: "/journal", label: "Journal" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const onDark = darkHero && !scrolled;
  const activeColor = onDark ? "rgba(247,244,240,0.95)" : "var(--sp-black)";
  const inactiveColor = onDark ? "rgba(247,244,240,0.55)" : "rgba(17,17,17,0.60)";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: menuOpen
            ? "rgba(247,244,240,0.92)"
            : scrolled
              ? "rgba(247,244,240,0.97)"
              : "transparent",
          borderBottom: scrolled || menuOpen ? "1px solid var(--sp-rule)" : "none",
          backdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(20px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-baseline gap-2">
              <span
                className="font-serif text-xl tracking-tight leading-none"
                style={{ color: menuOpen ? "var(--sp-black)" : activeColor }}
              >
                BBS
              </span>
              <span
                className="font-sans text-xs tracking-widest uppercase"
                style={{ color: menuOpen ? "var(--sp-gray)" : (onDark ? "rgba(247,244,240,0.75)" : "var(--sp-gray)") }}
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

            {/* Desktop CTA */}
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

            {/* Mobile: "Navigation" label + toggle */}
            <div className="md:hidden flex items-center gap-3">
              <span
                className="font-sans text-xs tracking-widest uppercase"
                style={{ color: menuOpen ? "var(--sp-gray)" : inactiveColor }}
              >
                Navigation
              </span>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ color: menuOpen ? "var(--sp-black)" : activeColor }}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu — full-screen frosted overlay, behind header z-50 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{
              backgroundColor: "rgba(247,244,240,0.88)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
            }}
          >
            {/* Spacer for navbar height */}
            <div className="h-16 border-b shrink-0" style={{ borderColor: "var(--sp-rule)" }} />

            {/* Nav items */}
            <nav className="flex-1 flex flex-col justify-center px-8 py-6 overflow-y-auto">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-5 py-4 border-b group"
                    style={{ borderColor: "var(--sp-rule)" }}
                  >
                    <span
                      className="font-sans text-xs w-6 shrink-0 tabular-nums"
                      style={{ color: "rgba(17,17,17,0.28)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-serif leading-none group-hover:opacity-50 transition-opacity duration-200"
                      style={{
                        fontSize: "clamp(2rem, 8vw, 2.75rem)",
                        color: location === link.href ? "var(--sp-green)" : "var(--sp-black)",
                      }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: links.length * 0.05 + 0.05 }}
              className="px-8 pb-10 pt-6 shrink-0"
            >
              <button
                onClick={() => { onAuditClick(); setMenuOpen(false); }}
                className="btn btn-black w-full justify-center"
              >
                Free Audit
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
