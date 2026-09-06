import { Link } from "@tanstack/react-router";
import { Menu, Search, Phone, ChevronDown, X } from "lucide-react";
import { useState, useEffect } from "react";
import { LOANS } from "@/lib/loans";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { label: "About", to: "/about" },
  { label: "EMI Calculator", to: "/emi-calculator" },
  { label: "Branches", to: "/branches" },
  { label: "Investor Relations", to: "/investor-relations" },
  { label: "Careers", to: "/careers" },
  
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [loansOpen, setLoansOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top strip */}
      <div className="hidden md:block bg-navy-deep text-white/80 text-xs">
        <div className="container-x flex items-center justify-between py-2">
          <div className="flex items-center gap-4">
            <a href="tel:+914842630090" className="flex items-center gap-1.5 hover:text-gold transition">
              <Phone className="h-3 w-3" /> +91 484 2630090
            </a>
            <span className="opacity-40">|</span>
            <a href="tel:180012020200" className="hover:text-gold transition">Toll-free 1800 1202 0200</a>
            <span className="opacity-40">|</span>
            <span>Loans · Trusted · Simplified</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-gold transition">Contact</Link>
            <Link to="/faqs" className="hover:text-gold transition">FAQs</Link>
            <Link to="/news" className="hover:text-gold transition">News & Media</Link>
            <Link to="/csr" className="hover:text-gold transition">CSR</Link>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all ${
          scrolled
            ? "glass-light shadow-soft border-b border-border/60"
            : "bg-background/60 backdrop-blur"
        }`}
      >
        <div className="container-x flex h-20 md:h-24 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setLoansOpen(true)}
              onMouseLeave={() => setLoansOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition rounded-full">
                Loans <ChevronDown className="h-4 w-4" />
              </button>
              {loansOpen && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 w-[720px] pt-3">
                  <div className="bg-card border border-border rounded-2xl shadow-elevated p-4 grid grid-cols-2 gap-1">
                    {LOANS.map((loan) => (
                      <Link
                        key={loan.slug}
                        to="/loans/$slug"
                        params={{ slug: loan.slug }}
                        className="flex items-start gap-3 rounded-xl p-3 hover:bg-muted transition group"
                      >
                        <div className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${loan.color} grid place-items-center text-white`}>
                          <loan.icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-foreground group-hover:text-primary transition">{loan.name}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{loan.short}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition rounded-full"
                activeProps={{ className: "px-4 py-2 text-sm font-semibold text-primary rounded-full bg-primary/5" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden md:grid h-10 w-10 place-items-center rounded-full hover:bg-muted transition" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
            <Link to="/contact" className="hidden md:inline-flex">
              <Button variant="outline" className="rounded-full">Get a Callback</Button>
            </Link>
            <Link to="/loans">
              <Button className="rounded-full bg-gradient-brand text-white hover:opacity-95 shadow-soft">Apply Now</Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden grid h-10 w-10 place-items-center rounded-full hover:bg-muted" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] p-0">
                <MobileNav />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

function MobileNav() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-border">
        <Logo />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 pt-3 pb-1">Loans</div>
        {LOANS.map((loan) => (
          <Link key={loan.slug} to="/loans/$slug" params={{ slug: loan.slug }} className="flex items-center gap-3 rounded-xl p-3 hover:bg-muted">
            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${loan.color} grid place-items-center text-white`}>
              <loan.icon className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">{loan.name}</span>
          </Link>
        ))}
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-3 pt-4 pb-1">Company</div>
        {NAV.map((n) => (
          <Link key={n.to} to={n.to} className="block rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-muted">
            {n.label}
          </Link>
        ))}
        {[{label:"News & Media", to:"/news"},{label:"CSR", to:"/csr"},{label:"FAQs", to:"/faqs"},{label:"Contact", to:"/contact"}].map(n => (
          <Link key={n.to} to={n.to} className="block rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-muted">{n.label}</Link>
        ))}
      </div>
      <div className="p-4 border-t border-border space-y-2">
        <Link to="/loans"><Button className="w-full rounded-full bg-gradient-brand text-white">Apply Now</Button></Link>
        <a href="tel:+914842630090"><Button variant="outline" className="w-full rounded-full"><Phone className="h-4 w-4 mr-2" /> +91 484 2630090</Button></a>
      </div>
    </div>
  );
}

import logoAsset from "@/assets/tattva-logo.png.asset.json";

export function Logo({ mono = false }: { mono?: boolean }) {
  return (
    <img
      src={logoAsset.url}
      alt="Tattva Fincorp Limited"
      className={`h-14 md:h-16 w-auto object-contain ${mono ? "brightness-0 invert" : ""}`}
    />
  );
}
