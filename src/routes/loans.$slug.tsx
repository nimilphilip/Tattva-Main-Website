import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findLoan, LOANS, type Loan } from "@/lib/loans";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EmiCalculator } from "@/components/site/EmiCalculator";
import { toast } from "sonner";
import { CheckCircle2, ArrowRight, Sparkles, FileText, ShieldCheck, Clock } from "lucide-react";

export const Route = createFileRoute("/loans/$slug")({
  loader: ({ params }) => {
    const loan = findLoan(params.slug);
    if (!loan) throw notFound();
    return { loan };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Loan — Tattva Fincorp" }, { name: "robots", content: "noindex" }] };
    const { loan } = loaderData;
    const url = `/loans/${loan.slug}`;
    return {
      meta: [
        { title: `${loan.name} — Tattva Fincorp` },
        { name: "description", content: `${loan.name} from Tattva Fincorp — ${loan.tagline}` },
        { property: "og:title", content: `${loan.name} — Tattva Fincorp` },
        { property: "og:description", content: loan.tagline },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: LoanPage,
});

function LoanPage() {
  const { loan } = Route.useLoaderData() as { loan: Loan };
  const related = LOANS.filter((l) => l.slug !== loan.slug).slice(0, 3);
  const Icon = loan.icon;

  return (
    <div>
      <PageHero
        eyebrow={loan.name}
        title={loan.short}
        subtitle={loan.tagline}
        crumbs={[{ label: "Loans", to: "/loans" }, { label: loan.name }]}
      />

      {/* Highlights bar */}
      <section className="-mt-10 relative z-10 container-x">
        <div className="rounded-3xl bg-card border border-border shadow-elevated p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {loan.keyFacts.map((f) => (
            <Stat key={f.label} label={f.label} value={f.value} />
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-14">
            <Block title="Overview" icon={Sparkles}>
              <p className="text-muted-foreground leading-relaxed">
                Our {loan.name.toLowerCase()} is designed to help you move forward, faster. Backed by transparent pricing, digital-first processing and a service team that treats you like family — you get funding that fits your life.
              </p>
            </Block>

            <Block title="Features" icon={Sparkles}>
              <ul className="grid md:grid-cols-2 gap-3">
                {loan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 rounded-xl bg-muted p-4">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" /> <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Benefits" icon={ShieldCheck}>
              <ul className="space-y-3">
                {loan.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${loan.color} grid place-items-center text-white shrink-0`}>
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="pt-1 text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <div className="grid md:grid-cols-2 gap-6">
              <Block title="Eligibility" icon={Clock}>
                <ul className="space-y-2 text-sm">
                  {loan.eligibility.map((e) => (
                    <li key={e} className="flex gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" /> {e}</li>
                  ))}
                </ul>
              </Block>
              <Block title="Documents" icon={FileText}>
                <ul className="space-y-2 text-sm">
                  {loan.documents.map((d) => (
                    <li key={d} className="flex gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold mt-2 shrink-0" /> {d}</li>
                  ))}
                </ul>
              </Block>
            </div>

            <Block title="Calculate your EMI" icon={Sparkles}>
              <div className="rounded-2xl border border-border bg-card p-6"><EmiCalculator /></div>
            </Block>

            <Block title="Frequently asked" icon={Sparkles}>
              <Accordion type="single" collapsible className="space-y-3">
                {loan.faqs.map((f, i) => (
                  <AccordionItem key={i} value={`f${i}`} className="rounded-2xl border border-border bg-card px-5">
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Block>
          </div>

          {/* Sticky apply form */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <ApplyForm loanName={loan.name} loanColor={loan.color} Icon={Icon} />
              <div className="rounded-3xl border border-border bg-card p-6">
                <div className="font-display font-bold mb-4">Related loans</div>
                <div className="space-y-3">
                  {related.map((r) => (
                    <Link to="/loans/$slug" params={{ slug: r.slug }} key={r.slug} className="flex items-center gap-3 rounded-xl p-2 hover:bg-muted transition">
                      <div className={`h-9 w-9 rounded-lg bg-gradient-to-br ${r.color} grid place-items-center text-white shrink-0`}>
                        <r.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">{r.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{r.short}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
      <div className="mt-1 text-xl md:text-2xl font-display font-extrabold text-primary">{value}</div>
    </div>
  );
}
function Block({ title, icon: Icon, children }: any) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center"><Icon className="h-4 w-4" /></div>
        <h2 className="text-2xl font-display font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}
function ApplyForm({ loanName, loanColor, Icon }: any) {
  return (
    <div className="rounded-3xl overflow-hidden border border-border shadow-elevated bg-card">
      <div className={`bg-gradient-to-br ${loanColor} p-5 text-white`}>
        <div className="flex items-center gap-2"><Icon className="h-5 w-5" /> <div className="font-semibold">Apply for {loanName}</div></div>
        <div className="text-xs text-white/80 mt-1">Get an instant in-principle decision.</div>
      </div>
      <form className="p-5 space-y-3" onSubmit={(e) => { e.preventDefault(); toast.success("Application received. We'll call you back within 30 minutes."); }}>
        <Input required placeholder="Full name" className="h-11 rounded-xl" />
        <Input required type="tel" placeholder="Mobile number" pattern="[0-9]{10}" className="h-11 rounded-xl" />
        <Input required type="email" placeholder="Email address" className="h-11 rounded-xl" />
        <Input required type="number" placeholder="Loan amount (₹)" className="h-11 rounded-xl" />
        <Input placeholder="City" className="h-11 rounded-xl" />
        <Button className="w-full h-11 rounded-xl bg-gradient-brand text-white font-semibold">Apply Now <ArrowRight className="h-4 w-4 ml-1" /></Button>
        <p className="text-[11px] text-muted-foreground text-center">By clicking Apply Now, you agree to our Terms & Privacy Policy.</p>
      </form>
    </div>
  );
}
