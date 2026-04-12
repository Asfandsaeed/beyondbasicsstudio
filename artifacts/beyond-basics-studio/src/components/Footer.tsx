import { Link } from "wouter";
import { MapPin, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Logo col */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-700 rounded-md flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-bold text-white text-base">
                Beyond Basics<span className="text-blue-400"> Studio</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Your GBP Unfair Advantage. Helping local businesses dominate Google Maps worldwide.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Twitter" className="text-white/40 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white/40 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:hello@beyondbasics.studio" aria-label="Email" className="text-white/40 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Services</h4>
            <ul className="space-y-3">
              {["Basic Plan", "Growth Plan", "Premium Plan", "GBP Strategy", "Review Management"].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-white/50 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Careers", href: "/contact" },
                { label: "GBP Tips Blog", href: "#" },
                { label: "Privacy Policy", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@beyondbasics.studio" className="text-white/50 hover:text-white text-sm transition-colors">
                  hello@beyondbasics.studio
                </a>
              </li>
              <li className="text-white/50 text-sm">Global HQ</li>
              <li className="text-white/50 text-sm">Multiple Offices Worldwide</li>
              <li className="text-white/50 text-sm">Fully Remote for All Clients</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            &copy; 2026 Beyond Basics Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/30 hover:text-white/60 text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
