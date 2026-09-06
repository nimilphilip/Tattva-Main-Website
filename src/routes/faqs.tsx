import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/lib/faqs";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Tattva Fincorp" },
      { name: "description", content: "Answers to common questions about Tattva Fincorp loans, eligibility, repayment, NCDs, branches and customer support." },
      { property: "og:title", content: "FAQs — Tattva Fincorp" },
      { property: "og:description", content: "Answers to common Tattva Fincorp questions." },
      { property: "og:url", content: "/faqs" },
    ],
    links: [{ rel: "canonical", href: "/faqs" }],
  }),
  component: FAQsPage,
});

function FAQsPage() {
  return (
    <div>
      <PageHero eyebrow="FAQs" title="Everything you wanted to ask." subtitle="Straight answers about our loans, eligibility, repayment and support." crumbs={[{ label: "FAQs" }]} />

      <section className="py-16 md:py-24">
        <div className="container-x max-w-4xl">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`faq${i}`} className="rounded-2xl border border-border bg-card px-6">
                <AccordionTrigger className="text-left font-display font-semibold hover:no-underline py-5">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
