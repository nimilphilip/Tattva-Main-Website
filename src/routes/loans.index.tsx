import { createFileRoute, Link } from "@tanstack/react-router";
import { LOANS } from "@/lib/loans";
import { PageHero } from "@/components/site/PageHero";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/loans/")({
  head: () => ({
    meta: [
      { title: "Loan Products — Tattva Fincorp" },
      { name: "description", content: "Explore Tattva Fincorp's eight loan products — two wheeler, pre-owned car, gold, personal, home, LAP, SME and business loans." },
      { property: "og:title", content: "Loan Products — Tattva Fincorp" },
      { property: "og:description", content: "Eight loan products, purpose-built for every need." },
      { property: "og:url", content: "/loans" },
    ],
    links: [{ rel: "canonical", href: "/loans" }],
  }),
  component: LoansIndex,
});

function LoansIndex() {
  return (
    <div>
      <PageHero
        eyebrow="Loans"
        title="Purpose-built loans for every milestone."
        subtitle="Eight loan products, purpose-built for every need. One promise — fast processing, transparent terms, and genuine support."
        crumbs={[{ label: "Loans" }]}
      />
      <section className="py-16 md:py-24">
        <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LOANS.map((l) => (
            <Link key={l.slug} to="/loans/$slug" params={{ slug: l.slug }} className="group rounded-3xl border border-border bg-card p-6 hover-lift relative overflow-hidden">
              <div className={`absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br ${l.color} opacity-10 group-hover:opacity-20 transition`} />
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${l.color} grid place-items-center text-white shadow-soft`}>
                <l.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-display font-bold">{l.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{l.tagline}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                {l.keyFacts.slice(0, 2).map((f) => (
                  <div key={f.label} className="rounded-xl bg-muted p-2.5">
                    <div className="text-muted-foreground">{f.label}</div>
                    <div className="font-bold text-primary">{f.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                Learn more <ChevronRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
