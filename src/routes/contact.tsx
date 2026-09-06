import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile"),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Tattva Fincorp" },
      { name: "description", content: "Reach Tattva Fincorp on phone, email or WhatsApp. Corporate & registered office addresses. 24×7 customer care." },
      { property: "og:title", content: "Contact — Tattva Fincorp" },
      { property: "og:description", content: "Talk to us — 24×7 customer care." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [err, setErr] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    const res = schema.safeParse(data);
    if (!res.success) {
      const map: Record<string, string> = {};
      res.error.issues.forEach((i) => (map[i.path[0] as string] = i.message));
      setErr(map);
      return;
    }
    setErr({});
    toast.success("Thanks! Our team will get back to you within 24 hours.");
    (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <div>
      <PageHero eyebrow="Contact" title="Let's talk." subtitle="Reach us on phone or email — or drop into any of our 11 branches across Kerala and Tamil Nadu." crumbs={[{ label: "Contact" }]} />

      <section className="py-16 md:py-24">
        <div className="container-x grid lg:grid-cols-3 gap-6 mb-14">
          {[
            { i: Phone, t: "Corporate Office", v: "+91 484 2630090", sub: "Kochi, Kerala" },
            { i: Phone, t: "Toll-free", v: "1800 1202 0200", sub: "Loans · Trusted · Simplified" },
            { i: Mail, t: "Email us", v: "info@tattvafincorp.com", sub: "We aim to respond promptly" },
          ].map((c) => (
            <div key={c.t} className="rounded-3xl border border-border bg-card p-6 hover-lift">
              <div className="h-11 w-11 rounded-xl bg-gradient-brand text-white grid place-items-center"><c.i className="h-5 w-5" /></div>
              <div className="mt-4 text-sm text-muted-foreground">{c.t}</div>
              <div className="text-xl font-display font-bold text-primary break-words">{c.v}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.sub}</div>
            </div>
          ))}
        </div>

        <div className="container-x grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {[
              { t: "Corporate Office", a: "Tattva Fincorp Limited, First Floor, Veluthamana Arcade, Civil Line Road, Chembumukku, Kochi, Kerala – 682030", p: "+91 484 2630090" },
              { t: "Registered Office", a: "Tattva Fincorp Limited, F-1, First Floor, Balaji Castle, No. 11, Father Randy Street, RS Puram, Coimbatore, Tamil Nadu – 641002", p: "0487 7110000" },
            ].map((o) => (
              <div key={o.t} className="rounded-3xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div className="font-display font-bold text-lg">{o.t}</div>
                </div>
                <div className="text-sm text-muted-foreground">{o.a}</div>
                <div className="mt-2 text-sm flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {o.p}</div>
                <div className="mt-1 text-sm flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> info@tattvafincorp.com</div>
              </div>
            ))}
            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-primary" />
                <div className="font-display font-bold">Branch working hours</div>
              </div>
              <div className="text-sm text-muted-foreground grid grid-cols-2 gap-y-1">
                <div>Kerala branches</div><div>9:00 AM – 5:30 PM</div>
                <div>Tamil Nadu branches</div><div>9:30 AM – 6:00 PM</div>
              </div>
            </div>
            <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <div className="font-display font-bold">Report fraud or a complaint</div>
              </div>
              <div className="text-sm text-muted-foreground">Suspect fraud on your account, or need to raise a complaint? Contact customer support immediately — we're committed to resolving issues promptly.</div>
              <div className="mt-2 font-bold text-destructive">info@tattvafincorp.com · 0487 7110000</div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 md:p-8 space-y-4">
            <h3 className="text-2xl font-display font-bold">Send us a message</h3>
            <div>
              <Input name="name" placeholder="Full name" className="h-11 rounded-xl" />
              {err.name && <div className="mt-1 text-xs text-destructive">{err.name}</div>}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Input name="email" type="email" placeholder="Email" className="h-11 rounded-xl" />
                {err.email && <div className="mt-1 text-xs text-destructive">{err.email}</div>}
              </div>
              <div>
                <Input name="phone" placeholder="Mobile" className="h-11 rounded-xl" />
                {err.phone && <div className="mt-1 text-xs text-destructive">{err.phone}</div>}
              </div>
            </div>
            <div>
              <Input name="subject" placeholder="Subject" className="h-11 rounded-xl" />
              {err.subject && <div className="mt-1 text-xs text-destructive">{err.subject}</div>}
            </div>
            <div>
              <Textarea name="message" rows={5} placeholder="How can we help?" className="rounded-xl" />
              {err.message && <div className="mt-1 text-xs text-destructive">{err.message}</div>}
            </div>
            <Button className="w-full h-11 rounded-xl bg-gradient-brand text-white font-semibold">Send message</Button>
            <p className="text-xs text-muted-foreground text-center">We respect your privacy. Read our <a href="#" className="underline">Privacy Policy</a>.</p>
          </form>
        </div>
      </section>
    </div>
  );
}
