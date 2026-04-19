import { useCallback, useEffect, useRef, useState } from "react";
import { X, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { trackEvent } from "../lib/analytics";

const FORMSPREE_AUDIT_ID = (import.meta.env.VITE_FORMSPREE_AUDIT_ID || import.meta.env.VITE_FORMSPREE_ID) as string | undefined;

interface FormValues {
  name: string; email: string; phone: string;
  gbpUrl: string; businessType: string; tier: string;
}

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>();
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const trackedOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen && !trackedOpenRef.current) {
      trackedOpenRef.current = true;
      trackEvent("audit_modal_opened");
    }
    if (!isOpen) {
      trackedOpenRef.current = false;
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    reset();
    setSubmitState("idle");
    onClose();
  }, [reset, onClose]);

  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  useEffect(() => { const fn = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); }; window.addEventListener("keydown", fn); return () => window.removeEventListener("keydown", fn); }, [handleClose]);

  const onSubmit = async (data: FormValues) => {
    setSubmitState("idle");
    if (!FORMSPREE_AUDIT_ID) {
      await new Promise(r => setTimeout(r, 600));
      trackEvent("audit_form_submitted");
      setSubmitState("success");
      return;
    }
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_AUDIT_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _subject: "New Free GBP Audit Request" }),
      });
      if (res.ok) {
        trackEvent("audit_form_submitted");
        setSubmitState("success");
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  };

  if (!isOpen) return null;

  const inputCls = "w-full bg-transparent border-b py-3 font-sans text-sm outline-none transition-colors duration-200 placeholder:opacity-30";
  const inputStyle = { color: "var(--sp-black)", borderColor: "var(--sp-rule)" };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(13,13,13,0.7)", backdropFilter: "blur(6px)" }}
        onClick={handleClose}
      />
      <div
        className="relative w-full sm:max-w-lg sm:mx-4 max-h-[92vh] overflow-y-auto"
        style={{ backgroundColor: "var(--sp-white)", color: "var(--sp-black)" }}
      >
        <div className="p-8 sm:p-10">
          <div className="flex items-start justify-between mb-10">
            <div>
              <p className="label mb-3">Free GBP Audit</p>
              <h2 className="font-serif text-3xl sm:text-4xl leading-tight" style={{ color: "var(--sp-black)" }}>
                See what you're leaving on the table.
              </h2>
            </div>
            <button onClick={handleClose} className="mt-1 ml-4 opacity-30 hover:opacity-70 transition-opacity" style={{ color: "var(--sp-black)" }}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {submitState === "success" ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 border flex items-center justify-center mx-auto mb-5" style={{ borderColor: "var(--sp-rule)" }}>
                <CheckCircle className="w-5 h-5" style={{ color: "var(--sp-black)" }} />
              </div>
              <h3 className="font-serif text-2xl mb-3" style={{ color: "var(--sp-black)" }}>We'll be in touch.</h3>
              <p className="font-sans text-sm mb-8" style={{ color: "var(--sp-gray)" }}>Expect your audit within 24 hours.</p>
              <button onClick={handleClose} className="btn btn-outline">Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {[
                { label: "Full Name", key: "name" as const, type: "text", placeholder: "Jane Smith", required: true },
                { label: "Email Address", key: "email" as const, type: "email", placeholder: "jane@business.com", required: true },
                { label: "Phone (optional)", key: "phone" as const, type: "tel", placeholder: "+1 555 000 0000", required: false },
                { label: "GBP Profile URL", key: "gbpUrl" as const, type: "text", placeholder: "maps.google.com/...", required: true },
                { label: "Business Type", key: "businessType" as const, type: "text", placeholder: "Restaurant, Dental, Auto...", required: false },
              ].map(({ label, key, type, placeholder, required }) => (
                <div key={key}>
                  <label className="label block mb-1">{label}</label>
                  <input
                    {...register(key, {
                      ...(required ? { required: "Required" } : {}),
                      ...(key === "email" ? {
                        pattern: { value: /.+@.+\..+/, message: "Please enter a valid email address" },
                      } : {}),
                      ...(key === "gbpUrl" ? {
                        validate: (val) => {
                          if (!val) return true;
                          try {
                            const url = new URL(val.trim());
                            const host = url.hostname.toLowerCase();
                            const path = url.pathname.toLowerCase();
                            const validMapsHost =
                              (host === "maps.app.goo.gl") ||
                              (host === "maps.google.com") ||
                              ((host === "google.com" || host === "www.google.com") && path.startsWith("/maps"));
                            return validMapsHost || "Please paste a valid Google Maps link (e.g. google.com/maps/...)";
                          } catch {
                            return "Please paste a valid Google Maps link (e.g. google.com/maps/...)";
                          }
                        },
                      } : {}),
                    })}
                    type={type}
                    placeholder={placeholder}
                    className={inputCls}
                    style={inputStyle}
                  />
                  {errors[key] && <p className="font-sans text-xs mt-1 text-red-500">{errors[key]?.message}</p>}
                </div>
              ))}

              <div>
                <label className="label block mb-1">Tier Interest</label>
                <select
                  {...register("tier")}
                  className={inputCls}
                  style={{ ...inputStyle, backgroundColor: "transparent" }}
                >
                  <option value="">Select a tier...</option>
                  <option value="basic">Basic — $200/mo</option>
                  <option value="growth">Growth — $500/mo</option>
                  <option value="premium">Premium — $1,000/mo</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>

              {submitState === "error" && (
                <div className="flex items-center gap-2 font-sans text-sm text-red-500">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Something went wrong. Please try again or email us directly.</span>
                </div>
              )}

              <div className="pt-4">
                <button type="submit" disabled={isSubmitting} className="btn btn-black w-full justify-center disabled:opacity-50">
                  {isSubmitting ? "Sending..." : <><span>Get My Free Audit</span><ArrowRight className="w-3.5 h-3.5" /></>}
                </button>
                <p className="font-sans text-xs text-center mt-4" style={{ color: "var(--sp-gray)" }}>
                  No commitment. Results within 24–48 hours.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
