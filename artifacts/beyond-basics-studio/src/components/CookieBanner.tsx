import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "bbs-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "110%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[9000]"
          style={{
            backgroundColor: "var(--sp-ink)",
            borderTop: "1px solid var(--sp-rule-d)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <p className="label" style={{ color: "rgba(247,244,240,0.75)" }}>
                    Cookies &amp; Privacy
                  </p>
                </div>
                <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(247,244,240,0.75)" }}>
                  We use essential, analytics, and marketing cookies to improve your experience and understand how our site is used.{" "}
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="underline underline-offset-2 transition-opacity hover:opacity-70"
                    style={{ color: "rgba(247,244,240,0.75)" }}
                  >
                    {expanded ? "Show less" : "Learn more"}
                  </button>
                </p>

                {/* Expanded detail */}
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 grid sm:grid-cols-3 gap-4">
                        {[
                          { title: "Essential", desc: "Required for the site to function — forms, navigation, and session state. Cannot be disabled.", always: true },
                          { title: "Analytics", desc: "Google Analytics (anonymised) helps us understand page performance and improve content." },
                          { title: "Marketing", desc: "Used for retargeting ads. You can opt out at any time via your browser settings." },
                        ].map((c) => (
                          <div
                            key={c.title}
                            className="p-4 border"
                            style={{ borderColor: "var(--sp-rule-d)" }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-sans text-xs font-medium" style={{ color: "rgba(247,244,240,0.9)" }}>{c.title}</span>
                              {c.always && (
                                <span className="label text-[10px] px-1.5 py-0.5 border" style={{ borderColor: "var(--sp-rule-d)", color: "rgba(247,244,240,0.7)" }}>
                                  Always on
                                </span>
                              )}
                            </div>
                            <p className="font-sans text-xs leading-relaxed" style={{ color: "rgba(247,244,240,0.7)" }}>{c.desc}</p>
                          </div>
                        ))}
                      </div>
                      <p className="font-sans text-xs mt-4" style={{ color: "rgba(247,244,240,0.65)" }}>
                        For full details see our{" "}
                        <Link href="/privacy" className="underline underline-offset-2 hover:opacity-70" style={{ color: "rgba(247,244,240,0.75)" }}>
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 shrink-0 sm:pt-0.5">
                <button
                  onClick={decline}
                  className="btn btn-outline-white text-xs py-2.5 px-5"
                >
                  Decline
                </button>
                <button
                  onClick={accept}
                  className="btn btn-white text-xs py-2.5 px-5"
                >
                  Accept All
                </button>
                <button
                  onClick={decline}
                  className="ml-1 opacity-60 hover:opacity-90 transition-opacity"
                  style={{ color: "var(--sp-white)" }}
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
