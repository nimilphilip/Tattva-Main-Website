import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Calendar, Play, Image as ImageIcon, FileText } from "lucide-react";

const PRESS = [
  { d: "Nov 28, 2026", t: "Tattva Fincorp reports 42% YoY growth in Q2 FY27" },
  { d: "Nov 15, 2026", t: "Tattva rated AAA by CRISIL for 4th consecutive year" },
  { d: "Oct 30, 2026", t: "Tattva launches ₹500 Cr NCD Series XII" },
  { d: "Oct 04, 2026", t: "Tattva Fincorp opens its 500th branch in Vizag" },
];
const EVENTS = [
  { d: "Dec 12, 2026", t: "India Finance Summit — Panel by CEO Aarav Mehta" },
  { d: "Jan 20, 2027", t: "MSME Growth Conclave — Bengaluru" },
  { d: "Feb 05, 2027", t: "Q3 FY27 Earnings Call" },
];

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Media — Tattva Fincorp" },
      { name: "description", content: "Press releases, company news, events, videos and media kit for Tattva Fincorp." },
      { property: "og:title", content: "News & Media — Tattva Fincorp" },
      { property: "og:description", content: "Press, events, media and gallery." },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: News,
});

function News() {
  return (
    <div>
      <PageHero eyebrow="Newsroom" title="News, press and events." subtitle="What we're building, celebrating and speaking about." crumbs={[{ label: "News & Media" }]} />

      <section className="py-16 md:py-24">
        <div className="container-x grid lg:grid-cols-2 gap-6">
          <Card icon={FileText} title="Press releases">
            <ul className="divide-y divide-border">
              {PRESS.map((p) => (
                <li key={p.t} className="py-4 flex items-start gap-4">
                  <div className="shrink-0 rounded-xl bg-primary/5 text-primary p-2 text-center min-w-[70px]">
                    <div className="text-[10px] uppercase">{p.d.split(",")[0]}</div>
                    <div className="text-sm font-bold">{p.d.split(",")[1]}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{p.t}</div>
                    <a href="#" className="text-xs text-primary hover:underline">Read full release →</a>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card icon={Calendar} title="Upcoming events">
            <ul className="divide-y divide-border">
              {EVENTS.map((p) => (
                <li key={p.t} className="py-4 flex items-start gap-4">
                  <div className="shrink-0 rounded-xl bg-gold/10 text-gold p-2 text-center min-w-[70px]">
                    <div className="text-[10px] uppercase">{p.d.split(",")[0]}</div>
                    <div className="text-sm font-bold">{p.d.split(",")[1]}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{p.t}</div>
                    <a href="#" className="text-xs text-primary hover:underline">Add to calendar →</a>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card icon={Play} title="Videos">
            <div className="grid sm:grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-video rounded-2xl bg-gradient-to-br from-primary to-navy-deep relative grid place-items-center overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <div className="h-14 w-14 rounded-full bg-white/90 grid place-items-center group-hover:scale-110 transition"><Play className="h-6 w-6 text-primary ml-0.5" /></div>
                </div>
              ))}
            </div>
          </Card>

          <Card icon={ImageIcon} title="Media gallery">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={`aspect-square rounded-xl bg-gradient-to-br ${["from-primary to-gold","from-navy-deep to-primary","from-gold to-primary","from-primary to-navy","from-gold to-primary","from-primary to-gold","from-primary to-navy-deep","from-gold to-primary","from-primary to-gold"][i]}`} />
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

function Card({ icon: Icon, title, children }: any) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><Icon className="h-5 w-5" /></div>
        <h3 className="text-xl font-display font-bold">{title}</h3>
      </div>
      {children}
    </div>
  );
}
