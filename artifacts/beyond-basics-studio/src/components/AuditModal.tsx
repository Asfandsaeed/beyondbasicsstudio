import { useEffect } from "react";
import { X, MapPin, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  gbpUrl: string;
  businessType: string;
  tier: string;
  message?: string;
}

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm<FormValues>();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const onSubmit = async (_data: FormValues) => {
    await new Promise(r => setTimeout(r, 1200));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 bg-blue-700 rounded flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5 text-white" fill="white" />
                </div>
                <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Free GBP Audit</span>
              </div>
              <h2 className="text-white text-2xl font-bold font-serif">Claim Your Free Audit</h2>
              <p className="text-white/50 text-sm mt-1">We'll review your Google Business Profile and show you exactly what's costing you customers.</p>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors ml-4 mt-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSubmitSuccessful ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">You're on the list!</h3>
              <p className="text-white/50 text-sm mb-6">Our team will review your GBP and reach out within 24 hours with your audit results.</p>
              <button
                onClick={() => { reset(); onClose(); }}
                className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1.5 block">Full Name *</label>
                  <input
                    {...register("name", { required: "Required" })}
                    placeholder="Jane Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1.5 block">Email *</label>
                  <input
                    {...register("email", { required: "Required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })}
                    type="email"
                    placeholder="jane@business.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1.5 block">Phone Number</label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1.5 block">GBP Profile URL *</label>
                <input
                  {...register("gbpUrl", { required: "Required" })}
                  placeholder="https://maps.google.com/..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-blue-500 transition-colors"
                />
                {errors.gbpUrl && <p className="text-red-400 text-xs mt-1">{errors.gbpUrl.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1.5 block">Business Type</label>
                  <input
                    {...register("businessType")}
                    placeholder="Restaurant, Retail, etc."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1.5 block">Tier Interest</label>
                  <select
                    {...register("tier")}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="" className="bg-gray-900">Select tier...</option>
                    <option value="basic" className="bg-gray-900">Basic — $200/mo</option>
                    <option value="growth" className="bg-gray-900">Growth — $500/mo</option>
                    <option value="premium" className="bg-gray-900">Premium — $1,000/mo</option>
                    <option value="unsure" className="bg-gray-900">Not sure yet</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-700 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-700/30 text-sm"
              >
                {isSubmitting ? "Submitting..." : "Get My Free Audit"}
              </button>

              <p className="text-center text-white/30 text-xs">No commitment. Results delivered in 24–48 hours.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
