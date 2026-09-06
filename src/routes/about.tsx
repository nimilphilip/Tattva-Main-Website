import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Heart, Target, Users, Sparkles, ShieldCheck, MapPin, Building2, Handshake } from "lucide-react";
import { LOANS } from "@/lib/loans";
import { BRANCHES } from "@/lib/branches";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tattva Fincorp — RBI-registered NBFC in Kerala & Tamil Nadu" },
      { name: "description", content: "Tattva Fincorp Limited is an RBI-registered NBFC offering eight loan products through 11 branches across Kerala and Tamil Nadu — loans, trusted and simplified." },
      { property: "og:title", content: "About Tattva Fincorp" },
      { property: "og:description", content: "An RBI-registered NBFC built on trust, speed and transparent lending." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const VALUES = [
  { icon: Heart, title: "Customer first", body: "Every product and policy starts with what is fair and genuinely helpful for the borrower." },
  { icon: Sparkles, title: "Transparency", body: "Clear terms, clearly explained charges and no surprises after disbursal." },
  { icon: Target, title: "Work ethic", body: "Exceptional work ethics and disciplined credit practices guide every decision we make." },
  { icon: Users, title: "Local relationships", body: "Branch teams who know their neighbourhoods and stay with you through the loan." },
];

function About() {
  const kerala = BRANCHES.filter((b) => b.state === "Kerala").length;
  const tamilNadu = BRANCHES.length - kerala;

  return (
    <div>
      <PageHero
        eyebrow="About Tattva"
        title="Loans, trusted and simplified."
        subtitle="Tattva Fincorp Limited is an RBI-registered non-banking financial company serving individuals and small businesses across Kerala and Tamil Nadu."
        crumbs={[{ label: "About Us" }]}
      />

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-primary text-sm font-semibold uppercase tracking-widest">Our story</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-extrabold">Credit that respects your time.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Tattva Fincorp Limited is a non-banking financial company registered with the Reserve Bank of India.
              We offer a focused set of {LOANS.length} loan products — from two wheeler and pre-owned car loans to
              gold, personal, home, property, SME and business loans — designed around fast processing, simple
              documentation and terms that are explained upfront.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our corporate office is in Kochi and our registered office is in Coimbatore, supported by a branch
              network across Kerala and Tamil Nadu where customers can walk in and speak to a real person.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: `${BRANCHES.length}`, v: "Branches" },
              { k: `${LOANS.length}`, v: "Loan products" },
              { k: `${kerala}`, v: "Branches in Kerala" },
              { k: `${tamilNadu}`, v: "Branches in Tamil Nadu" },
            ].map((s) => (
              <div key={s.v} className="rounded-3xl bg-gradient-brand text-white p-6 shadow-soft">
                <div className="text-3xl md:text-4xl font-display font-extrabold">{s.k}</div>
                <div className="mt-1 text-white/80 text-sm">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="py-16 md:py-24 bg-surface">
        <div className="container-x grid md:grid-cols-2 gap-6">
          {[
            { t: "Our Vision", d: "To be a trusted financial partner that makes borrowing simple, fair and accessible for every customer we serve.", i: Target },
            { t: "Our Mission", d: "To deliver reliable credit through exceptional work ethics, a customer-centric approach and transparent, timely service.", i: Handshake },
          ].map((b) => (
            <div key={b.t} className="rounded-3xl border border-border bg-card p-8 hover-lift">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center"><b.i className="h-6 w-6" /></div>
              <h3 className="mt-5 text-2xl font-display font-bold">{b.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Section title="Core values" subtitle="The non-negotiables that define how we work.">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-3xl border border-border bg-card p-6 hover-lift">
              <div className="h-11 w-11 rounded-xl bg-gradient-gold text-navy-deep grid place-items-center"><v.icon className="h-5 w-5" /></div>
              <h3 className="mt-4 font-display font-bold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="py-16 md:py-24 bg-surface">
        <div className="container-x grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-border bg-card p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center text-primary"><Building2 className="h-5 w-5" /></div>
              <h3 className="text-xl font-display font-bold">Corporate Office</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              First Floor, Veluthamana Arcade, Civil Line Road, Chembumukku, Kochi, Kerala – 682030
            </p>
            <p className="mt-2 text-sm font-semibold text-primary">+91 484 2630090</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-gold grid place-items-center"><MapPin className="h-5 w-5 text-navy-deep" /></div>
              <h3 className="text-xl font-display font-bold">Registered Office</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              F-1, First Floor, Balaji Castle, No. 11, Father Randy Street, RS Puram, Coimbatore, Tamil Nadu – 641002
            </p>
            <p className="mt-2 text-sm font-semibold text-primary">0487 7110000</p>
          </div>
        </div>
      </section>

      <Section>
        <div className="rounded-3xl bg-gradient-brand text-white p-10 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="relative max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-white/90">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" /> RBI-registered NBFC
            </div>
            <h2 className="mt-5 text-3xl md:text-4xl font-display font-extrabold">Talk to a Tattva branch near you.</h2>
            <p className="mt-3 text-white/80">Walk in, call us on 1800 1202 0200, or explore our loan products online.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/branches" className="rounded-xl bg-gold text-navy-deep px-6 py-3 font-semibold hover:opacity-90 transition">Find a branch</Link>
              <Link to="/loans" className="rounded-xl glass px-6 py-3 font-semibold text-white hover:bg-white/20 transition">View loan products</Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({ title, subtitle, children }: any) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        {title && (
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold">{title}</h2>
            {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
