import { useState, useEffect, lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Lenis from "@studio-freight/lenis";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuditModal from "@/components/AuditModal";
import CustomCursor from "@/components/CustomCursor";
import CookieBanner from "@/components/CookieBanner";
import Home from "@/pages/Home";

const Services = lazy(() => import("@/pages/Services"));
const CaseStudies = lazy(() => import("@/pages/CaseStudies"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Journal = lazy(() => import("@/pages/Journal"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Customers = lazy(() => import("@/pages/Customers"));
const Sitemap = lazy(() => import("@/pages/Sitemap"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient();

let lenisInstance: InstanceType<typeof Lenis> | null = null;

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return null;
}

function Router({ onAuditClick }: { onAuditClick: () => void }) {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <Switch>
        <Route path="/" component={() => <Home onAuditClick={onAuditClick} />} />
        <Route path="/services" component={() => <Services onAuditClick={onAuditClick} />} />
        <Route path="/case-studies" component={() => <CaseStudies onAuditClick={onAuditClick} />} />
        <Route path="/about" component={() => <About onAuditClick={onAuditClick} />} />
        <Route path="/contact" component={() => <Contact />} />
        <Route path="/journal" component={() => <Journal onAuditClick={onAuditClick} />} />
        <Route path="/privacy" component={() => <PrivacyPolicy />} />
        <Route path="/terms" component={() => <Terms />} />
        <Route path="/customers" component={() => <Customers onAuditClick={onAuditClick} />} />
        <Route path="/sitemap" component={() => <Sitemap />} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Skip Lenis on touch/mobile — native scroll is smoother and avoids forced reflows
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop />
          <CustomCursor />
          <Navbar onAuditClick={() => setModalOpen(true)} />
          <main>
            <Router onAuditClick={() => setModalOpen(true)} />
          </main>
          <Footer />
          <AuditModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
          <CookieBanner />
          <Toaster />
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
