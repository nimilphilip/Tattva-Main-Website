import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { BRANCHES, CONTACT } from "@/lib/branches";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "Branch Locator — Tattva Fincorp" },
      { name: "description", content: "Find your nearest Tattva Fincorp branch across 11 locations in Kerala and Tamil Nadu." },
      { property: "og:title", content: "Branch Locator — Tattva Fincorp" },
      { property: "og:description", content: "11 branches across Kerala and Tamil Nadu." },
      { property: "og:url", content: "/branches" },
    ],
    links: [{ rel: "canonical", href: "/branches" }],
  }),
  component: Branches,
});

function Branches() {
  return (
    <div>
      <PageHero eyebrow="Branch Locator" title="11 branches. Kerala and Tamil Nadu." subtitle="Search by city or PIN code, or walk into the branch closest to you." crumbs={[{ label: "Branches" }]} />

      <section className="py-16 md:py-24">
        <div className="container-x grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-border bg-card p-6 space-y-3">
              <div className="text-sm font-semibold text-muted-foreground">Search branches</div>
              <Input placeholder="Enter city or PIN code" className="h-12 rounded-xl" />
              <select className="w-full h-12 rounded-xl border border-input bg-background px-3 text-sm">
                <option>All states</option>
                <option>Kerala</option><option>Tamil Nadu</option>
              </select>
              <Button className="w-full h-12 rounded-xl bg-gradient-brand text-white">Find branches</Button>
            </div>
            <div className="space-y-3">
              {BRANCHES.map((b) => (
                <div key={b.city} className="rounded-2xl border border-border bg-card p-5 hover-lift">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display font-bold">{b.city}{b.label ? ` — ${b.label}` : ""}</div>
                      <div className="text-sm text-muted-foreground mt-1 flex items-start gap-1.5"><MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {b.addr}</div>
                      <div className="mt-2 text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {b.label === "Registered Office" ? CONTACT.registeredPhone : CONTACT.corporatePhone}</div>
                        <div className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {b.hours}</div>
                      </div>
                    </div>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Tattva Fincorp ${b.addr}`)}`} target="_blank" rel="noreferrer" className="shrink-0 h-9 w-9 rounded-full bg-primary/10 text-primary grid place-items-center hover:bg-primary hover:text-white transition" aria-label="Directions"><Navigation className="h-4 w-4" /></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="sticky top-28 rounded-3xl border border-border bg-gradient-to-br from-primary/5 to-gold/10 bg-dots h-[600px] grid place-items-center overflow-hidden">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto" />
                <div className="mt-4 font-display font-bold text-2xl">Interactive Map</div>
                <div className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto px-4">Explore all 11 Tattva branches across Kerala and Tamil Nadu. Working hours: 9:00 AM – 5:30 PM (Kerala) · 9:30 AM – 6:00 PM (Tamil Nadu).</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
