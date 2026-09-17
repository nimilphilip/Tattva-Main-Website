import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, ShieldCheck, ArrowRight } from "lucide-react";
import { LOANS } from "@/lib/loans";
import { Logo } from "./SiteHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="relative bg-navy-deep text-white/80 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />

      <div className="relative container-x pt-16 pb-8">
        {/* Newsletter */}
        <div className="glass rounded-3xl p-6 md:p-10 mb-14 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white">Get financial insights, weekly.</h3>
            <p className="mt-2 text-white/70">Loan tips, market updates and expert-backed guides — right in your inbox.</p>
          </div>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" required placeholder="you@example.com" className="h-12 rounded-full bg-white/10 border-white/20 text-white placeholder:text-white/50" />
            <Button className="h-12 rounded-full bg-gold text-navy-deep hover:bg-gold/90 px-6">
              Subscribe <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Logo className="h-32 w-32 md:h-40 md:w-40" />
            <p className="mt-4 text-sm text-white/70 max-w-sm">
              Tattva Fincorp Limited is an RBI-registered NBFC offering eight loan products with rapid processing, transparent pricing and genuine support across Kerala and Tamil Nadu.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" /> <span><span className="text-white font-medium">Corporate Office:</span> First Floor, Veluthamana Arcade, Civil Line Road, Chembumukku, Kochi, Kerala – 682030 · +91 484 2630090</span></div>
              <div className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" /> <span><span className="text-white font-medium">Registered Office:</span> F-1, First Floor, Balaji Castle, No. 11, Father Randy Street, RS Puram, Coimbatore, Tamil Nadu – 641002 · 0487 7110000</span></div>
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-gold" /> Toll-free 1800 1202 0200</div>
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-gold" /> info@tattvafincorp.com</div>
            </div>
            <div className="mt-6 flex items-center gap-2">
              {[
                { Icon: Facebook, href: "https://facebook.com/TattvaFincorp", label: "Facebook" },
                { Icon: Twitter, href: "https://twitter.com/tattvafincorp", label: "Twitter" },
                { Icon: Instagram, href: "https://instagram.com/tattvafincorp", label: "Instagram" },
                { Icon: Linkedin, href: "https://in.linkedin.com/company/tattvafincorp", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-gold hover:text-navy-deep transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Loans">
            {LOANS.slice(0, 6).map((l) => (
              <FooterLink key={l.slug} to="/loans/$slug" params={{ slug: l.slug }}>{l.name}</FooterLink>
            ))}
            <FooterLink to="/loans">View all →</FooterLink>
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/investor-relations">Investor Relations</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
            <FooterLink to="/csr">CSR</FooterLink>
          </FooterCol>

          <FooterCol title="Support">
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/branches">Branch Locator</FooterLink>
            <FooterLink to="/faqs">FAQs</FooterLink>
            <FooterLink to="/emi-calculator">EMI Calculator</FooterLink>
            <FooterLink to="/contact">Grievance Redressal</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/10 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-gold" />
            <span>RBI-registered NBFC · 11 branches across Kerala and Tamil Nadu</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms of Use</a>
            <a href="#" className="hover:text-gold">Fair Practices Code</a>
            <a href="#" className="hover:text-gold">Sitemap</a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-white/50">© {new Date().getFullYear()} Tattva Fincorp Limited. All rights reserved.</div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-white font-semibold mb-4 text-sm">{title}</div>
      <ul className="space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}
function FooterLink({ to, params, children }: any) {
  return (
    <li>
      <Link to={to} params={params} className="text-white/70 hover:text-gold transition">
        {children}
      </Link>
    </li>
  );
}
