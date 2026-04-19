/**
 * Analytics bootstrap and event helper.
 *
 * Set VITE_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX) in your environment to
 * activate Google Analytics 4. Without that variable every trackEvent()
 * call is a safe no-op — no errors, no network requests.
 *
 * GA is only initialised after the visitor accepts cookies via the
 * Cookie Banner ("bbs-cookie-consent" === "accepted" in localStorage).
 * If they haven't decided yet, we listen for the storage event and
 * initialise as soon as consent is granted.
 *
 * Tracked events:
 *   - audit_modal_opened    — visitor opens the free-audit request modal
 *   - audit_form_submitted  — visitor successfully submits the audit form
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const CONSENT_KEY = "bbs-cookie-consent";

function injectGA(measurementId: string): void {
  if (typeof document === "undefined") return;
  if (document.getElementById("ga4-script")) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

function maybeInit(): void {
  if (!GA_ID) return;
  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent === "accepted") {
    injectGA(GA_ID);
  }
}

if (typeof window !== "undefined" && GA_ID) {
  maybeInit();

  window.addEventListener("storage", (e) => {
    if (e.key === CONSENT_KEY && e.newValue === "accepted") {
      injectGA(GA_ID);
    }
  });

  document.addEventListener("bbs-cookie-accept", () => injectGA(GA_ID), { once: true });
}

export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params ?? {});
  }
}
