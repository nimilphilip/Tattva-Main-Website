import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { EmiCalculator } from "@/components/site/EmiCalculator";

export const Route = createFileRoute("/emi-calculator")({
  head: () => ({
    meta: [
      { title: "EMI Calculator — Tattva Fincorp" },
      { name: "description", content: "Calculate your loan EMI instantly. See monthly EMI, total interest and repayment breakdown for any loan amount, rate and tenure." },
      { property: "og:title", content: "EMI Calculator — Tattva Fincorp" },
      { property: "og:description", content: "Calculate your loan EMI instantly." },
      { property: "og:url", content: "/emi-calculator" },
    ],
    links: [{ rel: "canonical", href: "/emi-calculator" }],
  }),
  component: EmiPage,
});

function EmiPage() {
  return (
    <div>
      <PageHero eyebrow="EMI Calculator" title="Plan every rupee. Confidently." subtitle="Play with amount, rate and tenure to see exactly what your EMI will be." crumbs={[{ label: "EMI Calculator" }]} />
      <section className="py-16 md:py-24">
        <div className="container-x max-w-5xl">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-10 shadow-soft">
            <EmiCalculator />
          </div>
        </div>
      </section>
    </div>
  );
}
