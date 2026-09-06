import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Download, FileText, TrendingUp, Scale, Users } from "lucide-react";

const REPORTS = [
  { title: "Annual Report FY 2025-26", size: "3.2 MB" },
  { title: "Annual Report FY 2024-25", size: "2.8 MB" },
  { title: "Q2 FY26 Investor Presentation", size: "4.1 MB" },
  { title: "Q1 FY26 Earnings Release", size: "1.2 MB" },
];
const POLICIES = [
  "Fair Practices Code", "Code of Conduct", "Whistleblower Policy", "Related Party Transactions Policy",
  "Grievance Redressal Policy", "KYC & AML Policy", "Interest Rate Policy",
];
const NCD = [
  { series: "NCD Series XII", tenure: "36 months", rate: "9.25%", status: "Live" },
  { series: "NCD Series XI", tenure: "60 months", rate: "9.75%", status: "Closed" },
  { series: "NCD Series X", tenure: "24 months", rate: "8.85%", status: "Closed" },
];

export const Route = createFileRoute("/investor-relations")({
  head: () => ({
    meta: [
      { title: "Investor Relations — Tattva Fincorp" },
      { name: "description", content: "Annual reports, financial statements, NCD information, governance and regulatory documents." },
      { property: "og:title", content: "Investor Relations — Tattva Fincorp" },
      { property: "og:description", content: "Reports, NCDs, governance and compliance." },
      { property: "og:url", content: "/investor-relations" },
    ],
    links: [{ rel: "canonical", href: "/investor-relations" }],
  }),
  component: IR,
});

function IR() {
  return (
    <div>
      <PageHero eyebrow="Investor Relations" title="Transparency, always." subtitle="Reports, disclosures, NCDs and governance — all in one place." crumbs={[{ label: "Investor Relations" }]} />

      <section className="py-16 md:py-24">
        <div className="container-x grid md:grid-cols-3 gap-6 mb-14">
          {[
            { i: TrendingUp, k: "₹45,000 Cr", v: "AUM" },
            { i: Scale, k: "AAA", v: "Credit Rating" },
            { i: Users, k: "2M+", v: "Customers Served" },
          ].map((s) => (
            <div key={s.v} className="rounded-3xl bg-gradient-brand text-white p-8 shadow-soft">
              <s.i className="h-6 w-6 text-gold" />
              <div className="mt-4 text-4xl font-display font-extrabold">{s.k}</div>
              <div className="mt-1 text-white/70 text-sm">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card title="Annual reports & financials">
            <div className="space-y-3">
              {REPORTS.map((r) => (
                <div key={r.title} className="flex items-center justify-between gap-3 rounded-2xl border border-border p-4 hover-lift">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><FileText className="h-5 w-5" /></div>
                    <div>
                      <div className="font-semibold text-sm">{r.title}</div>
                      <div className="text-xs text-muted-foreground">PDF · {r.size}</div>
                    </div>
                  </div>
                  <button className="h-9 w-9 grid place-items-center rounded-full bg-primary text-white hover:bg-primary/90 transition" aria-label="Download"><Download className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          </Card>

          <Card title="NCD information">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="py-3">Series</th><th>Tenure</th><th>Coupon</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {NCD.map((n) => (
                    <tr key={n.series} className="border-b border-border last:border-0">
                      <td className="py-3 font-semibold">{n.series}</td>
                      <td>{n.tenure}</td>
                      <td className="text-primary font-semibold">{n.rate}</td>
                      <td><span className={`text-xs px-2 py-1 rounded-full ${n.status === "Live" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>{n.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="Corporate governance & policies">
            <div className="grid sm:grid-cols-2 gap-2">
              {POLICIES.map((p) => (
                <a key={p} href="#" className="flex items-center gap-2 rounded-xl border border-border p-3 hover:bg-muted transition text-sm">
                  <FileText className="h-4 w-4 text-primary" /> {p}
                </a>
              ))}
            </div>
          </Card>

          <Card title="Shareholder information">
            <dl className="space-y-3 text-sm">
              {[
                ["Registrar & Transfer Agent", "KFin Technologies Ltd."],
                ["Listed on", "BSE, NSE"],
                ["ISIN", "INE000A01000"],
                ["Investor grievance email", "investors@tattvafincorp.com"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-border pb-3 last:border-0">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-semibold text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </section>
    </div>
  );
}

function Card({ title, children }: any) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <h3 className="text-xl font-display font-bold mb-5">{title}</h3>
      {children}
    </div>
  );
}
