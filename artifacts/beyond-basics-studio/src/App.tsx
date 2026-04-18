import { useState, useEffect } from "react";
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
import Services from "@/pages/Services";
import CaseStudies from "@/pages/CaseStudies";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import Journal from "@/pages/Journal";
import Sitemap from "@/pages/Sitemap";
import Customers from "@/pages/Customers";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

// Module-level ref so ScrollToTop can use lenis.scrollTo without prop-drilling
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
  );
}

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  // Smooth scroll via Lenis — store instance so ScrollToTop can use it
  useEffect(() => {
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
