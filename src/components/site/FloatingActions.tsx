import { useEffect, useState } from "react";
import { PhoneCall, ArrowUp, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Sticky bottom bar on mobile */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-background/95 backdrop-blur border-t border-border shadow-elevated">
        <div className="grid grid-cols-3 gap-2 p-2">
          <a href="tel:+914842630090" className="rounded-xl bg-muted text-sm py-2.5 font-medium text-center">Call</a>
          <Link to="/emi-calculator" className="rounded-xl bg-muted text-sm py-2.5 font-medium text-center">EMI</Link>
          <Link to="/loans" className="rounded-xl bg-gradient-brand text-white text-sm py-2.5 font-semibold text-center">Apply Now</Link>
        </div>
      </div>

      {/* Floating stack (desktop) */}
      <div className="fixed right-4 md:right-6 bottom-24 md:bottom-6 z-40 flex flex-col items-end gap-3">
        <a
          href="tel:+914842630090"
          aria-label="Call Tattva Fincorp"
          className="group h-14 w-14 grid place-items-center rounded-full bg-gradient-brand text-white shadow-elevated hover:scale-105 transition"
        >
          <PhoneCall className="h-6 w-6" />
        </a>
        <a
          href="mailto:info@tattvafincorp.com"
          aria-label="Email Tattva Fincorp"
          className="hidden md:grid h-14 w-14 place-items-center rounded-full bg-card border border-border text-primary shadow-elevated hover:scale-105 transition"
        >
          <Mail className="h-6 w-6" />
        </a>
        {show && (
          <button
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="h-11 w-11 grid place-items-center rounded-full bg-card border border-border shadow-soft hover:bg-muted transition"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        )}
      </div>
    </>
  );
}
