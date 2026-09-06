import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ShieldCheck, Zap, BadgePercent, MapPin,
  ChevronRight, Search, TrendingUp, HeadphonesIcon,
  CheckCircle2, FileText, Wallet, Sparkles,
} from "lucide-react";
import { LOANS } from "@/lib/loans";
import { BRANCHES } from "@/lib/branches";
import { FAQS } from "@/lib/faqs";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { EmiCalculator } from "@/components/site/EmiCalculator";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tattva Fincorp — Loans, Trusted. Simplified." },
      { name: "description", content: "Personal, business, gold, home, vehicle and SME loans from a leading Indian NBFC. Fast approvals, transparent pricing, trusted service." },
      { property: "og:title", content: "Tattva Fincorp — Loans, Trusted. Simplified." },
      { property: "og:description", content: "Personal, business, gold, home, vehicle and SME loans from a leading Indian NBFC. Fast approvals, transparent pricing, trusted service." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      <Hero />
      <TrustStrip />
      <Products />
      <WhyChoose />
      <Stats />
      <Process />
      <EmiSection />


      
      <CtaBanner />
      <BranchPreview />
      <Faqs />
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const [loan, setLoan] = useState("personal-loan");
  const [amount, setAmount] = useState("500000");
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/4 -left-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/30 blur-3xl" />

      <div className="relative container-x pt-14 md:pt-20 pb-20 md:pb-28 grid lg:grid-cols-2 gap-10 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-white/90 mb-5">
            <Sparkles className="h-3 w-3 text-gold" /> RBI Registered NBFC · Loans · Trusted · Simplified
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold tracking-tight leading-[1.05]">
            Loans made <br />
            <span className="text-gradient-gold">effortlessly</span> yours.
          </h1>
          <p className="mt-6 text-lg text-white/80 max-w-lg leading-relaxed">
            From gold to growth capital, discover finance that feels human — with rapid processing, transparent pricing, and a partner that grows with you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/loans"><Button size="lg" className="rounded-full bg-gold text-navy-deep hover:bg-gold/90 font-semibold h-12 px-7">Apply Now <ArrowRight className="h-4 w-4 ml-1.5" /></Button></Link>
            <Link to="/emi-calculator"><Button size="lg" variant="outline" className="rounded-full h-12 px-7 border-white/30 bg-white/5 text-white hover:bg-white/10">Calculate EMI</Button></Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> RBI Registered NBFC</div>
            <div className="flex items-center gap-2"><Zap className="h-4 w-4 text-gold" /> Rapid processing</div>
            <div className="flex items-center gap-2"><BadgePercent className="h-4 w-4 text-gold" /> No hidden charges</div>
          </div>
        </div>

        {/* Loan search card */}
        <div className="relative animate-fade-up">
          <div className="absolute -inset-1 bg-gradient-gold rounded-3xl blur opacity-40" />
          <div className="relative glass-light rounded-3xl p-6 md:p-7 text-foreground shadow-elevated">
            <div className="flex items-center gap-2 mb-1 text-primary text-sm font-semibold uppercase tracking-wider">
              <Search className="h-4 w-4" /> Find your perfect loan
            </div>
            <h3 className="text-2xl font-display font-bold">In under 30 seconds.</h3>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Loan type</label>
                <select value={loan} onChange={(e) => setLoan(e.target.value)} className="mt-1 w-full h-12 rounded-xl border border-input bg-background px-4 text-sm">
                  {LOANS.map((l) => <option key={l.slug} value={l.slug}>{l.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Amount (₹)</label>
                  <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-1 h-12 rounded-xl" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">City</label>
                  <Input placeholder="e.g. Kochi" className="mt-1 h-12 rounded-xl" />
                </div>
              </div>
              <Link to="/loans/$slug" params={{ slug: loan }}>
                <Button className="w-full h-12 rounded-xl bg-gradient-brand text-white font-semibold hover:opacity-95">Check Eligibility <ArrowRight className="h-4 w-4 ml-1.5" /></Button>
              </Link>
              <div className="text-xs text-muted-foreground text-center">By continuing, you agree to our <a className="underline" href="#">Terms</a> and <a className="underline" href="#">Privacy Policy</a>.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust strip ---------- */
function TrustStrip() {
  const items = ["RBI Registered NBFC", "Rapid processing", "Transparent pricing", "11 branches in Kerala & Tamil Nadu", "8 loan products", "Customer-first service"];
  return (
    <div className="bg-surface border-y border-border">
      <div className="container-x flex items-center gap-8 py-5 overflow-x-auto text-sm text-muted-foreground">
        {items.map((t) => (
          <div key={t} className="flex items-center gap-2 shrink-0">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span className="font-medium">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Products ---------- */
function Products() {
  return (
    <Section eyebrow="Loan Products" title="Loans, purpose-built for every need." subtitle="Eight loan products. One promise — fast processing, transparent terms, and genuine support.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {LOANS.map((l) => (
          <Link key={l.slug} to="/loans/$slug" params={{ slug: l.slug }} className="group relative rounded-3xl border border-border bg-card p-6 hover-lift overflow-hidden">
            <div className={`absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br ${l.color} opacity-10 group-hover:opacity-20 transition`} />
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${l.color} grid place-items-center text-white shadow-soft`}>
              <l.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-display font-bold text-foreground">{l.name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{l.tagline}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              {l.keyFacts.slice(0, 2).map((f) => (
                <div key={f.label}>{f.label}: <span className="text-primary font-semibold">{f.value}</span></div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
              Learn more <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Why choose ---------- */
function WhyChoose() {
  const items = [
    { icon: Zap, title: "Rapid processing", body: "Quick eligibility checks and fast disbursal across every product." },
    { icon: BadgePercent, title: "Transparent pricing", body: "No hidden charges, ever — every cost is disclosed upfront." },
    { icon: MapPin, title: "Wide reach", body: "11 branches across Kerala and Tamil Nadu, from Thiruvananthapuram to Madurai." },
    { icon: HeadphonesIcon, title: "Customer-first", body: "Built on a mission of exceptional work ethics and a customer centric approach." },
    { icon: ShieldCheck, title: "Secure by design", body: "Your information is handled carefully and governed by our privacy policy." },
    { icon: TrendingUp, title: "Flexible tenures", body: "Repayment options tailored to each loan type, from 30-day gold loans to long-tenure home loans." },
  ];
  return (
    <Section eyebrow="Why Tattva" title="Rapid, transparent, and genuinely local." subtitle="Six reasons borrowers across Kerala and Tamil Nadu choose us — and stay with us.">

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it) => (
          <div key={it.title} className="rounded-3xl border border-border bg-card p-6 hover-lift">
            <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary grid place-items-center">
              <it.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display font-bold text-lg">{it.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Stats ---------- */
function Stats() {
  const stats = [
    { n: 11, s: "", label: "Branches across Kerala & Tamil Nadu" },
    { n: 8, s: "", label: "Loan products under one roof" },
    { n: 2, s: "", label: "States served" },
  ];
  return (
    <section className="relative py-20 md:py-28 bg-gradient-brand text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
      <div className="relative container-x">
        <div className="max-w-2xl">
          <div className="text-gold text-sm font-semibold uppercase tracking-widest">By the numbers</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-display font-extrabold">Close to you, across Kerala and Tamil Nadu.</h2>
        </div>
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((st) => <Counter key={st.label} {...st} />)}
        </div>
      </div>
    </section>
  );
}
function Counter({ n, s, prefix, div = 1, decimals = 0, label }: any) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const dur = 1600;
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / dur);
          setV(n * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [n]);
  const display = (v / div).toFixed(decimals);
  return (
    <div ref={ref}>
      <div className="text-4xl md:text-6xl font-display font-extrabold">
        {prefix}{display}<span className="text-gold">{s}</span>
      </div>
      <div className="mt-2 text-white/70 text-sm">{label}</div>
    </div>
  );
}

/* ---------- Process ---------- */
function Process() {
  const steps = [
    { n: "01", icon: FileText, title: "Fill the application form", body: "Enter your details online and instantly see your eligibility status." },
    { n: "02", icon: Wallet, title: "Submit your documents", body: "A representative visits you to collect the required documents." },
    { n: "03", icon: Zap, title: "Verification", body: "A representative confirms your details and schedules a personal discussion." },
    { n: "04", icon: HeadphonesIcon, title: "Approval & disbursal", body: "On successful verification, your loan is approved and deposited to your bank account." },
  ];
  return (
    <Section eyebrow="How it works" title="Four steps to funded." subtitle="A clean, guided journey from application to disbursal.">

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((s, i) => (
          <div key={s.n} className="relative rounded-3xl border border-border bg-card p-6 hover-lift">
            <div className="text-6xl font-display font-black text-primary/10">{s.n}</div>
            <div className="absolute top-6 right-6 h-11 w-11 rounded-xl bg-gradient-brand text-white grid place-items-center shadow-soft">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-2 font-display font-bold text-lg">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            {i < steps.length - 1 && <div className="hidden lg:block absolute -right-3 top-1/2 h-px w-6 bg-border" />}
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- EMI ---------- */
function EmiSection() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="container-x grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="text-primary text-sm font-semibold uppercase tracking-widest">EMI Calculator</div>
          <h2 className="mt-3 text-4xl md:text-5xl font-display font-extrabold text-foreground">Plan your loan. Confidently.</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">Estimate your EMI, total interest, and repayment breakdown for any Tattva loan.</p>
          <ul className="mt-6 space-y-3 text-sm">
            {["Instant EMI computation with amortisation split","See total interest vs principal breakdown","Adjust amount, tenure and rate in seconds"].map(t => (
              <li key={t} className="flex items-start gap-2"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> {t}</li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <Link to="/emi-calculator"><Button className="rounded-full bg-gradient-brand text-white">Full calculator <ArrowRight className="h-4 w-4 ml-1" /></Button></Link>
            <Link to="/loans"><Button variant="outline" className="rounded-full">Explore loans</Button></Link>
          </div>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-soft">
          <EmiCalculator />
        </div>
      </div>
    </section>
  );
}



/* ---------- CTA ---------- */
function CtaBanner() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-x">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-brand p-10 md:p-16 text-white shadow-elevated">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-gold/25 blur-3xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold leading-tight">Ready to move on your next big idea?</h2>
            <p className="mt-4 text-white/80 text-lg">Answer three quick questions. We'll show you a rate, an EMI, and the path to approval.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/loans"><Button size="lg" className="rounded-full bg-gold text-navy-deep hover:bg-gold/90 font-semibold h-12 px-7">Apply Now</Button></Link>
              <Link to="/contact"><Button size="lg" variant="outline" className="rounded-full h-12 px-7 border-white/30 bg-white/5 text-white hover:bg-white/10">Talk to an expert</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Branch preview ---------- */
function BranchPreview() {
  return (
    <Section eyebrow="Branch Locator" title="Find your nearest Tattva branch."
      subtitle="11 branches across Kerala and Tamil Nadu. Walk in for gold loans, KYC and personal advice.">
      <div className="rounded-3xl border border-border bg-card p-6 md:p-8 grid md:grid-cols-3 gap-5">
        <div className="md:col-span-1 space-y-3">
          <Input placeholder="Enter city or PIN code" className="h-12 rounded-xl" />
          <Link to="/branches"><Button className="w-full h-12 rounded-xl bg-gradient-brand text-white">Search branches</Button></Link>
          <div className="pt-2 space-y-2 text-sm">
            {BRANCHES.slice(0, 4).map(b => (
              <div key={b.city} className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 text-primary" /> {b.city}{b.label ? ` — ${b.label}` : ""}</div>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 h-72 rounded-2xl bg-gradient-to-br from-primary/5 to-gold/10 bg-dots grid place-items-center border border-border relative overflow-hidden">
          <div className="text-center px-6">
            <MapPin className="h-10 w-10 text-primary mx-auto" />
            <div className="mt-3 font-display font-bold text-lg">Interactive map</div>
            <div className="text-sm text-muted-foreground mt-1">Explore all 11 Tattva branches on the full locator.</div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- FAQs ---------- */
function Faqs() {
  const faqs = FAQS.slice(0, 6);
  return (
    <Section eyebrow="Questions" title="Everything you wanted to ask.">
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`i${i}`} className="rounded-2xl border border-border bg-card px-6">
              <AccordionTrigger className="text-left font-display font-semibold hover:no-underline py-5">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-8 text-center">
          <Link to="/faqs" className="text-sm font-semibold text-primary hover:underline">View all FAQs →</Link>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Section ---------- */
function Section({ eyebrow, title, subtitle, children, action }: any) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            {eyebrow && <div className="text-primary text-sm font-semibold uppercase tracking-widest">{eyebrow}</div>}
            <h2 className="mt-3 text-3xl md:text-5xl font-display font-extrabold text-foreground">{title}</h2>
            {subtitle && <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{subtitle}</p>}
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}
