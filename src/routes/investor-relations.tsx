import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Download, FileText, TrendingUp, Scale, Users, ShieldCheck, Lock } from "lucide-react";
import {
  getStoredDocuments,
  subscribeDocuments,
  downloadDocument,
  type IRDocument,
} from "@/lib/ir-documents";

const NCD = [
  { series: "NCD Series XII", tenure: "36 months", rate: "9.25%", status: "Live" },
  { series: "NCD Series XI", tenure: "60 months", rate: "9.75%", status: "Closed" },
  { series: "NCD Series X", tenure: "24 months", rate: "8.85%", status: "Closed" },
];

function Card({ title, children }: any) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-soft">
      <h3 className="text-xl font-display font-bold mb-5 text-foreground">{title}</h3>
      {children}
    </div>
  );
}

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
  const [docs, setDocs] = useState<IRDocument[]>([]);

  useEffect(() => {
    setDocs(getStoredDocuments());
    const unsub = subscribeDocuments(() => {
      setDocs(getStoredDocuments());
    });
    return unsub;
  }, []);

  const reports = docs.filter((d) => d.category === "reports");
  const policies = docs.filter((d) => d.category === "policies");

  return (
    <div>
      <PageHero
        eyebrow="Investor Relations"
        title="Transparency, always."
        subtitle="Reports, disclosures, NCDs and governance — all in one place."
        crumbs={[{ label: "Investor Relations" }]}
      />

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
              {reports.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-3 rounded-2xl border border-border p-4 hover-lift">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm truncate">{r.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {r.financialYear ? `${r.financialYear} · ` : ""}PDF · {r.size}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => downloadDocument(r)}
                    className="h-9 w-9 grid place-items-center rounded-full bg-primary text-white hover:bg-primary/90 transition shrink-0"
                    aria-label={`Download ${r.title}`}
                    title="Download document"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {reports.length === 0 && (
                <p className="text-sm text-muted-foreground p-4 text-center">No reports published yet.</p>
              )}
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
              {policies.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => downloadDocument(p)}
                  className="flex items-center justify-between gap-2 rounded-xl border border-border p-3 hover:bg-muted transition text-sm text-left group"
                >
                  <span className="flex items-center gap-2 truncate">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    <span className="truncate">{p.title}</span>
                  </span>
                  <Download className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition shrink-0 opacity-70 group-hover:opacity-100" />
                </button>
              ))}
              {policies.length === 0 && (
                <p className="text-sm text-muted-foreground p-4 text-center col-span-2">No policies listed yet.</p>
              )}
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

        {/* Authorized Admin Access Link */}
        <div className="mt-14 pt-8 border-t border-border flex justify-center">
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition px-4 py-2 rounded-full border border-border bg-card shadow-sm hover:border-primary/40"
          >
            <Lock className="h-3.5 w-3.5 text-gold" />
            <span>Staff Portal: Document Management Login</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

