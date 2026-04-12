import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: "var(--sp-white)" }}>
      <p className="label mb-6">404</p>
      <h1 className="font-serif leading-tight text-center mb-6" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "var(--sp-black)" }}>
        Page not found.
      </h1>
      <p className="font-sans text-sm mb-10 text-center max-w-xs" style={{ color: "var(--sp-gray)" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn btn-black">
        Back to Home <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
