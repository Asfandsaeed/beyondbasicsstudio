import { useEffect } from "react";
import { X, CheckCircle, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  gbpUrl: string;
  businessType: string;
  tier: string;
}

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<FormValues>();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const onSubmit = async (_: FormValues) => {
    await new Promise(r => setTimeout(r, 1100));
  };

  if (!isOpen) return null;

  const inputCls = `
    w-full bg-transparent border-b py-3 font-sans text-sm outline-none transition-colors duration-200
    placeholder:opacity-30 focus:border-opacity-80
  `;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(44,49,41,0.85)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      />
      <div
        className="relative w-full sm:max-w-lg sm:mx-4 max-h-[92vh] overflow-y-auto"
        style={{ backgroundColor: "#363b32", color: "var(--sf-cream)" }}
      >
        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <p className="tag mb-3" style={{ color: "var(--sf-cream)" }}>Free GBP Audit</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight" style={{ color: "var(--sf-cream)" }}>
                Let's see what you're<br />leaving on the table.
              </h2>
            </div>
            <button
              onClick={onClose}
              className="mt-1 ml-4 opacity-40 hover:opacity-80 transition-opacity"
              style={{ color: "var(--sf-cream)" }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSubmitSuccessful ? (
            <div className="text-center py-10">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: "rgba(229,225,216,0.1)" }}
              >
                <CheckCircle className="w-7 h-7" style={{ color: "var(--sf-cream)" }} />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: "var(--sf-cream)" }}>
                We'll be in touch.
              </h3>
              <p className="font-sans text-sm mb-8" style={{ color: "rgba(229,225,216,0.5)" }}>
                Expect your audit within 24 hours.
              </p>
              <button
                onClick={() => { reset(); onClose(); }}
                className="btn-outline-cream text-xs"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {[
                { label: "Full Name", key: "name" as const, type: "text", placeholder: "Jane Smith", required: true },
                { label: "Email Address", key: "email" as const, type: "email", placeholder: "jane@business.com", required: true },
                { label: "Phone (optional)", key: "phone" as const, type: "tel", placeholder: "+1 555 000 0000", required: false },
                { label: "GBP Profile URL", key: "gbpUrl" as const, type: "text", placeholder: "maps.google.com/...", required: true },
                { label: "Business Type", key: "businessType" as const, type: "text", placeholder: "Restaurant, Dental, Auto Repair...", required: false },
              ].map(({ label, key, type, placeholder, required }) => (
                <div key={key}>
                  <label
                    className="tag block mb-1"
                    style={{ color: "rgba(229,225,216,0.45)" }}
                  >
                    {label}
                  </label>
                  <input
                    {...register(key, required ? { required: "Required" } : {})}
                    type={type}
                    placeholder={placeholder}
                    className={inputCls}
                    style={{
                      color: "var(--sf-cream)",
                      borderColor: "rgba(229,225,216,0.2)",
                    }}
                  />
                  {errors[key] && (
                    <p className="font-sans text-xs mt-1" style={{ color: "#d4726a" }}>
                      {errors[key]?.message}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label className="tag block mb-1" style={{ color: "rgba(229,225,216,0.45)" }}>
                  Tier Interest
                </label>
                <select
                  {...register("tier")}
                  className={inputCls}
                  style={{
                    color: "var(--sf-cream)",
                    borderColor: "rgba(229,225,216,0.2)",
                    backgroundColor: "transparent",
                  }}
                >
                  <option value="" style={{ backgroundColor: "#363b32" }}>Select a tier...</option>
                  <option value="basic" style={{ backgroundColor: "#363b32" }}>Basic — $200/mo</option>
                  <option value="growth" style={{ backgroundColor: "#363b32" }}>Growth — $500/mo</option>
                  <option value="premium" style={{ backgroundColor: "#363b32" }}>Premium — $1,000/mo</option>
                  <option value="unsure" style={{ backgroundColor: "#363b32" }}>Not sure yet</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-cream w-full justify-center disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : (
                    <>Get My Free Audit <ArrowRight className="w-3.5 h-3.5" /></>
                  )}
                </button>
                <p className="font-sans text-xs text-center mt-4" style={{ color: "rgba(229,225,216,0.25)" }}>
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
