import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { GraduationCap, Heart, Leaf, Users } from "lucide-react";

const PROGS = [
  { i: GraduationCap, t: "Education for all", d: "Funded 250+ schools and 12,000 scholarships across rural India.", color: "from-blue-500 to-indigo-600" },
  { i: Heart, t: "Health & wellness", d: "5 mobile health clinics reaching 400 villages every month.", color: "from-rose-500 to-pink-600" },
  { i: Leaf, t: "Environment", d: "Planted 1M+ trees; 100% renewable energy in HO and 60% of branches.", color: "from-emerald-500 to-teal-600" },
  { i: Users, t: "Financial literacy", d: "Trained 2 lakh+ women in personal finance across 8 states.", color: "from-amber-400 to-yellow-600" },
];

export const Route = createFileRoute("/csr")({
  head: () => ({
    meta: [
      { title: "CSR — Tattva Fincorp" },
      { name: "description", content: "Tattva Fincorp's community, education, healthcare and environmental initiatives." },
      { property: "og:title", content: "CSR — Tattva Fincorp" },
      { property: "og:description", content: "Community impact across education, health and environment." },
      { property: "og:url", content: "/csr" },
    ],
    links: [{ rel: "canonical", href: "/csr" }],
  }),
  component: CSR,
});

function CSR() {
  return (
    <div>
      <PageHero eyebrow="CSR" title="Beyond finance. Building futures." subtitle="Through Tattva Foundation, 3% of our profits go into education, health, environment and financial inclusion." crumbs={[{ label: "CSR" }]} />
      <section className="py-16 md:py-24">
        <div className="container-x grid md:grid-cols-2 gap-6">
          {PROGS.map((p) => (
            <div key={p.t} className="rounded-3xl border border-border bg-card p-8 hover-lift">
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${p.color} text-white grid place-items-center shadow-soft`}><p.i className="h-6 w-6" /></div>
              <h3 className="mt-4 text-xl font-display font-bold">{p.t}</h3>
              <p className="mt-2 text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
        <div className="container-x mt-14 rounded-3xl bg-gradient-brand text-white p-10 md:p-14 grid md:grid-cols-3 gap-6 shadow-elevated relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          {[{ k: "250+", v: "Schools funded" }, { k: "1M+", v: "Trees planted" }, { k: "2L+", v: "Women trained in finance" }].map((s) => (
            <div key={s.v} className="relative">
              <div className="text-5xl font-display font-extrabold text-gold">{s.k}</div>
              <div className="mt-1 text-white/80">{s.v}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
