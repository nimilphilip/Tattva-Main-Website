import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, GraduationCap, Users, TrendingUp, Coffee, Shield, MapPin, Briefcase } from "lucide-react";
import { toast } from "sonner";

const BENEFITS = [
  { i: Heart, t: "Health that cares", d: "Comprehensive family health cover, mental wellness credits and annual health checks." },
  { i: GraduationCap, t: "Grow relentlessly", d: "Unlimited learning budget, certifications sponsorship and MBA scholarships." },
  { i: Users, t: "Family-first culture", d: "Parental leaves, work-from-anywhere weeks and childcare support." },
  { i: TrendingUp, t: "Wealth building", d: "Best-in-class comp, ESOPs, performance bonuses, and financial planning." },
  { i: Coffee, t: "Great spaces", d: "Award-winning offices, free meals, gyms and creativity rooms in every hub." },
  { i: Shield, t: "Job security", d: "Financial stability of a 12-year-old NBFC with 500+ branches and 2M+ customers." },
];

const OPENINGS = [
  { title: "Senior Product Manager — Lending", team: "Product", loc: "Mumbai / Remote", type: "Full-time" },
  { title: "Machine Learning Engineer", team: "Data & Analytics", loc: "Bengaluru", type: "Full-time" },
  { title: "Branch Manager", team: "Sales", loc: "Chennai · Kolkata · Ahmedabad", type: "Full-time" },
  { title: "Credit Risk Analyst", team: "Risk", loc: "Mumbai", type: "Full-time" },
  { title: "Customer Success Lead", team: "Operations", loc: "Hyderabad", type: "Full-time" },
  { title: "Full Stack Engineer (React / Node)", team: "Engineering", loc: "Remote — India", type: "Full-time" },
];

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Tattva Fincorp" },
      { name: "description", content: "Join Tattva Fincorp — a top workplace where empathy, ownership and impact define every day." },
      { property: "og:title", content: "Careers — Tattva Fincorp" },
      { property: "og:description", content: "Build a career that changes how India borrows." },
      { property: "og:url", content: "/careers" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: Careers,
});

function Careers() {
  return (
    <div>
      <PageHero eyebrow="Careers" title="Do the best work of your life." subtitle="Join a team building the future of Indian finance — with heart, humility and ambition." crumbs={[{ label: "Careers" }]} />

      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-14">
            <div>
              <div className="text-primary text-sm font-semibold uppercase tracking-widest">Life at Tattva</div>
              <h2 className="mt-3 text-3xl md:text-4xl font-display font-extrabold">Where careers become callings.</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">We're 3,500+ Tattvans across India — engineers, credit officers, designers, branch teams and analysts. Bound together by a single belief: the best financial products are built when we obsess over the customer.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ k: "3,500+", v: "Team members" }, { k: "45%", v: "Women in tech" }, { k: "4.6/5", v: "Glassdoor" }, { k: "Top 25", v: "Best places to work" }].map((s) => (
                <div key={s.v} className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-3xl font-display font-extrabold text-primary">{s.k}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-3xl font-display font-extrabold mb-8">Benefits that back you</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {BENEFITS.map((b) => (
              <div key={b.t} className="rounded-3xl border border-border bg-card p-6 hover-lift">
                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center"><b.i className="h-5 w-5" /></div>
                <div className="mt-4 font-display font-bold">{b.t}</div>
                <div className="mt-2 text-sm text-muted-foreground">{b.d}</div>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-display font-extrabold mb-8">Current openings</h2>
          <div className="rounded-3xl border border-border bg-card divide-y divide-border">
            {OPENINGS.map((o) => (
              <div key={o.title} className="p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-3 md:gap-6 hover:bg-muted/30 transition">
                <div className="flex-1">
                  <div className="font-display font-bold">{o.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {o.team}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {o.loc}</span>
                    <span>{o.type}</span>
                  </div>
                </div>
                <Button className="rounded-full bg-gradient-brand text-white">Apply</Button>
              </div>
            ))}
          </div>

          <div className="mt-16 grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-display font-extrabold">Don't see your role?</h2>
              <p className="mt-3 text-muted-foreground">Send us your CV — we're always keen to meet exceptional people.</p>
            </div>
            <form className="rounded-3xl border border-border bg-card p-6 space-y-3" onSubmit={(e) => { e.preventDefault(); toast.success("Application received. We'll be in touch."); }}>
              <Input required placeholder="Full name" className="h-11 rounded-xl" />
              <Input required type="email" placeholder="Email" className="h-11 rounded-xl" />
              <Input required type="tel" placeholder="Mobile" className="h-11 rounded-xl" />
              <Input placeholder="LinkedIn / portfolio URL" className="h-11 rounded-xl" />
              <Textarea placeholder="Why Tattva? Tell us in a few lines." rows={4} className="rounded-xl" />
              <Button className="w-full h-11 rounded-xl bg-gradient-brand text-white">Submit application</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
